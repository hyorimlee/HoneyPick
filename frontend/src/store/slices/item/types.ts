export interface ItemState {
  itemId: string
  collectionId: string
  item: IItem
  review?: {
    _id: string
    user: {_id: string; username: string; nickname: string}
    item: string
    isRecommend: 0 | 1 | 2
    stickers: string[]
  }
  collections?: ItemCollectionState[]
  thumbnail?: string
}

export interface ItemCollectionState {
  _id: string
  title: string
  description: string
}

export interface IItem {
  _id: string
  brand?: string
  url: string
  title?: string
  thumbnail?: string
  priceBefore?: number
  priceAfter?: number
  discountRate?: number
  stickers: [string, number][]
}

export interface IItemToCollectionParameter {
  itemId: string
  originalCollectionId?: string
  collectionId?: string
}

export interface ISaveReviewParameter {
  itemId: string
  isRecommend: 0 | 1 | 2
  stickers: string[]
}

export interface IEditReviewParameter {
  itemId: string
  reviewId: string
  isRecommend?: 0 | 1 | 2
  stickers?: string[]
}
