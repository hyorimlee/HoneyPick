import {createSelector, createSlice} from '@reduxjs/toolkit'
import {RootState} from '../../types'

const initialState = {
  username: 'Honey_Bee',
  description:
    // '열글자를 넣기!! ABCD EF!! 1234 67!! 열글자를 넣기!! ABCD EF!! 1234 67!! 열글자를 넣기!! ABCD EF!! 1234 67!! 열글자를 넣기!! ',
    '열글자를 넣기!! 열글자를 넣기!! 열글자를 넣기!! 열글자를 넣기!! 열글자를 넣기!! ',
  profileImage:
    'https://www.pngfind.com/pngs/m/387-3877350_kakao-friends-ryan-png-kakao-friends-ryan-icon.png',
  accessToken: 'temp',
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
})

export default userSlice
