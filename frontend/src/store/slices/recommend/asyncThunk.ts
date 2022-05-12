import axios from 'axios'
import Config from 'react-native-config'
import {createAsyncThunk} from '@reduxjs/toolkit'
import {RootState} from '../../types'
import {IRecommendQuery} from './types'

export const getRecommend = createAsyncThunk<any, IRecommendQuery, {state: RootState}>(
  'recommend/getRecommend',
  async ({ }, thunkAPI) => {
    try {
      const {accessToken} = thunkAPI.getState().user
      const response = await axios({
        method: 'GET',
        url: `${Config.API_BASE_URL}/recommend`,
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
