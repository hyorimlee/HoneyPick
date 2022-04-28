import {TypedUseSelectorHook, useSelector, useDispatch} from 'react-redux'
import store from '.'
import rootReducer from './reducer'

// index.ts
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// reducer.ts
export type RootState = ReturnType<typeof rootReducer>
