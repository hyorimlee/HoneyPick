import {createSlice} from '@reduxjs/toolkit'
import {EventInitialState} from './types'
import {RootState, useAppSelector} from '~/store/types'

import {saveEvent, getEventList, getEvent, editEvent} from './asyncThunk'

// 추후 BE에서 user 수정해주면 변경해야 함
const initialState: EventInitialState = {
  event: {
    user: {
      _id: '',
      username: '',
    },
    title: '',
    isPublic: true,
    _id: '',
    items: [],
    createdAt: '',
    updatedAt: '',
    __v: 0
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
      .addCase(saveEvent.fulfilled, (state, action) => {
        state.event = action.payload.event
      })
      .addCase(getEventList.fulfilled, (state, action) => {
        state.eventList = action.payload.events
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.event = action.payload.event
      })
      .addCase(editEvent.fulfilled, (state, action) => {
        state.event = action.payload.event
      })
  },
})

export default eventSlice
