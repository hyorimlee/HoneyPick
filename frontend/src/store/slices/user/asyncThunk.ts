import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import Config from 'react-native-config'
import {RootState} from '../../types'

import {
  IAccessToken,
  IPhoneVerifyCheckParameter,
  IPhoneVerifyParameter,
  ISignInParameter,
  ISignUpParameter,
} from './types'

export const requestAccessToken = createAsyncThunk(
  'user/accessToken',
  async ({refreshToken}: IAccessToken, thunkAPI) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${Config.API_BASE_URL}/auth/refresh`,
        headers: {
          authorization: `Bearer ${refreshToken}`,
        },
        timeout: 10000,
      })

      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const requestSignIn = createAsyncThunk(
  'user/signIn',
  async ({username, password}: ISignInParameter, thunkAPI) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${Config.API_BASE_URL}/auth/login`,
        data: {username, password},
      })

      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const requestSignUp = createAsyncThunk(
  'user/signUp',
  async ({username, password, nickname, phone}: ISignUpParameter, thunkAPI) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${Config.API_BASE_URL}/auth/signup`,
        data: {username, password, nickname, phone},
      })

      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const requestPhoneVerify = createAsyncThunk(
  'user/phoneVerify',
  async ({phoneNumber}: IPhoneVerifyParameter, thunkAPI) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${Config.API_BASE_URL}/phone/`,
        data: {phoneNumber},
      })

      return response.data
    } catch (error: any) {
      console.log('phoneVerify', error.response.data)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const requestPhoneVerifyCheck = createAsyncThunk(
  'user/phoneVerifyCheck',
  async ({phoneId, verificationCode}: IPhoneVerifyCheckParameter, thunkAPI) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${Config.API_BASE_URL}/phone/check`,
        data: {phoneId, verificationCode},
      })
      console.log('phoneVerifyCHK', response.data)
      return response.data
    } catch (error: any) {
      console.log('phoneVerifyCHK', error.response.data)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const getUserCollectionList = createAsyncThunk<
  any,
  undefined,
  {state: RootState}
>('user/getUserCollectionList', async (_, thunkAPI) => {
  try {
    const {accessToken, userId} = thunkAPI.getState().user
    const response = await axios({
      method: 'GET',
      url: `${Config.API_BASE_URL}/collection/${userId}`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data)
  }
})
