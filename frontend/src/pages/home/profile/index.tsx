import * as React from 'react'
import {useEffect} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import EditProfile from './editProfile/index'
import Profile from './default'
import {useAppSelector} from '../../../store/types'
// import {
//   BottomTabProfileProp,
//   ProfileNavigationProp,
// } from '../../../../types/navigation'
import {useNavigation} from '@react-navigation/native'

const Stack = createNativeStackNavigator()

function ProfileStack({navigation}: {navigation: BottomTabProfileProp}) {
  const userId = useAppSelector(state => state.user.userId)
  const defaultNavigation = useNavigation<ProfileNavigationProp>()

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', event => {
      event.preventDefault()
      defaultNavigation.navigate('Default', {userId})
    })

    return unsubscribe
  }, [navigation])

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
