import axios from 'axios'
import Config from 'react-native-config'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {RootState} from '../../types'
import {RecommendState} from './types'
import {
  getRecommend,
} from './asyncThunk'

const initialState: RecommendState = {
  collections: [],
  items: []
}

const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(getRecommend.fulfilled, (state, action) => {
        console.log(action.payload)
        state.collections = action.payload.collections
        state.items = action.payload.items
      })
      .addCase(getRecommend.rejected, (state, action) => {
        console.log(action.payload)
      })
  },
})

export default recommendSlice