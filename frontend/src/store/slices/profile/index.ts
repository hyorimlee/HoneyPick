import {createSlice} from '@reduxjs/toolkit'
import {getCollection} from '../collection/asyncThunk'

import {
  getFollowList,
  getLists,
  getProfile,
  setFollow,
  setProfile,
} from './asyncThunk'
import {IFollow, IInitialState} from './types'

// 조회한 유저의 정보
const initialState: IInitialState = {
  userId: '',
  username: '',
  nickname: '',
  profileImage: '',
  description: '',
  following: 0,
  follower: 0,
  collections: null,
  likes: null,
  votes: null,
  followingList: [],
  followerList: [],
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    changeFollow: (state, action) => {
      const {userId, myUserId} = action.payload
      let followingCnt = 0
      let newFollowing: IFollow | undefined
      let isAlready = false

      state.followerList = state.followerList.map((v: IFollow) => {
        if (v._id === userId) {
          if (!v.myFollow) {
            newFollowing = v
          }
          return {...v, myFollow: !v.myFollow}
        }
        return v
      })

      state.followingList = state.followingList.map((v: IFollow) => {
        if (v._id === userId) {
          isAlready = true
          followingCnt += !v.myFollow ? 1 : 0
          return {...v, myFollow: !v.myFollow}
        }
        followingCnt += !!v.myFollow ? 1 : 0
        return v
      })

      if (isAlready === false && newFollowing) {
        state.followingList.push({...newFollowing, myFollow: true})
        followingCnt++
      }

      if (state.userId === myUserId) {
        state.following = followingCnt
      }
    },
  },
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
      .addCase(getFollowList.rejected, (state, action) => {
        console.log(action.payload)
      })
      .addCase(setFollow.fulfilled, (state, action) => {
        console.log(action.payload)
      })
      .addCase(setFollow.rejected, (state, action) => {
        console.log(action.payload)
      })
  },
})

export default profileSlice
