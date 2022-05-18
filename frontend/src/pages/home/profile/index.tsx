import * as React from 'react'
import {useEffect} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import EditProfile from './editProfile/index'
import Profile from './default'
import {useAppSelector} from '~/store/types'
import {useNavigation} from '@react-navigation/native'
import {BottomTabProfile} from './types'
import {ProfileDefaultNavigationProp} from './default/types'

const Stack = createNativeStackNavigator()

function ProfileStack({navigation}: {navigation: BottomTabProfile}) {
  const userId = useAppSelector(state => state.user.userId)
  const defaultNavigation = useNavigation<ProfileDefaultNavigationProp>()

  useEffect(() => {
    const listener = navigation.addListener('tabPress', event => {
      event.preventDefault()
      defaultNavigation.navigate('ProfileDefault', {userId})
    })

    return listener
  }, [navigation])

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileDefault"
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
