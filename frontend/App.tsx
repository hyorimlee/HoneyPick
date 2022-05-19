import React, {memo, useCallback, useEffect, useRef, useState} from 'react'
import {Provider} from 'react-redux'
import {Modal, View, AppState} from 'react-native'
import {NavigationContainer, DefaultTheme} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import axios from 'axios'

import SplashScreen from 'react-native-splash-screen'
import Clipboard from '@react-native-clipboard/clipboard'
import EncryptedStorage from 'react-native-encrypted-storage'
import {
  AnyAction,
  CombinedState,
  Dispatch,
  ThunkDispatch,
} from '@reduxjs/toolkit'

import {RootState, useAppDispatch, useAppSelector} from './src/store/types'
import {requestAccessToken} from './src/store/slices/user/asyncThunk'
import store from './src/store'
import SignIn from './src/pages/signIn'
import SignUp from './src/pages/signUp'

import SaveItemBtn from './src/components/saveItemBtn'
import ModalView from './src/components/modalView'
import {
  Home,
  ItemStack,
  CollectionStack,
  FollowStack,
  VoteStack,
} from './src/pages/'
import uiSlice from '~/store/slices/ui'

const Stack = createNativeStackNavigator()

type IDispatch = ThunkDispatch<CombinedState<RootState>, undefined, AnyAction> &
  Dispatch

// 스플래시 스크린 시간동안 EncryptedStorage 에 저장된 refreshToken 을 이용하여 accessToken 발급받기
const getRefreshToken = async (dispatch: IDispatch) => {
  const refreshToken = await EncryptedStorage.getItem('refreshToken')
  if (!refreshToken) {
    SplashScreen.hide()
    return
  }

  dispatch(requestAccessToken({refreshToken}))
    .unwrap()
    .then(() => {
      SplashScreen.hide()
    })
    .catch(() => {
      SplashScreen.hide()
    })
}

// axios interceptor 정의
const axiosInterceptor = (dispatch: IDispatch) => {
  axios.interceptors.response.use(
    response => response,
    async error => {
      const {
        config,
        response: {status},
      } = error

      // access token 기간 만료시
      if (status === 419) {
        const refreshToken = await EncryptedStorage.getItem('refreshToken')
        const data = await dispatch(requestAccessToken({refreshToken}))

        config.headers.authorization = `Bearer ${data.payload.accessToken}`
        return axios(config)
      }

      return Promise.reject(error)
    },
  )
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F9C12E',
    background: '#FFFFFF',
  },
}

const InnerApp = memo(({}) => {
  const dispatch = useAppDispatch()
  const isLoggined = useAppSelector(state => !!state.user.accessToken)
  const {isModal} = useAppSelector(state => state.ui)
  const [copiedUrl, setCopiedUrl] = useState('')
  const appState = useRef(AppState.currentState)

  useEffect(() => {
    getRefreshToken(dispatch)
    axiosInterceptor(dispatch)
    Clipboard.setString('')

    const listener = AppState.addEventListener('change', nextAppState => {
      const isNowInactive = appState.current.match(/inactive|background/)

      if (isNowInactive && nextAppState === 'active') {
        const getClipboard = async () => {
          await Clipboard.hasString()
          const text = await Clipboard.getString()

          if (text.slice(0, 4) === 'http') {
            setCopiedUrl(text)
          }
        }
        getClipboard()
      }

      appState.current = nextAppState
    })

    return () => {
      listener.remove()
    }
  }, [])

  const btnShowHandler = useCallback(() => {
    setCopiedUrl('')
  }, [])

  const modalClose = useCallback(() => {
    dispatch(uiSlice.actions.setIsModal(false))
  }, [])

  return (
    <View style={{height: '100%'}}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName="SignIn">
          {isLoggined ? (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{title: '홈', headerShown: false}}
              />
              <Stack.Screen
                name="Item"
                component={ItemStack}
                options={{title: '아이템 상세', headerShown: false}}
              />
              <Stack.Screen
                name="Collection"
                component={CollectionStack}
                options={{title: '컬렉션 상세', headerShown: false}}
              />
              <Stack.Screen
                name="Follow"
                component={FollowStack}
                options={{title: '팔로우', headerShown: false}}
              />
              <Stack.Screen
                name="Vote"
                component={VoteStack}
                options={{title: '투표 결과', headerShown: false}}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{title: '로그인', headerShown: false}}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{title: '회원가입', headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
        {copiedUrl ? (
          <SaveItemBtn copiedUrl={copiedUrl} btnShowHandler={btnShowHandler} />
        ) : null}
        <Modal
          animationType="fade"
          transparent={true}
          visible={!!isModal}
          onRequestClose={modalClose}>
          <ModalView />
        </Modal>
      </NavigationContainer>
    </View>
  )
})

const App = () => {
  return (
    <Provider store={store}>
      <InnerApp />
    </Provider>
  )
}

export default App
