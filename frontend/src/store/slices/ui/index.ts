import {createSlice} from '@reduxjs/toolkit'
import {IInitialState} from './types'

const initialState: IInitialState = {
  isLoading: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsLoadingTrue(state) {
      console.log('ui-isloading-true')
      state.isLoading = true
    },
    setIsLoadingFalse(state) {
      state.isLoading = false
    },
  },
})

export default uiSlice
