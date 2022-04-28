import {combineReducers} from '@reduxjs/toolkit'
import uiSlice from './slices/ui'
import userSlice from './slices/user'

const rootReducer = combineReducers({
  ui: uiSlice.reducer,
  user: userSlice.reducer,
})

export default rootReducer
