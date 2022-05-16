import {combineReducers} from '@reduxjs/toolkit'
import uiSlice from './slices/ui'
import userSlice from './slices/user'
import profileSlice from './slices/profile'
import itemSlice from './slices/item'
import collectionSlice from './slices/collection'
import voteSlice from './slices/vote'
import recommendSlice from './slices/recommend'
import eventSlice from './slices/event'
import searchSlice from './slices/search'

const rootReducer = combineReducers({
  ui: uiSlice.reducer,
  user: userSlice.reducer,
  profile: profileSlice.reducer,
  item: itemSlice.reducer,
  collection: collectionSlice.reducer,
  vote: voteSlice.reducer,
  recommend: recommendSlice.reducer,
  event: eventSlice.reducer,
  search: searchSlice.reducer
})

export default rootReducer
