import {WritableDraft} from 'immer/dist/internal'

export interface IInitialState {
  userId: string
  username: string
  nickname: string
  profileImage: string
  description: string
  following: number
  follower: number
  collections: any[] | null
  likes: any[] | null
  votes: any[] | null
  followingList: IFollow[]
  followerList: IFollow[]
  myFollow: boolean
}

export interface IFollow {
  _id: string
  image: string
  myFollow: boolean
  nickname: string
  updatedAt: string
  username: string
}
