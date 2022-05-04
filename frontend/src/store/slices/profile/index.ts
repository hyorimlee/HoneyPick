import {createSlice} from '@reduxjs/toolkit'
import {getProfile} from './asyncThunk'

const initialState = {
  username: '',
  profileImage: '',
  description: '',
  following: 0,
  follower: 0,
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProfile.fulfilled, (state, {payload}) => {
      state.username = payload.username
      state.profileImage = payload.profileImage
      state.description = payload.description
      state.following = payload.following
      state.follower = payload.follower
    })
  },
})

export default profileSlice
