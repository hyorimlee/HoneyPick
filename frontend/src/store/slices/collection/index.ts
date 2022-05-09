import axios from 'axios'
import Config from 'react-native-config'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {RootState} from '../../types'
import {CollectionState, CollectionListState, ICollectionListQuery} from './types'
import {
  getCollectionList,
  getCollection,
  createCollection,
  editCollection,
  deleteCollection
} from './asyncThunk'

const initialState: CollectionListState = {
  totalPages: 0,
  page: 0,
  collections: [{
    user: {
      _id: '-1',
      username: 'sample user'
    },
    title: 'My Collection',
    description: 'Description of Collection',
    isPublic: true,
    _id: '1',
    items: [],
    createdAt: '2022-05-07',
    updatedAt: '2022-05-07',
    // __v 무슨값?
    __v: 1,
  }]
}

const collectionSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(createCollection.fulfilled, (state, action) => {
        state.collections.push(action.payload.collection)
      })
      .addCase(createCollection.rejected, (state, action) => {
        console.log(action.payload)
      })
      .addCase(editCollection.fulfilled, (state, action) => {
        console.log(action.payload)
      })
      .addCase(editCollection.rejected, (state, action) => {
        console.log(action.payload)
      })
  },
})

export default collectionSlice