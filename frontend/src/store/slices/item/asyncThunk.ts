import axios from 'axios'
import Config from 'react-native-config'
import {createAsyncThunk} from '@reduxjs/toolkit'
import {RootState} from '../../types'

import {
  IItemToCollectionParameter,
  ISaveReviewParameter,
  IEditReviewParameter,
} from './types'

export const saveItem = createAsyncThunk<any, string, {state: RootState}>(
  'item/saveItem',
  async (url, thunkAPI) => {
    try {
      const {accessToken} = thunkAPI.getState().user
      const response = await axios({
        method: 'POST',
        url: `${Config.API_BASE_URL}/item`,
        data: {url},
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      return response.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  },
)

export const getItem = createAsyncThunk<any, string, {state: RootState}>(
  'item/getItem',
  async (itemId: string, thunkAPI) => {
    try {
      const {accessToken} = thunkAPI.getState().user
      const response = await axios({
        method: 'GET',
        url: `${Config.API_BASE_URL}/item/${itemId}`,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      console.log(response.data)

      return response.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  },
)

// originalCollectionId만 있는 경우 삭제
// collectionID만 있는 경우 추가
// 둘 다 있는 경우 이동
export const itemToCollection = createAsyncThunk<
  any,
  IItemToCollectionParameter,
  {state: RootState}
>(
  'item/itemToCollection',
  async ({itemId, originalCollectionId, collectionId}, thunkAPI) => {
    try {
      const {accessToken} = thunkAPI.getState().user

      const response = await axios({
        method: 'PATCH',
        url: `${Config.API_BASE_URL}/item/${itemId}`,
        data: {originalCollectionId, collectionId},
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      return response.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  },
)

export const saveReview = createAsyncThunk<
  any,
  ISaveReviewParameter,
  {state: RootState}
>('item/saveReview', async ({itemId, isRecommend, stickers}, thunkAPI) => {
  try {
    const {accessToken} = thunkAPI.getState().user

    const response = await axios({
      method: 'POST',
      url: `${Config.API_BASE_URL}/item/${itemId}/review`,
      data: {isRecommend, stickers},
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })

    return response.data
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data)
  }
})

export const editReview = createAsyncThunk<
  any,
  IEditReviewParameter,
  {state: RootState}
>(
  'item/editReview',
  async (
    {itemId, reviewId, isRecommend, stickers}: IEditReviewParameter,
    thunkAPI,
  ) => {
    try {
      const {accessToken} = thunkAPI.getState().user
      const response = await axios({
        method: 'PATCH',
        url: `${Config.API_BASE_URL}/item/${itemId}/review/${reviewId}`,
        data: {isRecommend, stickers},
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      return response.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  },
)
