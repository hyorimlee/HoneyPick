import {ItemState} from '../item/types'
import {CollectionState} from '../collection/types'

export interface RecommendState {
  collections: RCollectionState[]
  items: RItemState[]
}

export interface RCollectionState {
  title: string
  collection: CollectionState
}

export interface Item {
  _id: string
  brand?: string
  url: string
  title?: string
  thumbnail?: string
  priceBefore?: number
  priceAfter?: number
  discountRate?: number
  stickers: object
}

export interface RItemState {
  rec: string
  title: string
  itemList: Item[]
  page: number
}

export interface IRecommendItemQuery {
  page?: number
  recs?: string
}

export interface IRecommendCollectionQuery {
  page?: number
}
