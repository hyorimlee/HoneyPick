import {combineReducers} from '@reduxjs/toolkit'
import uiSlice from './slices/ui'
import userSlice from './slices/user'
import collectionSlice from './slices/collection'

const rootReducer = combineReducers({
  ui: uiSlice.reducer,
  user: userSlice.reducer,
  collection: collectionSlice.reducer,
})

export default rootReducer
