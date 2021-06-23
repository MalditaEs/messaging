import _ from 'lodash'
import { CachingService } from './caching/service'
import { ChannelService } from './channels/service'
import { ClientService } from './clients/service'
import { ConduitService } from './conduits/service'
import { ConfigService } from './config/service'
import { ConversationService } from './conversations/service'
import { CryptoService } from './crypto/service'
import { DatabaseService } from './database/service'
import { DistributedService } from './distributed/service'
import { InstanceService } from './instances/service'
import { KvsService } from './kvs/service'
import { LoggerService } from './logger/service'
import { MappingService } from './mapping/service'
import { MessageService } from './messages/service'
import { ProviderService } from './providers/service'
import { SyncService } from './sync/service'
import { UserService } from './users/service'
import { WebhookService } from './webhooks/service'

export class App {
  logger: LoggerService
  config: ConfigService
  database: DatabaseService
  crypto: CryptoService
  distributed: DistributedService
  caching: CachingService
  channels: ChannelService
  providers: ProviderService
  clients: ClientService
  webhooks: WebhookService
  kvs: KvsService
  conduits: ConduitService
  users: UserService
  conversations: ConversationService
  messages: MessageService
  mapping: MappingService
  instances: InstanceService
  syncs: SyncService

  constructor() {
    this.logger = new LoggerService()
    this.config = new ConfigService()
    this.database = new DatabaseService(this.config)
    this.crypto = new CryptoService(this.config)
    this.distributed = new DistributedService(this.config)
    this.caching = new CachingService(this.distributed)
    this.channels = new ChannelService(this.database)
    this.providers = new ProviderService(this.database, this.caching)
    this.clients = new ClientService(this.database, this.crypto, this.caching)
    this.webhooks = new WebhookService(this.database, this.caching)
    this.kvs = new KvsService(this.database, this.caching)
    this.conduits = new ConduitService(this.database, this.crypto, this.caching)
    this.users = new UserService(this.database)
    this.conversations = new ConversationService(this.database, this.caching)
    this.messages = new MessageService(this.database, this.caching, this.conversations)
    this.mapping = new MappingService(this.database, this.caching, this.users, this.conversations)
    this.instances = new InstanceService(this.caching, this.channels, this.providers, this.conduits, this.clients, this)
    this.syncs = new SyncService(this.config, this.channels, this.providers, this.conduits, this.clients, this.webhooks)
  }

  async setup() {
    await this.logger.setup()
    await this.config.setup()
    await this.database.setup()
    await this.crypto.setup()
    await this.distributed.setup()
    await this.caching.setup()
    await this.channels.setup()
    await this.providers.setup()
    await this.clients.setup()
    await this.webhooks.setup()
    await this.kvs.setup()
    await this.conduits.setup()
    await this.users.setup()
    await this.conversations.setup()
    await this.messages.setup()
    await this.mapping.setup()
    await this.instances.setup()
    await this.syncs.setup()
  }

  async destroy() {
    await this.distributed?.destroy()
    await this.database?.destroy()
  }
}
