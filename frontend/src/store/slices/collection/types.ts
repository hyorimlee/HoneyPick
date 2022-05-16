import {ItemState, IItem} from '../item/types'

export interface CollectionInitialState {
  currentCollection: CollectionState | undefined,
  currentItems: IItem[] | undefined
}

export interface CollectionState {
  user: CollectionUserObject,
  title: string,
  description: string
  isPublic: boolean,
  _id: string,
  items: ItemState[],
  createdAt: string,
  updatedAt: string,
  __v: number
}

export interface CollectionUserObject {
  _id: string,
  username: string,
  nickname: string,
}

export interface CollectionListState {
  totalPages: number,
  page: number,
  collections: CollectionState[]
}

export interface ICollectionListQuery {
  accountId: string,
  page: number,
}

export interface ICollectionQuery {
  accountId: string,
  collectionId: string,
}

export interface IEditCollectionQuery extends ICollectionQuery{
  collectionInfo: ICollectionInfo
}

export interface ICollectionInfo {
  title: string,
    description: string | null,
    isPublic: boolean,
}