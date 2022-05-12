import axios from 'axios'
import Config from 'react-native-config'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {RootState} from '../../types'
import {} from './types'
import {
  createVote,
  getVoteList,
  getVote,
  endVote,
  deleteVote,
  vote,
} from './asyncThunk'

const initialState = {

}

const voteSlice = createSlice({
  name: 'vote',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(getVoteList.fulfilled, (state, action) => {
        console.log(action.payload.votes)
      })
  },
})

export default voteSlice