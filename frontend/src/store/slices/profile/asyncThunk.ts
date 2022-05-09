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
      url: `${Config.API_BASE_URL}/profile/${userId}`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })

    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const setProfile = createAsyncThunk<
  any,
  {nickname: string; description: string; phone?: string},
  {state: RootState}
>('profile/setProfile', async ({nickname, description, phone}, thunkAPI) => {
  try {
    const {userId, accessToken} = thunkAPI.getState().user

    const response = await axios({
      method: 'PATCH',
      url: `${Config.API_BASE_URL}/profile/`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      data: {userId, nickname, description, phone},
    })

    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const setProfileImageToServer = createAsyncThunk(
  'profile/setProfileImageToServer',
  async (_, thunkAPI) => {
    try {
      const response = await axios({})

      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)
