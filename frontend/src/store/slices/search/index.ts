import axios from 'axios'
import Config from 'react-native-config'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {RootState} from '../../types'
import {SearchState} from './types'
import {search} from './asyncThunk'

const initialState: SearchState = {
  collections: [],
  items: [],
  page: 1,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(search.fulfilled, (state, action) => {
      state.collections = action.payload.collections
      if (action.payload.page === 1) state.items = action.payload.items
      else state.items.push(...action.payload.items)
      if (action.payload.items.length) {
        state.page = action.payload.page
      }
    })
  },
})

export default searchSlice
