import { uuid } from '@botpress/messaging-base'

export interface Endpoint {
  identity?: string
  sender?: string
  thread?: string
}

export interface Mapping {
  tunnelId: uuid
  identityId: uuid
  senderId: uuid
  threadId: uuid
  userId: uuid
  conversationId: uuid
}
