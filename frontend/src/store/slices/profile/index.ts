import {createSlice} from '@reduxjs/toolkit'
import {getProfile, setProfile} from './asyncThunk'

// 조회한 유저의 정보
const initialState = {
  userId: '',
  username: '',
  nickname: '',
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
    builder
      .addCase(getProfile.fulfilled, (state, action) => {
        state.userId = action.payload.userId
        state.username = action.payload.username
        state.nickname = action.payload.nickname
        state.profileImage = action.payload.profileImage
        state.description = action.payload.description
        state.following = action.payload.following
        state.follower = action.payload.follower
      })
      .addCase(getProfile.rejected, (state, action) => {
        console.log(action.payload)
      })
      .addCase(setProfile.rejected, (state, action) => {
        console.log(action)
      })
  },
})

export default profileSlice
