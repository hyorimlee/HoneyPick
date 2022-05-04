import {CombinedState, createAsyncThunk} from '@reduxjs/toolkit'
import axios, {Axios, AxiosResponse} from 'axios'
import Config from 'react-native-config'
import {RootState} from '../../types'
import userSlice from '../user'

export const getProfile = createAsyncThunk<
  any,
  {userId: string},
  {state: RootState}
>('profile/getProfile', async ({userId}, thunkAPI) => {
  try {
    const {accessToken} = thunkAPI.getState().user

    const response = await axios({
      method: 'GET',
      url: `${Config.API_BASE_URL}/profile/`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      data: {userId},
    })

    return response.data
  } catch (error: any) {
    thunkAPI.rejectWithValue(error.response.data)
  }
})
