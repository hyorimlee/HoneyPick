import {createSlice} from '@reduxjs/toolkit'
import {EventInitialState} from './types'
import {RootState, useAppSelector} from '~/store/types'

import {getEventList, getEvent, editEvent} from './asyncThunk'

const initialState: EventInitialState = {
  event: {
    user: {
      _id: '',
      username: '',
      nickname: '',
    },
    title: '',
    description: '',
    additional: '',
    _id: '',
    items: [],
    createdAt: '',
    updatedAt: '',
    vote: {
      _id: '',
      eventId: '',
      title: '',
      result: [{ _id: '', count: 0, title: '', priceBefore: 0, priceAfter: 0, thumbnail: '' }],
      isPublic: true,
      isClosed: false,
      participants: []
    }
  },
  eventList: []
}

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(getEventList.fulfilled, (state, action) => {
        state.eventList = action.payload.events
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.event = action.payload.event
        state.event.vote.result = state.event.vote.result.sort((a, b) => {return b.count - a.count})
      })
      .addCase(editEvent.fulfilled, (state, action) => {
        state.event = action.payload.event
      })
  },
})

export default eventSlice
