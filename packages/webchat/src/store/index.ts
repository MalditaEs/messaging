import axios from 'axios'
import isBefore from 'date-fns/is_before'
import isValid from 'date-fns/is_valid'
import merge from 'lodash/merge'
import orderBy from 'lodash/orderBy'
import { action, computed, observable, runInAction } from 'mobx'
import { IntlShape } from 'react-intl'

import WebchatApi from '../core/api'
import BpSocket from '../core/socket'
import { DEFAULT_TYPING_DELAY } from '../main'
import { getUserLocale, setUserLocale, isRTLLocale } from '../translations'
import {
  BotInfo,
  Config,
  CurrentConversation,
  EventFeedback,
  Message,
  QueuedMessage,
  RecentConversation,
  uuid
} from '../typings'
import { downloadFile } from '../utils'
import { trackMessage } from '../utils/analytics'
import { postMessageToParent } from '../utils/webchatEvents'

import ComposerStore from './composer'
import ViewStore from './view'

/** Includes the definitions of all store classes */
export type StoreDef = Partial<RootStore> & Partial<ViewStore> & Partial<ComposerStore> & Partial<Config>
class RootStore {
  public composer: ComposerStore
  public view: ViewStore

  private _typingInterval: ReturnType<typeof setInterval> | undefined
  private api!: WebchatApi

  @observable
  public conversations: RecentConversation[] = []

  @observable
  public currentConversation?: CurrentConversation

  @observable
  public selectedMessageId?: string

  @observable
  public botInfo!: BotInfo

  @observable
  public config!: Config

  @observable
  public preferredLanguage!: string

  @observable
  public isInitialized!: boolean

  @observable
  public messageFeedbacks!: EventFeedback[]

  public intl!: IntlShape

  public isBotTyping = observable.box(false)

  @observable
  public botUILanguage!: string

  public delayedMessages: QueuedMessage[] = []

  constructor(options: { fullscreen: boolean }, config?: Config) {
    this.composer = new ComposerStore(this)
    this.view = new ViewStore(this, options.fullscreen)

    if (config) {
      this.updateConfig(config)
    }

    this.botUILanguage = getUserLocale()
  }

  @action.bound
  setIntlProvider(provider: IntlShape) {
    this.intl = provider
  }

  @action.bound
  setSocket(socket: BpSocket) {
    this.api = new WebchatApi(socket)
  }

  @action.bound
  setSelectedMessage(messageId: string) {
    this.selectedMessageId = messageId
  }

  @computed
  get isConversationStarted(): boolean {
    return !!this.currentConversation?.messages.length
  }

  @computed
  get botName(): string {
    return this.config?.botName || this.botInfo?.name || 'Bot'
  }

  @computed
  get hasBotInfoDescription(): boolean {
    return !!this.config.botConversationDescription?.length
  }

  @computed
  get botAvatarUrl(): string | undefined {
    return this.botInfo?.details?.avatarUrl || this.config?.avatarUrl || undefined
  }

  get coverPictureUrl() {
    return this.botInfo?.details?.coverPictureUrl ?? this.config?.coverPictureUrl
  }

  get description() {
    return this.config?.botConversationDescription
  }

  get website() {
    return this.botInfo?.details?.website ?? this.config?.website
  }

  get phoneNumber() {
    return this.botInfo?.details?.phoneNumber ?? this.config?.phoneNumber
  }

  get termsConditions() {
    return this.botInfo?.details?.termsConditions ?? this.config?.termsConditions
  }

  get privacyPolicy() {
    return this.botInfo?.details?.privacyPolicy ?? this.config?.privacyPolicy
  }

  get emailAddress() {
    return this.botInfo?.details?.emailAddress ?? this.config?.emailAddress
  }

  @computed
  get rtl(): boolean {
    return isRTLLocale(this.preferredLanguage)
  }

  @computed
  get escapeHTML(): boolean {
    return this.botInfo?.security?.escapeHTML
  }

