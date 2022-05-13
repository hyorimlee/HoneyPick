import {createSelector, createSlice} from '@reduxjs/toolkit'
import {ItemState} from './types'
import {
  saveItem,
  getItem,
  itemToCollection,
  saveReview,
  editReview,
} from './asyncThunk'

const initialState: ItemState = {
  itemId: '',
  collectionId: '',
  saveCollection: 'no',
  item: {
    _id: '',
    brand: '',
    url: '',
    title: '',
    thumbnail: '',
    priceBefore: 0,
    priceAfter: 0,
    discountRate: 0,
    stickers: [],
  },
  review: {
    _id: '',
    user: '',
    item: '',
    isRecommend: 0,
    stickers: [],
  },
}

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setCollectionId(state, action) {
      state.collectionId = action.payload
    },
    setSaveCollection(state, action) {
      state.saveCollection = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(saveItem.fulfilled, (state, action) => {
        state.itemId = action.payload._id
      })
      .addCase(getItem.fulfilled, (state, action) => {
        console.log(action.payload.item)
        console.log(action.payload.review)
        state.item = action.payload.item
        state.review = action.payload.review
      })
      .addCase(saveReview.fulfilled, (state, action) => {
        // BE확인 받아야 함
        console.log(action.payload.review)
        state.review = action.payload.review
      })
      .addCase(editReview.fulfilled, (state, action) => {
        // BE확인 받아야 함
        console.log(action.payload.review)
        state.review = action.payload.review
      })
  },
})

export const {setCollectionId, setSaveCollection} = itemSlice.actions
export default itemSlice
