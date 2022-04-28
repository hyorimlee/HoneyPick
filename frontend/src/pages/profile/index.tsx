import * as React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import EditProfile from './editProfile'
import Profile from './default'

const Stack = createNativeStackNavigator()

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Default"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}

export default ProfileStack
