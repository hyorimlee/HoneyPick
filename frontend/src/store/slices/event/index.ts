import {createSlice} from '@reduxjs/toolkit'
import {EventState} from './types'
import {
} from './asyncThunk'
import {RootState, useAppSelector} from '~/store/types'

const initialState: EventState = {
}

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
  },
})

export default eventSlice
