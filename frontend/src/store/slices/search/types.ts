import {ItemState} from '../item/types'
import {CollectionState} from '../collection/types'

export interface SearchState {
  collections: CollectionState[],
  items: ItemState[],
}

export interface ISearchQuery {
  keyword: String
}
