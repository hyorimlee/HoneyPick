import axios from 'axios'
import Config from 'react-native-config'
import {createAsyncThunk} from '@reduxjs/toolkit'
import {RootState} from '../../types'
import {IVoteInfo, IVoteQuery, IVoteListQuery, IItemVoteQuery} from './types'

export const createVote = createAsyncThunk<string, IVoteInfo, {state: RootState}>(
  'vote/createVote',
  async (voteInfo, thunkAPI) => {
    try {
      const {accessToken} = thunkAPI.getState().user
      const response = await axios({
        method: 'POST',
        url: `${Config.API_BASE_URL}/vote`,
        data: voteInfo,
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

export const getVoteList = createAsyncThunk<any, IVoteListQuery, {state: RootState}>(
  'vote/getVoteList',
  async ({accountId, page}, thunkAPI) => {
    try {
      const {accessToken} = thunkAPI.getState().user
      const response = await axios({
        method: 'GET',
        url: `${Config.API_BASE_URL}/vote/${accountId}?page=${page}`,
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      })
      console.log(response.data)

      return response.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const getVote = createAsyncThunk<string, IVoteQuery, {state: RootState}>(
  'vote/getvote',
  async ({accountId, voteId}, thunkAPI) => {
    try {
      const {accessToken} = thunkAPI.getState().user
      const response = await axios({
        method: 'GET',
        url: `${Config.API_BASE_URL}/vote/${accountId}/${voteId}`,
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

export const endVote = createAsyncThunk<string, IVoteQuery, {state: RootState}>(
  'vote/endVote',
  async ({accountId, voteId}, thunkAPI) => {
    try {
      const {accessToken} = thunkAPI.getState().user
      const response = await axios({
        method: 'PATCH',
        url: `${Config.API_BASE_URL}/vote/${accountId}/${voteId}`,
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

export const deleteVote = createAsyncThunk<string, IVoteQuery, {state: RootState}>(
  'vote/deleteVote',
  async ({accountId, voteId}, thunkAPI) => {
    try {
      const {accessToken} = thunkAPI.getState().user
      const response = await axios({
        method: 'DELETE',
        url: `${Config.API_BASE_URL}/vote/${accountId}/${voteId}`,
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

export const vote = createAsyncThunk<string, IItemVoteQuery, {state: RootState}>(
  'vote/vote',
  async ({accountId, voteId, itemId}, thunkAPI) => {
    try {
      const {accessToken} = thunkAPI.getState().user
      const response = await axios({
        method: 'PATCH',
        url: `${Config.API_BASE_URL}/vote/${accountId}/${voteId}/${itemId}`,
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