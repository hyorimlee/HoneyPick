import {ItemState} from '../item/types'

export interface EventInitialState {
  event: EventState
  eventList: EventState[]
}

export interface EventState {
  user: {_id: string, username: string, nickname: string}
  title: string
  description: string
  additional: string
  _id: string
  items: ItemState[]
  createdAt: string
  updatedAt: string
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