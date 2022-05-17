import {createSlice} from '@reduxjs/toolkit'
import {IInitialState} from './types'

const initialState: IInitialState = {
  isModalOn: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsModalOn(state, action: {payload: boolean}) {
      state.isModalOn = action.payload
    },
  },
})

export default uiSlice
