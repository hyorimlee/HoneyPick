import {ItemState} from '../item/types'

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
  username: string
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
  collectionId: number,
}

export interface IEditCollectionQuery extends ICollectionQuery{
  collectionInfo: ICollectionInfo
}

export interface ICollectionInfo {
  title: string,
    description: string | null,
    isPublic: boolean,
}