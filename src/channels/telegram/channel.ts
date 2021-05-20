import _ from 'lodash'
import { Telegraf } from 'telegraf'
import { TelegrafContext } from 'telegraf/typings/context'
import { Channel } from '../base/channel'
import { CardToCarouselRenderer } from '../base/renderers/card'
import { TelegramConfig } from './config'
import { TelegramContext } from './context'
import { TelegramRenderers } from './renderers'
import { TelegramSenders } from './senders'

export class TelegramChannel extends Channel<TelegramConfig, TelegramContext> {
  get id() {
    return 'telegram'
  }

  private telegraf!: Telegraf<TelegrafContext>

  protected async setupConnection() {
    this.telegraf = new Telegraf(<string>this.config.botToken)
    const route = '/webhooks/telegram'

    await this.telegraf.telegram.setWebhook(`${this.config.externalUrl}${route}`)
    this.routers.raw.use(route, this.telegraf.webhookCallback('/'))

    const webhookUrl = this.config.externalUrl + route
    console.log(`Telegram webhook listening at ${webhookUrl}`)

    this.telegraf.start(async (ctx) => this.receive(ctx))
    this.telegraf.help(async (ctx) => this.receive(ctx))
    this.telegraf.on('message', async (ctx) => this.receive(ctx))

    // TODO: Postback works but say something doesn't
    this.telegraf.on('callback_query', async (ctx) => this.receive(ctx))
  }

  protected setupRenderers() {
    return [new CardToCarouselRenderer(), ...TelegramRenderers]
  }

  protected setupSenders() {
    return TelegramSenders
  }

  async receive(ctx: TelegrafContext) {
    const userId = `${ctx.from?.id || ctx.message?.from?.id}`
    const text = ctx.message?.text || ctx.callbackQuery?.data

    const conversation = await this.conversations.forBot(this.botId).recent(userId)
    const message = await this.messages.forBot(this.botId).create(conversation.id, { type: 'text', text }, userId)
    console.log('telegram send webhook', message)
  }

  async send(conversationId: string, payload: any) {
    const conversation = await this.conversations.forBot(this.botId).get(conversationId)

    const context: TelegramContext = {
      client: this.telegraf,
      handlers: [],
      payload: _.cloneDeep(payload),
      // TODO: bot url
      botUrl: 'https://duckduckgo.com/',
      messages: [],
      // TODO: mapping
      chatId: conversation?.userId!
    }

    for (const renderer of this.renderers) {
      if (renderer.handles(context)) {
        renderer.render(context)
        // TODO: do we need ids?
        context.handlers.push('id')
      }
    }

    for (const sender of this.senders) {
      if (sender.handles(context)) {
        await sender.send(context)
      }
    }
  }
}