  @computed
  get currentMessages(): Message[] {
    return this.currentConversation?.messages || []
  }

  @computed
  get currentConversationId(): uuid | undefined {
    return this.currentConversation?.id
  }

  @action.bound
  updateMessages(messages: Message[]) {
    if (this.currentConversation) {
      this.currentConversation.messages = messages
    }
  }

  @action.bound
  updateLastMessage(conversationId: string, message?: Message) {
    for (const conversation of this.conversations) {
      if (conversation.id === conversationId) {
        conversation.lastMessage = message

        return
      }
    }
  }

  @action.bound
  clearMessages(): void {
    if (this.currentConversation) {
      this.currentConversation.messages = []
    }
  }

  @action.bound
  async deleteConversation(): Promise<void> {
    if (this.currentConversationId) {
      await this.api.deleteConversation(this.currentConversationId)

      const index = this.conversations.findIndex((c) => c.id === this.currentConversationId)
      if (index > -1) {
        this.conversations.splice(index, 1)
      }

      this.resetConversation()
      await this.fetchConversation()
    }
  }

  @action.bound
  async addEventToConversation(event: Message): Promise<void> {
    if (!this.currentConversation || (this.isInitialized && this.currentConversationId !== event.conversationId)) {
      await this.fetchConversations()
      await this.fetchConversation(event.conversationId)
      return
    }

    // Autoplay bot voice messages
    if (event.payload?.type === 'voice' && !event.authorId) {
      event.payload.autoPlay = true
    }

    const message: Message = { ...event, conversationId: event.conversationId }
    if (this.isBotTyping.get() && !event.authorId) {
      this.delayedMessages.push({ message, showAt: this.currentConversation.typingUntil })
    } else {
      this.currentConversation.messages.push(message)
    }
  }

  @action.bound
  async updateTyping(event: Message): Promise<void> {
    if (!this.currentConversation || (this.isInitialized && this.currentConversationId !== event.conversationId)) {
      await this.fetchConversations()
      await this.fetchConversation(event.conversationId)
      return
    }

    let start = new Date()
    if (isBefore(start, this.currentConversation.typingUntil)) {
      start = this.currentConversation.typingUntil
    }
    this.currentConversation.typingUntil = new Date(+start + (event.timeInMs || DEFAULT_TYPING_DELAY))
    this._startTypingTimer()
  }

  /** Loads the initial state, for the first time or when the user ID is changed. */
  @action.bound
  async initializeChat(): Promise<void> {
    try {
      await this.fetchConversations()
      await this.fetchConversation()
      runInAction('-> setInitialized', () => {
        this.isInitialized = true
        postMessageToParent('LIFECYCLE.READY', undefined, this.config.chatId)
      })
    } catch (err) {
      console.error('Error while fetching data, creating new conversation...', err)
      await this.createConversation()
    }

    this.fetchLanguage()
  }

  @action.bound
  async fetchBotInfo(): Promise<void> {
    if (!this.config.mediaFileServiceUrl) {
      return
    }

    try {
      const { data } = await axios.get<BotInfo>(this.config.mediaFileServiceUrl)
      if (!data) {
        return
      }

      runInAction('-> setBotInfo', () => {
        this.botInfo = data
      })
      this.mergeConfig({
        disableNotificationSound: data.disableNotificationSound
      })
    } catch (err) {
      console.error('Error while loading bot info', err)
    }
  }

  @action.bound
  fetchLanguage(): void {
    const language = getUserLocale(this.config.locale)

    runInAction('-> setPreferredLanguage', () => {
      this.updateBotUILanguage(language)
    })
  }

  /** Fetches the list of conversation, and update the corresponding config values */
  @action.bound
  async fetchConversations(): Promise<void> {
    const conversations = await this.api.fetchConversations()

    runInAction('-> setConversations', () => {
      if (!conversations?.length) {
        this.view.showBotInfo()
      }

      this.conversations = conversations
    })
  }

