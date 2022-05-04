import axios, { AxiosResponse } from 'axios'
import Config from 'react-native-config'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {CollectionState} from './types'
import {RootState} from '../../types'

const initialState = {
  itemId: '',
  item: {
    _id: '',
    url: '',
    title: '',
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
} as CollectionState

export const saveItem = createAsyncThunk<any, string, {state: RootState}>(
  'items/saveItem',
  async (url: string, thunkAPI) => {
    try {
      const {accessToken} = thunkAPI.getState().user
      const response = await axios.post(`${Config.API_BASE_URL}/item`, {url}, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      return response.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const getItem = createAsyncThunk(
  'items/getItem',
  async (data: number, thunkAPI) => {
    try {
      const response = await axios.get(`${Config.API_BASE_URL}/item/${data}`)
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
        state.itemId = action.payload
      })
      .addCase(getItem.fulfilled, (state, action) => {
        state.item = action.payload
      })
  },
})

export default collectionSlice