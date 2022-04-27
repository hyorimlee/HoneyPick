import {createSelector, createSlice} from '@reduxjs/toolkit'
import {RootState} from '../../types'

const initialState = {
  accessToken: '',
}

export const getIsLoggined = createSelector(
  [(state: RootState) => state.user.accessToken],
  accessToken => {
    return !!accessToken
  },
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
})

export default userSlice
