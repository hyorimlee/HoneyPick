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
      const isExist = state.selectedItems.find((item) => item._id === action.payload._id)
      if (isExist) {
        state.selectedItems = state.selectedItems.filter((item) => item._id !== action.payload._id)
      } else {
        state.selectedItems.push(action.payload)
      }
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
      .addCase(endVote.fulfilled, (state, action) => {
        state.currentVote = action.payload.vote
      })
  },
})
export const {setCurrentVote, setSelectedItems} = voteSlice.actions
export default voteSlice