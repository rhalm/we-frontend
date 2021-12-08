/**
 * All query options that can be sent to FeedService when searching for ads
 */
export class FeedOptions {
  searchTerm: string
  categories: string
  locations: string
  withImageOnly: boolean
  userId: string
  size: number
  page: number
}
