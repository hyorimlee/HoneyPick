import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import Config from 'react-native-config'
import {RootState} from '../../types'

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
  {
    nickname: string
    description: string
    phone?: string
    imageType?: string
    profileImage?: string
  },
  {state: RootState}
>(
  'profile/setProfile',
  async ({nickname, description, phone, imageType, profileImage}, thunkAPI) => {
    try {
      const {userId, accessToken} = thunkAPI.getState().user

      const response = await axios({
        method: 'PATCH',
        url: `${Config.API_BASE_URL}/profile/`,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        data: {userId, nickname, description, phone, imageType},
      })

      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const getLists = createAsyncThunk<
  any,
  {accountId: string},
  {state: RootState}
>('profile/getCollections', async ({accountId}, thunkAPI) => {
  try {
    const {accessToken, userId} = thunkAPI.getState().user

    const getCollections = () =>
      axios({
        method: 'GET',
        url: `${Config.API_BASE_URL}/collection/${accountId}`,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })

    const getLikes = () =>
      axios({
        method: 'GET',
        url: `${Config.API_BASE_URL}/like`,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })

    const getVotes = () =>
      axios({
        method: 'GET',
        url: `${Config.API_BASE_URL}/vote/?accountId=${accountId}`,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })

    const response =
      accountId === userId && userId !== undefined
        ? await axios.all([getCollections(), getVotes(), getLikes()])
        : await axios.all([getCollections(), getVotes()])

    return response.map(v => v.data)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const getFollowList = createAsyncThunk<
  any,
  undefined,
  {state: RootState}
>('profile/getFollowingList', async (_, thunkAPI) => {
  try {
    const {accessToken} = thunkAPI.getState().user
    const {userId} = thunkAPI.getState().profile

    const response = await axios.all([
      axios({
        method: 'GET',
        url: `${Config.API_BASE_URL}/follow/${userId}/followings`,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }),
      axios({
        method: 'GET',
        url: `${Config.API_BASE_URL}/follow/${userId}/followers`,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }),
    ])

    return [response[0].data, response[1].data]
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const setFollow = createAsyncThunk<
  any,
  {userId: string},
  {state: RootState}
>('profile/setFollow', async ({userId}, thunkAPI) => {
  try {
    const {accessToken} = thunkAPI.getState().user

    const response = await axios({
      method: 'POST',
      url: `${Config.API_BASE_URL}/follow`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      data: {accountId: userId},
    })

    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})
