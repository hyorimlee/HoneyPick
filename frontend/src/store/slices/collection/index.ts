import axios from 'axios'
import Config from 'react-native-config'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {CollectionState} from './types'

const initialState = {
  item: {
    url: '',
    title: '',
    thumbnail: '',
    priceBefore: 0,
    priceAfter: 0,
    discountRate: 0,
    stickers: {},
    // 이 안에 review 있없 정보는 없나요?
  }
} as CollectionState

export const saveItem = createAsyncThunk(
  'items/saveItem', // 확인 필요
  async (data: string, thunkAPI) => {
    try {
      // baseurl에 v1까지 넣어두는 게 맞지 않나?
      const response = await axios.post(`${Config.API_BASE_URL}/v1/item`, data, {
        // headers: {
        //   Authorization: 
        // }
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
      const response = await axios.get(`${Config.API_BASE_URL}/v1/item/${data}`)
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
      .addCase(getItem.fulfilled, (state, action) => {
        state.item = action.payload
      })
  },
})

export default collectionSlice