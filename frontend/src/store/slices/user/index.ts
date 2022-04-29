import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import Config from 'react-native-config'
import EncryptedStorage from 'react-native-encrypted-storage'
import uiSlice from '../ui'

const initialState = {
  username: 'Honey_Bee',
  description:
    // '열글자를 넣기!! ABCD EF!! 1234 67!! 열글자를 넣기!! ABCD EF!! 1234 67!! 열글자를 넣기!! ABCD EF!! 1234 67!! 열글자를 넣기!! ',
    '열글자를 넣기!! 열글자를 넣기!! 열글자를 넣기!! 열글자를 넣기!! 열글자를 넣기!! ',
  profileImage:
    'https://www.pngfind.com/pngs/m/387-3877350_kakao-friends-ryan-png-kakao-friends-ryan-icon.png',
  accessToken: '',
}

export const requestSignIn = createAsyncThunk(
  'user/signIn',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(uiSlice.actions.setIsLoadingTrue())

      const response = await axios({
        method: 'GET',
        url: `${Config.API_BASE_URL}/auth`,
      })

      thunkAPI.dispatch(uiSlice.actions.setIsLoadingFalse())

      return response.data
    } catch (error: any) {
      thunkAPI.dispatch(uiSlice.actions.setIsLoadingFalse())
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

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
    builder.addCase(requestSignIn.fulfilled, (state, action) => {
      state.username = action.payload
      state.description = action.payload
      state.profileImage = action.payload
      state.accessToken = action.payload
      EncryptedStorage.setItem('refreshToken', action.payload)
        .then(() => console.log('저장'))
        .catch(err => console.log(err))
    })
  },
})

export default userSlice
