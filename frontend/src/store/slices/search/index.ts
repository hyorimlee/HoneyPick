import axios from 'axios'
import Config from 'react-native-config'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {RootState} from '../../types'
import {SearchState} from './types'
import {
  search,
} from './asyncThunk'

const initialState: SearchState = {
  collections: [],
  items: []
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(search.fulfilled, (state, action) => {
        console.log(action.payload)
        state.collections = action.payload.collections
        state.items = action.payload.items
      })
      .addCase(search.rejected, (state, action) => {
        console.log(action.payload)
      })
  },
})

export default searchSlice