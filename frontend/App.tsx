import React, {memo} from 'react'
import {Provider} from 'react-redux'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import store from './src/store'
import {useAppSelector} from './src/store/types'
import {getIsLoggined} from './src/store/slices/user'
import SignIn from './src/pages/signIn'
import SignUp from './src/pages/signUp'
import Item from './src/pages/item'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const InnerApp = memo(() => {
  const isLoggined = useAppSelector(getIsLoggined)

  return (
    <NavigationContainer>
      {isLoggined ? (
        <Tab.Navigator initialRouteName="">
          {/* <Tab.Screen
            name="EventPage"
            component={}
            options={{title: '이벤트'}}
          />
          <Tab.Screen
            name="RecommandPage"
            component={}
            options={{title: '추천'}}
          />
          <Tab.Screen
            name="MyPage"
            component={}
            options={{title: '마이페이지'}}
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
