import { Profile } from '../../../shared/models/profile.type'

/**
 * Stores information about a conversation
 */
export interface Conversation {
  id: string
  participants: any
  readByUser: boolean
  title: string
  modifiedAt: string
  preview: string
  profile: Profile
}
