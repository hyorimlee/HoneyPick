import React, {memo, useEffect} from 'react'
import {Provider} from 'react-redux'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import EncryptedStorage from 'react-native-encrypted-storage'
import store from './src/store'
import {RootState, useAppDispatch, useAppSelector} from './src/store/types'
import SignIn from './src/pages/signIn'
import SignUp from './src/pages/signUp'
import ProfileStack from './src/pages/profile'
import SplashScreen from 'react-native-splash-screen'
import {requestAccessToken} from './src/store/slices/user/asyncThunk'
import axios from 'axios'
import {
  AnyAction,
  CombinedState,
  Dispatch,
  ThunkDispatch,
} from '@reduxjs/toolkit'

const Tab = createBottomTabNavigator()
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
        console.log('accessToken 기간만료! - accessToken 재요청')
        const refreshToken = await EncryptedStorage.getItem('refreshToken')
        const data = await dispatch(requestAccessToken({refreshToken}))

        config.headers.authorization = `Bearer ${data.payload.accessToken}`
        return axios(config)
      }

      return Promise.reject(error)
    },
  )
}

const InnerApp = memo(() => {
  const dispatch = useAppDispatch()
  const isLoggined = useAppSelector(state => !!state.user.accessToken)

  useEffect(() => {
    getRefreshToken(dispatch)
    axiosInterceptor(dispatch)
  }, [])

  return (
    <NavigationContainer>
      {isLoggined ? (
        <Tab.Navigator
          initialRouteName="Profile"
          screenOptions={{
            tabBarStyle: {
              backgroundColor: '#FFD669',
              borderTopLeftRadius: 30,
            },
          }}>
          <Tab.Screen
            name="Profile"
            component={ProfileStack}
            options={{title: '프로필', headerShown: false}}
          />
          {/* <Tab.Screen
            name="EventPage"
            component={}
            options={{title: '이벤트'}}
          />
          <Tab.Screen
            name="RecommandPage"
            component={}
            options={{title: '추천'}}
          /> */}
        </Tab.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Item">
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
          {/* <Stack.Screen
            name="Item"
            component={Item}
            options={{title: '아이템', headerShown: false}}
          /> */}
        </Stack.Navigator>
      )}
    </NavigationContainer>
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
