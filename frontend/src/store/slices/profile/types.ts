import {WritableDraft} from 'immer/dist/internal'

export interface IInitialState {
  userId: string
  username: string
  nickname: string
  profileImage: string
  description: string
  following: number
  follower: number
  collections: any[]
  likes: any[]
  votes: any[]
  followingList: IFollow[]
  followerList: IFollow[]
}

export interface IFollow {
  _id: string
  image: string
  myFollow: boolean
  nickname: string
  updatedAt: string
  username: string
}
