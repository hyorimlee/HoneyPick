import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IInitialState} from './types'

const initialState: IInitialState = {}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {},
})

export default uiSlice
