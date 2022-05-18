import {ProfileDefaultNavigationProp} from '~/pages/home/profile/default/types'
import axios from 'axios'
import Config from 'react-native-config'
import {createAsyncThunk} from '@reduxjs/toolkit'
import {RootState} from '../../types'
import {ISaveEventParameter, IEditEventParameter} from './types'

// export const saveEvent = createAsyncThunk<any, ISaveEventParameter, {state: RootState}>(
//   'event/saveEvent',
//   async ({title, description, additional}, thunkAPI) => {
//     try {
//       const {accessToken} = thunkAPI.getState().user
//       const response = await axios({
//         method: 'POST',
//         url: `${Config.API_BASE_URL}/event`,
//         data: {title, description, additional},
//         headers: {
//           authorization: `Bearer ${accessToken}`,
//         }
//       })
//       return response.data
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(err.response.data)
//     }
//   }
// )

export const getEventList = createAsyncThunk<
  any,
  undefined,
  {state: RootState}
>('event/getEventList', async (_, thunkAPI) => {
  try {
    const {accessToken} = thunkAPI.getState().user
    const response = await axios({
      method: 'GET',
      url: `${Config.API_BASE_URL}/event`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })

    return response.data
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data)
  }
})

export const getEvent = createAsyncThunk<any, string, {state: RootState}>(
  'event/getEvent',
  async (eventId, thunkAPI) => {
    try {
      const {accessToken} = thunkAPI.getState().user
      const response = await axios({
        method: 'GET',
        url: `${Config.API_BASE_URL}/event/${eventId}`,
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

export const editEvent = createAsyncThunk<
  any,
  IEditEventParameter,
  {state: RootState}
>(
  'event/editEvent',
  async ({eventId, title, description, additional}, thunkAPI) => {
    try {
      const {accessToken} = thunkAPI.getState().user
      const response = await axios({
        method: 'PATCH',
        url: `${Config.API_BASE_URL}/event/${eventId}`,
        data: {title, description, additional},
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
