import axios from 'axios'
import Config from 'react-native-config'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {RootState} from '../../types'
import {RecommendState, RItemState} from './types'
import {getItemRecommend, getCollectionRecommend} from './asyncThunk'

const initialState: RecommendState = {
  collections: [],
  items: [],
}

const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getItemRecommend.fulfilled, (state, action) => {
        action.payload.items.forEach(
          ({rec, page, title, itemList}: RItemState) => {
            if (page === 1) {
              state.items.push({rec, title, itemList, page})
              return
            }
            state.items.forEach((elem, index) => {
              if (rec == elem.rec) {
                state.items[index].itemList.push(...itemList)
                state.items[index].page = page
              }
            })
          },
        )
      })

      .addCase(getCollectionRecommend.fulfilled, (state, action) => {
        state.collections.push(...action.payload.collections)
      })
  },
})

export default recommendSlice
