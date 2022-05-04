import {combineReducers} from '@reduxjs/toolkit'
import uiSlice from './slices/ui'
import userSlice from './slices/user'
import profileSlice from './slices/profile'

const rootReducer = combineReducers({
  ui: uiSlice.reducer,
  user: userSlice.reducer,
  profile: profileSlice.reducer,
})

export default rootReducer
