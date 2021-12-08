/**
 * Preview information about ads
 * This is what gets sent back by FeedService when all ads (with options+pagination) are requested
 */
export interface AdThumbnail {
  id: string
  userId: string

  title: string
  location: string
  category: string
  images: string
}
