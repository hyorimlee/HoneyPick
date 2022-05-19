import {ItemState} from '../item/types'

export interface EventInitialState {
  event: EventState
  eventList: EventState[]
}

export interface EventState {
  user: {_id: string; username: string; nickname: string}
  title: string
  description: string
  additional: string
  _id: string
  items: ItemState[]
  createdAt: string
  updatedAt: string
  vote: EventVoteState
  thumbnail?: string
}

export interface EventVoteState {
  _id: string
  eventId: string
  title: string
  result: {
    _id: string
    count: number
    title?: string
    priceBefore?: number
    priceAfter?: number
    thumbnail?: string
  }[]
  isPublic: boolean
  isClosed: boolean
  participants: {_id: string}[]
}

export interface ISaveEventParameter {
  title: string
  description: string
  additional: string
}

export interface IEditEventParameter {
  eventId: string
  title: string
  description: string
  additional: string
}
