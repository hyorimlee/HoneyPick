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
  currentVote: {}
}

const voteSlice = createSlice({
  name: 'vote',
  initialState,
  reducers: {
    setCurrentVote(state, action) {
      state.currentVote = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createVote.fulfilled, (state, action) => {
        state.currentVote = action.payload.vote
        console.log(state)
      })
      .addCase(getVote.fulfilled, (state, action) => {
        state.currentVote = action.payload.vote
        console.log('겟', state)
      })
      .addCase(getVoteList.fulfilled, (state, action) => {
        console.log(action.payload.votes)
      })
  },
})
export const {setCurrentVote} = voteSlice.actions
export default voteSlice