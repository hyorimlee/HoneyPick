import React, {memo} from 'react'
import {Provider} from 'react-redux'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import store from './src/store'
import {useAppSelector} from './src/store/types'
import SignIn from './src/pages/signIn'
import SignUp from './src/pages/signUp'
import ProfileStack from './src/pages/profile'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const InnerApp = memo(() => {
  const isLoggined = useAppSelector(state => !!state.user.accessToken)

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
        <Stack.Navigator initialRouteName="SignIn">
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
