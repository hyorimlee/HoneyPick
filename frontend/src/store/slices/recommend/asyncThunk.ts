import axios from 'axios'
import Config from 'react-native-config'
import {createAsyncThunk} from '@reduxjs/toolkit'
import {RootState} from '../../types'
import {IRecommendCollectionQuery, IRecommendItemQuery} from './types'

export const getCollectionRecommend = createAsyncThunk<
  any,
  IRecommendCollectionQuery,
  {state: RootState}
>('recommend/getCollection', async ({page = 1}, thunkAPI) => {
  try {
    const {accessToken} = thunkAPI.getState().user
    const response = await axios({
      method: 'GET',
      url: `${Config.API_BASE_URL}/recommend/collection?page=${page}`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })

    return response.data
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data)
  }
})

export const getItemRecommend = createAsyncThunk<
  any,
  IRecommendItemQuery,
  {state: RootState}
>('recommend/getItem', async ({page = 1}, thunkAPI) => {
  try {
    const {accessToken} = thunkAPI.getState().user
    const response = await axios({
      method: 'GET',
      url: `${Config.API_BASE_URL}/recommend/item?page=${page}`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })

    console.log(response.data)

    console.log(response.data.items[4].title)
    console.log(response.data.items[4].itemList[0].stickers)
    console.log(response.data.items[4].title)
    console.log(response.data.items[4].itemList.slice(-1)[0].stickers)

    return response.data
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data)
  }
})
