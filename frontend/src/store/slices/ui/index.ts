import {createSlice} from '@reduxjs/toolkit'
import {IInitialState, IIsModal} from './types'

const initialState: IInitialState = {
  isModal: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsModal(state, action: {payload: IIsModal}) {
      state.isModal = action.payload
    },
  },
})

export default uiSlice
