/**
 * Model for ads, this is what gets sent back by FeedService when ad details are requested
 */
export interface Ad {
  id: string
  userId: string

  title: string
  location: string
  category: string
  description: string
  images: string
  createdAt: string
}
