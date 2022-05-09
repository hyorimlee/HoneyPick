import axios from 'axios'
import Config from 'react-native-config'
import {createAsyncThunk} from '@reduxjs/toolkit'
import {RootState} from '../../types'
import {ICollectionListQuery, ICollectionQuery, IEditCollectionQuery, ICollectionInfo} from './types'

export const getCollectionList = createAsyncThunk<string, ICollectionListQuery, {state: RootState}>(
  'collection/getCollectionList',
  async ({accountId, page}, thunkAPI) => {
    try {
      const {accessToken} = thunkAPI.getState().user
      const response = await axios({
        method: 'GET',
        url: `${Config.API_BASE_URL}/collection/${accountId}?page=${page}`,
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

export const createCollection = createAsyncThunk<any, ICollectionInfo, {state: RootState}>(
  'collection/createCollection',
  async (collectionInfo, thunkAPI) => {
    try {
      const {accessToken} = thunkAPI.getState().user
      const response = await axios({
        method: 'POST',
        url: `${Config.API_BASE_URL}/collection`,
        data: collectionInfo,
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

export const getCollection = createAsyncThunk<string, ICollectionQuery, {state: RootState}>(
  'collection/getCollection',
  async ({accountId, collectionId}, thunkAPI) => {
    try {
      const {accessToken} = thunkAPI.getState().user
      const response = await axios({
        method: 'GET',
        url: `${Config.API_BASE_URL}/collection/${accountId}/${collectionId}`,
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

export const editCollection = createAsyncThunk<string, IEditCollectionQuery, {state: RootState}>(
  'collection/editCollection',
  async ({accountId, collectionId, collectionInfo}, thunkAPI) => {
    try {
      const {accessToken} = thunkAPI.getState().user
      const response = await axios({
        method: 'PATCH',
        url: `${Config.API_BASE_URL}/collection/${accountId}/${collectionId}`,
        data: {collectionInfo},
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

export const deleteCollection = createAsyncThunk<string, ICollectionQuery, {state: RootState}>(
  'collection/deleteCollection',
  async ({accountId, collectionId}, thunkAPI) => {
    try {
      const {accessToken} = thunkAPI.getState().user
      const response = await axios({
        method: 'DELETE',
        url: `${Config.API_BASE_URL}/collection/${accountId}/${collectionId}`,
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