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
  deleteCollection,
} from './asyncThunk'

const initialState: CollectionInitialState = {
  currentCollection: {
    user: {
      _id: '-1',
      username: '',
      nickname: '',
      myFollow: false,
    },
    title: '',
    description: '',
    isPublic: true,
    _id: '-1',
    items: [],
    createdAt: '',
    updatedAt: '',
    __v: 1,
    thumbnail: '',
    myLiked: false,
  },
  currentItems: [],
}

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    changeMyFollow: state => {
      state.currentCollection!.user.myFollow =
        !state.currentCollection?.user.myFollow
    },
    changMyLike: state => {
      state.currentCollection.myLiked = !state.currentCollection.myLiked
    },
    collectionUserReset: state => {
      state.currentCollection.user._id = ''
    },
  },
  extraReducers: builder => {
    builder
      .addCase(editCollection.fulfilled, (state, action) => {
        state.currentCollection = action.payload.collection
      })
      .addCase(getCollection.fulfilled, (state, action) => {
        const thumbnail = action.payload.collection.items.length
          ? action.payload.items.slice(-1)[0].thumbnail
          : action.payload.collection.thumbnail

        state.currentCollection = action.payload.collection
        state.currentCollection.user.myFollow = action.payload.myFollow
        state.currentCollection.thumbnail = thumbnail
        state.currentCollection.myLiked = action.payload.liked
        state.currentItems = action.payload.items
      })
  },
})

export default collectionSlice
