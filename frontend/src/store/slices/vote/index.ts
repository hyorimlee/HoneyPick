import {createSlice} from '@reduxjs/toolkit'
import {VoteInitialState} from './types'
import {createVote, getVoteList, getVote, endVote} from './asyncThunk'

const initialState: VoteInitialState = {
  currentVote: {
    _id: '',
    collectionId: '',
    title: '',
    result: [{_id: '', count: 0, title: '', priceBefore: 0, priceAfter: 0}],
    isPublic: true,
    isClosed: false,
    participants: [{_id: ''}],
    createdAt: '',
    updatedAt: '',
    __v: 0,
  },
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
      const isExist = state.selectedItems.find(
        item => item._id === action.payload._id,
      )
      if (isExist) {
        state.selectedItems = state.selectedItems.filter(
          item => item._id !== action.payload._id,
        )
      } else {
        state.selectedItems.push(action.payload)
      }
    },
    cleanSelectedItems(state) {
      state.selectedItems = []
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createVote.fulfilled, (state, action) => {
        state.currentVote = action.payload.vote
      })
      .addCase(getVote.fulfilled, (state, action) => {
        state.currentVote = action.payload.vote
        state.currentVote.result = state.currentVote?.result.sort((a, b) => {
          return b.count - a.count
        })
      })
      .addCase(getVoteList.fulfilled, (state, action) => {
        // console.log(action.payload.votes)
      })
      .addCase(endVote.fulfilled, (state, action) => {
        state.currentVote = action.payload.vote
      })
  },
})
export const {setCurrentVote, setSelectedItems, cleanSelectedItems} =
  voteSlice.actions
export default voteSlice
