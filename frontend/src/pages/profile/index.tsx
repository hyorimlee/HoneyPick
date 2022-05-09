import * as React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import EditProfile from './editProfile/index'
import Profile from './default'
import {useAppSelector} from '../../store/types'

const Stack = createNativeStackNavigator()

function ProfileStack() {
  const userId = useAppSelector(state => state.user.userId)
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Default"
        component={Profile}
        options={{headerShown: false}}
        initialParams={{userId}}
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
