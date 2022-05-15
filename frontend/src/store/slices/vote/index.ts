import axios from 'axios'
import Config from 'react-native-config'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {RootState} from '../../types'
import {VoteInitialState} from './types'
import { ItemState } from '../item/types'
import {
  createVote,
  getVoteList,
  getVote,
  endVote,
  deleteVote,
  vote,
} from './asyncThunk'

const initialState: VoteInitialState = {
  currentVote: undefined,
  selectedItems: [],
}

const voteSlice = createSlice({
  name: 'vote',
  initialState,
  reducers: {
    setCurrentVote(state, action) {
      state.currentVote = action.payload
    },
    setSelectedItems(state, action) {
      state.selectedItems = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createVote.fulfilled, (state, action) => {
        state.currentVote = action.payload.vote
      })
      .addCase(getVote.fulfilled, (state, action) => {
        state.currentVote = action.payload.vote
      })
      .addCase(getVoteList.fulfilled, (state, action) => {
        console.log(action.payload.votes)
      })
  },
})
export const {setCurrentVote, setSelectedItems} = voteSlice.actions
export default voteSlice