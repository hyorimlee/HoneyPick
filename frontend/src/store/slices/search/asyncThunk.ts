import axios from 'axios'
import Config from 'react-native-config'
import {createAsyncThunk} from '@reduxjs/toolkit'
import {RootState, useAppSelector} from '../../types'
import {ISearchQuery} from './types'

export const search = createAsyncThunk<any, ISearchQuery, {state: RootState}>(
  'search/search',
  async ({ keyword, page }, thunkAPI) => {
    try {
      const {accessToken} = thunkAPI.getState().user
      const response = await axios({
        method: 'POST',
        url: `${Config.API_BASE_URL}/search?page=${page}`,
        headers: {
          authorization: `Bearer ${accessToken}`
        },
        data: {
          keyword
        }
      })
      return response.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)
