import { ItemState } from "../item/types"

export interface VoteInitialState {
  currentVote: IVoteState,
  selectedItems: ItemState[] | Array<any>,
}

export interface IVoteState {
  _id: string,
  collectionId: string,
  title: string,
  result: { _id: string, count: number, title?: string, priceBefore?: number, priceAfter?: number, }[],
  isPublic: boolean,
  isClosed: boolean,
  participants: { _id: string }[],
  createdAt: string,
  updatedAt: string,
  __v: number
}

export interface IVoteInfo {
  collectionId: string,
  title: string,
  isPublic: boolean
}

export interface IVoteListQuery {
  accountId: string,
  page: number
}

export interface IVoteQuery {
  accountId: string,
  voteId: string | undefined
}

export interface IItemVoteQuery extends IVoteQuery{
  itemId: string
}