  /** Fetch the specified conversation ID, or try to fetch a valid one from the list */
  @action.bound
  async fetchConversation(convoId?: uuid): Promise<uuid | undefined> {
    const conversationId = convoId || this._getCurrentConvoId()
    if (!conversationId) {
      return this.createConversation()
    }

    const conversation: CurrentConversation = (await this.api.fetchConversation(
      convoId || this._getCurrentConvoId()!
    )!) as CurrentConversation
    if (conversation?.messages) {
      conversation.messages = conversation.messages.sort(
        (a, b) => new Date(a.sentOn).getTime() - new Date(b.sentOn).getTime()
      )
      await this.extractFeedback(conversation.messages)
    }

    runInAction('-> setConversation', () => {
      this.currentConversation = conversation
      this.view.hideConversations()
    })
  }

  /** Sends the specified message, or fetch the message in the composer */
  @action.bound
  async sendMessage(textMessage?: string): Promise<void> {
    textMessage = textMessage || this.composer.message
    if (!textMessage) {
      return
    }

    this.composer.updateMessage('')
    try {
      const message = await this.sendData({ type: 'text', text: textMessage })
      trackMessage('sent')
      if (message) {
        postMessageToParent('MESSAGE.SENT', message, this.config.chatId)
      }

      this.composer.addMessageToHistory(textMessage)
    } catch (e) {
      this.composer.updateMessage(textMessage)
      console.error('Webchat cloud not send message')
      throw e
    }
  }

  /** Sends an event to start conversation & hide the bot info page */
  @action.bound
  async startConversation(): Promise<void> {
    await this.sendData({ type: 'request_start_conversation' })
    this.view.toggleBotInfo()
  }

  /** Creates a new conversation and switches to it */
  @action.bound
  async createConversation(): Promise<uuid> {
    const newId = await this.api.createConversation()
    await this.api.startConversation()
    await this.fetchConversations()
    await this.fetchConversation(newId)
    return newId!
  }

  @action.bound
  resetConversation() {
    this.currentConversation = undefined!
  }

  @action.bound
  async extractFeedback(messages: Message[]): Promise<void> {
    const feedbackMessageIds = messages.filter((x) => x.payload && x.payload.collectFeedback).map((x) => x.id)

    const feedbackInfo = feedbackMessageIds.map((x) => ({ messageId: x, feedback: 1 }))
    runInAction('-> setFeedbackInfo', () => {
      this.messageFeedbacks = feedbackInfo!
    })
  }

  @action.bound
  async sendFeedback(feedback: number, messageId: string): Promise<void> {
    await this.api.sendFeedback(feedback, messageId)
  }

  @action.bound
  async downloadConversation(): Promise<void> {
    try {
      const formatDate = (date: Date) => {
        return new Date(date).toLocaleString()
      }

      const conversation = this.currentConversation
      if (!conversation) {
        console.warn('Cannot download the current conversation as it is undefined.')
        return
      }

      let info = `Conversation Id: ${conversation.id}\nCreated on: ${formatDate(conversation.createdOn)}\nUser: ${
        conversation.userId
      }\n-----------------`

      const messages = await this.api.listCurrentConversationMessages(500)
      for (const message of orderBy(messages, 'sentOn', 'desc')) {
        const payload = message.payload
        if (payload.type === 'session_reset') {
          continue
        }

        info += `\n[${formatDate(message.sentOn)}] ${
          message.authorId ? 'User' : this.config.botName || 'Bot'
        }: Event (${payload.type}): ${
          payload.text ||
          payload.audio ||
          payload.image ||
          payload.video ||
          payload.file ||
          payload.message ||
          payload.title ||
          ''
        }`
      }

      const blobFile = new Blob([info])

      downloadFile(`conversation-${conversation.id}`, blobFile)
    } catch (err) {
      console.error('Error trying to download conversation', err)
    }
  }

