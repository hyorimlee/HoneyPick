import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'
import {CompositeNavigationProp} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {BottomTabParamList} from '../types'

export type ProfileStackParamList = {
  Default: {userId: string}
  EditProfile: undefined
}

export type ProfileToDefault = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Profile'>,
  NativeStackNavigationProp<ProfileStackParamList, 'Default'>
>
