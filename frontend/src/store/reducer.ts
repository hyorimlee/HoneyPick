import {combineReducers} from '@reduxjs/toolkit'
import uiSlice from './slices/ui'
import userSlice from './slices/user'
import profileSlice from './slices/profile'
import itemSlice from './slices/item'
import collectionSlice from './slices/collection'

const rootReducer = combineReducers({
  ui: uiSlice.reducer,
  user: userSlice.reducer,
  profile: profileSlice.reducer,
  item: itemSlice.reducer,
  collection: collectionSlice.reducer,
})

export default rootReducer
