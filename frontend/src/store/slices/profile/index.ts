import {createSlice} from '@reduxjs/toolkit'
import {getCollection} from '../collection/asyncThunk'
import {getFollowList, getLists, getProfile, setProfile} from './asyncThunk'

// 조회한 유저의 정보
const initialState = {
  userId: '',
  username: '',
  nickname: '',
  profileImage: '',
  description: '',
  following: 0,
  follower: 0,
  collections: [],
  likes: [],
  votes: [],
  followingList: [],
  followerList: [],
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
        console.log(action.payload)
      })
      .addCase(getLists.fulfilled, (state, action) => {
        state.collections = action.payload[0].collections
        state.votes = action.payload[1].votes
        state.likes = action.payload.length === 3 ? action.payload[2].likes : []
      })
      .addCase(getLists.rejected, (state, action) => {
        console.log(action.payload)
      })
      .addCase(getFollowList.fulfilled, (state, action) => {
        state.followingList = action.payload[0].followings
        state.followerList = action.payload[1].followers
      })
  },
})

export default profileSlice
