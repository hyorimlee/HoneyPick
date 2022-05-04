import axios from 'axios'
import Config from 'react-native-config'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {CollectionState} from './types'
import {RootState} from '../../types'

const initialState = {
  itemId: '',
  item: {
    _id: '',
    url: 'url',
    title: 'title',
    thumbnail: 'thumbnail',
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
} as CollectionState

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

export const getItem = createAsyncThunk(
  'item/getItem',
  async (data: string, thunkAPI) => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${Config.API_BASE_URL}/item/${data}`
      })
      return response.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(saveItem.fulfilled, (state, action) => {
        console.log(action.payload)
        state.itemId = action.payload
      })
      .addCase(getItem.fulfilled, (state, action) => {
        console.log(action.payload)
        state.item = action.payload
      })
  },
})

export default collectionSlice