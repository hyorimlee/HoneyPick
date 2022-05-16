import axios from 'axios'
import Config from 'react-native-config'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {RootState} from '../../types'
import {RecommendState} from './types'
import {
  getItemRecommend,
  getCollectionRecommend
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
      .addCase(getItemRecommend.fulfilled, (state, action) => {
        console.log(action.payload)
        // 여기서 특정 아이템별로 추가할 수 있게 해줘야할듯?
        state.items = action.payload.items
      })
      .addCase(getItemRecommend.rejected, (state, action) => {
        console.log(action.payload)
      })
      .addCase(getCollectionRecommend.fulfilled, (state, action) => {
        console.log(action.payload)
        state.collections.push(...action.payload.collections)
      })
      .addCase(getCollectionRecommend.rejected, (state, action) => {
        console.log(action.payload)
      })
  },
})

export default recommendSlice