  /** Sends an event or a message, depending on how the backend manages those types */
  @action.bound
  async sendData(data: any): Promise<Message | void> {
    if (!this.isInitialized || !this.currentConversationId) {
      console.warn('[webchat] Cannot send data until the webchat is ready')
      return
    }

    const message = await this.api.sendMessage(data, this.currentConversationId)
    this.updateLastMessage(this.currentConversationId, message)

    return message
  }

  /** Sends a message of type voice */
  @action.bound
  async sendVoiceMessage(voice: Buffer, ext: string): Promise<void> {
    if (this.currentConversationId) {
      return this.api.sendVoiceMessage(voice, ext, this.currentConversationId)
    }
  }

  /** Use this method to replace a value or add a new config */
  @action.bound
  mergeConfig(config: Partial<Config>) {
    this.config = merge(this.config, config)
    this._applyConfig()
  }

  /** This replaces all the configurations by this object */
  @action.bound
  updateConfig(config: Config) {
    this.config = config
    this._applyConfig()
  }

  private _applyConfig() {
    window.BP_STORAGE.config = this.config

    this.config.layoutWidth && this.view.setLayoutWidth(this.config.layoutWidth)
    this.config.containerWidth && this.view.setContainerWidth(this.config.containerWidth)
    this.view.disableAnimations = !!this.config.disableAnimations
    this.config.showPoweredBy ? this.view.showPoweredBy() : this.view.hidePoweredBy()

    document.title = this.config.botName || 'Botpress Webchat'

    if (!this.isInitialized) {
      window.USE_SESSION_STORAGE = !!this.config.useSessionStorage
    } else if (window.USE_SESSION_STORAGE !== this.config.useSessionStorage) {
      console.warn('[WebChat] "useSessionStorage" value cannot be altered once the webchat is initialized')
    }

    const locale = getUserLocale(this.config.locale)
    this.updateBotUILanguage(locale)
    document.documentElement.setAttribute('lang', locale)

    postMessageToParent('CONFIG.SET', { ...this.config }, this.config.chatId)
  }

  @action.bound
  updatePreferredLanguage(lang: string): void {
    this.preferredLanguage = lang
    setUserLocale(lang)
  }

  /** Starts a timer to remove the typing animation when it's completed */
  @action.bound
  private _startTypingTimer() {
    if (this._typingInterval) {
      return
    }
    this.isBotTyping.set(true)

    this._typingInterval = setInterval(() => {
      const typeUntil = new Date(this.currentConversation?.typingUntil)
      if (!typeUntil || !isValid(typeUntil) || isBefore(typeUntil, new Date())) {
        this._expireTyping()
      } else {
        this.emptyDelayedMessagesQueue(false)
      }
    }, 50)
  }

  @action.bound
  private _expireTyping() {
    this.emptyDelayedMessagesQueue(true)
    this.isBotTyping.set(false)
    if (this.currentConversation) {
      this.currentConversation.typingUntil = undefined
    }

    clearInterval(this._typingInterval!)
    this._typingInterval = undefined
  }

  @action.bound
  updateBotUILanguage(lang: string): void {
    lang = getUserLocale(lang) // Ensure language is supported
    runInAction('-> setBotUILanguage', () => {
      this.botUILanguage = lang
      this.preferredLanguage = lang
      setUserLocale(lang)
    })
  }

  @action.bound
  private emptyDelayedMessagesQueue(removeAll: boolean) {
    if (!this.currentConversation) {
      return
    }

    while (this.delayedMessages.length) {
      const message = this.delayedMessages[0]
      if (removeAll || isBefore(message.showAt, new Date())) {
        this.currentConversation.messages.push(message.message)
        this.delayedMessages.shift()
      } else {
        break
      }
    }
  }

  /** Returns the current conversation ID, or the last one. */
  private _getCurrentConvoId(): uuid | undefined {
    if (this.currentConversationId) {
      return this.currentConversationId
    }

    if (!this.conversations.length) {
      return
    }

    return this.conversations[0].id
  }
}

export { RootStore }
