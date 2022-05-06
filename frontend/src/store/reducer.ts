import {combineReducers} from '@reduxjs/toolkit'
import uiSlice from './slices/ui'
import userSlice from './slices/user'
import itemSlice from './slices/item'

const rootReducer = combineReducers({
  ui: uiSlice.reducer,
  user: userSlice.reducer,
  item: itemSlice.reducer,
})

export default rootReducer
