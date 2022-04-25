import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const App = () => {
  const [tmp, setTmp] = useState(false)

  return (
    <NavigationContainer>
      {tmp ? (
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
        <Stack.Navigator initialRouteName="SignIn">
          {/* <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{title: '로그인'}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{title: '회원가입'}}
          /> */}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}

export default App
