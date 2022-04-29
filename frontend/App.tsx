import React, {memo, useEffect} from 'react'
import {Provider} from 'react-redux'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import EncryptedStorage from 'react-native-encrypted-storage'
import store from './src/store'
import {useAppDispatch, useAppSelector} from './src/store/types'
import SignIn from './src/pages/signIn'
import SignUp from './src/pages/signUp'
import Item from './src/pages/item'
import ProfileStack from './src/pages/profile'
import SplashScreen from 'react-native-splash-screen'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const InnerApp = memo(() => {
  const dispatch = useAppDispatch()
  const isLoggined = useAppSelector(state => !!state.user.accessToken)

  useEffect(() => {
    const getRefreshToken = async () => {
      const refreshToken = await EncryptedStorage.getItem('refreshToken')
    }
    getRefreshToken()
    console.log('hide')
    SplashScreen.hide()
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
          <Stack.Screen
            name="Item"
            component={Item}
            options={{title: '아이템', headerShown: false}}
          />
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
