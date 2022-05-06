import axios from 'axios'
import Config from 'react-native-config'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ItemState} from './types'
import {RootState} from '../../types'

const initialState = {
  itemId: '',
  copiedUrl: '',
  item: {
    _id: '',
    brand: 'brand',
    url: 'url',
    title: 'title',
    thumbnail: '',
    priceBefore: 0,
    priceAfter: 0,
    discountRate: 0,
    stickers: {},
  },
  review: {
    _id: '',
    user: '',
    item: '',
    isRecommend: 0,
    stickers: [],
  }
} as ItemState

export const saveItem = createAsyncThunk<any, string, {state: RootState}>(
  'item/saveItem',
  async (url: string, thunkAPI) => {
    try {
      const {accessToken} = thunkAPI.getState().user
      const response = await axios({
        method: 'POST',
        url: `${Config.API_BASE_URL}/item`,
        data: {url},
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      })
      return response.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const getItem = createAsyncThunk<any, string, {state: RootState}>(
  'item/getItem',
  async (data: string, thunkAPI) => {
    try {
      const {accessToken} = thunkAPI.getState().user
      const response = await axios({
        method: 'GET',
        url: `${Config.API_BASE_URL}/item/${data}`,
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      })
      return response.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setCopiedUrl: (state, action) => {
      state.copiedUrl = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(saveItem.fulfilled, (state, action) => {
        console.log(action.payload)
        state.itemId = action.payload._id
      })
      .addCase(getItem.fulfilled, (state, action) => {
        console.log(action.payload.item)
        console.log(action.payload.review)
        state.item = action.payload.item
        state.review = action.payload.review
      })
  },
})

export default itemSlice