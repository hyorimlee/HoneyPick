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
  voteId: string
}

export interface IItemVoteQuery extends IVoteQuery{
  itemId: string
}



