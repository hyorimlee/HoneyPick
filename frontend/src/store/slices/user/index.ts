import {createSlice} from '@reduxjs/toolkit'
import {Alert} from 'react-native'
import EncryptedStorage from 'react-native-encrypted-storage'
import {
  requestAccessToken,
  requestPhoneVerify,
  requestPhoneVerifyCheck,
  requestSignIn,
  requestSignUp,
  getUserCollectionList,
} from './asyncThunk'
import {UserState} from './types'

const initialState: UserState = {
  userId: '',
  accessToken: '',
  collections: [],
  nickname: '',
  username: '',
  isAdmin: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setReset: state => {
      state.userId = ''
      state.accessToken = ''
      state.collections = []
    },
  },
  extraReducers: builder => {
    builder
      .addCase(requestAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken
        state.userId = action.payload.userId
        state.username = action.payload.username
        state.nickname = action.payload.nickname
        state.isAdmin = action.payload.isAdmin
      })
      .addCase(requestSignIn.fulfilled, (state, action) => {
        state.userId = action.payload.userId
        state.accessToken = action.payload.accessToken
        state.username = action.payload.username
        state.nickname = action.payload.nickname
        state.isAdmin = action.payload.isAdmin
        EncryptedStorage.setItem('refreshToken', action.payload.refreshToken)
          .then(() => console.log('login => refreshToken success'))
          .catch(err => console.log('login => refreshToken fail', err))
      })
      .addCase(requestSignUp.fulfilled, (state, action) => {
        state.userId = action.payload.userId
        state.accessToken = action.payload.accessToken
        state.username = action.payload.username
        state.nickname = action.payload.nickname
        state.isAdmin = action.payload.isAdmin
        EncryptedStorage.setItem('refreshToken', action.payload.refreshToken)
          .then(() => console.log('signup => refreshToken success'))
          .catch(err => console.log('signup => refreshToken fail', err))
      })
      .addCase(requestPhoneVerify.fulfilled, (state, action) => {
        console.log(action.payload.phone.verificationCode)
      })
      .addCase(getUserCollectionList.fulfilled, (state, action) => {
        state.collections = action.payload.collections
      })
  },
})

export default userSlice
