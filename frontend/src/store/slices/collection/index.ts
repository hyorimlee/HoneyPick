import axios from 'axios'
import Config from 'react-native-config'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {RootState} from '../../types'
import {CollectionInitialState} from './types'
import {
  getCollectionList,
  getCollection,
  createCollection,
  editCollection,
  deleteCollection
} from './asyncThunk'

const initialState: CollectionInitialState = {
  currentCollection: {
    user: {
      _id: '-1',
      username: 'sample user'
    },
    title: '',
    description: 'Description of Collection',
    isPublic: true,
    _id: '1',
    items: [],
    createdAt: '2022-05-07',
    updatedAt: '2022-05-07',
    __v: 1,
  },
  currentItems: []
}

const collectionSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(editCollection.fulfilled, (state, action) => {
        state.currentCollection = action.payload.collection
      })
      .addCase(editCollection.rejected, (state, action) => {
        console.log(action.payload)
      })
      .addCase(getCollection.fulfilled, (state, action) => {
        console.log(action.payload)
        state.currentCollection = action.payload.collection
        state.currentItems = action.payload.items
        console.log(state)
      })
  },
})

export default collectionSlice