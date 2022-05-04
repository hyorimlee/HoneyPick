import {createSlice} from '@reduxjs/toolkit'
import EncryptedStorage from 'react-native-encrypted-storage'
import {
  requestAccessToken,
  requestPhoneVerify,
  requestPhoneVerifyCheck,
  requestSignIn,
  requestSignUp,
} from './asyncThunk'

const initialState = {
  userPk: -1,
  username: 'Honey_Bee',
  description:
    // '열글자를 넣기!! ABCD EF!! 1234 67!! 열글자를 넣기!! ABCD EF!! 1234 67!! 열글자를 넣기!! ABCD EF!! 1234 67!! 열글자를 넣기!! ',
    '열글자를 넣기!! 열글자를 넣기!! 열글자를 넣기!! 열글자를 넣기!! 열글자를 넣기!! ',
  profileImage:
    'https://www.pngfind.com/pngs/m/387-3877350_kakao-friends-ryan-png-kakao-friends-ryan-icon.png',
  accessToken: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload
    },
    setDescription(state, action) {
      state.description = action.payload
    },
    setProfileImage(state, action) {
      state.profileImage = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(requestAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken
      })
      .addCase(requestAccessToken.rejected, (state, action) => {
        console.log(action.payload)
      })
      .addCase(requestSignIn.fulfilled, (state, action) => {
        state.userPk = action.payload.userPk
        state.username = action.payload.username
        state.description = action.payload.description
        state.profileImage = action.payload.profile
        state.accessToken = action.payload.accessToken
        EncryptedStorage.setItem('refreshToken', action.payload.refreshToken)
          .then(() => console.log('login => refreshToken success'))
          .catch(err => console.log('login => refreshToken fail', err))
      })
      .addCase(requestSignIn.rejected, (state, action) => {
        console.log(action.payload)
      })
      .addCase(requestSignUp.fulfilled, (state, action) => {
        console.log(action.payload)
        state.userPk = action.payload.userPk
        state.username = action.payload.username
        state.description = action.payload.description
        state.profileImage = action.payload.profile
        state.accessToken = action.payload.accessToken
        EncryptedStorage.setItem('refreshToken', action.payload.refreshToken)
          .then(() => console.log('signup => refreshToken success'))
          .catch(err => console.log('signup => refreshToken fail', err))
      })
      .addCase(requestSignUp.rejected, (state, action) => {
        console.log(action.payload)
      })
      .addCase(requestPhoneVerify.fulfilled, (state, action) => {
        console.log(action.payload.phone.verificationCode)
      })
      .addCase(requestPhoneVerify.rejected, (state, action) => {
        console.log(action)
      })
      .addCase(requestPhoneVerifyCheck.rejected, (state, action) => {
        console.log(action)
      })
  },
})

export default userSlice
