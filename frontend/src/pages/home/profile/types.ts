import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'
import {BottomTabParamList} from '../types'

export type ProfileStackParamList = {
  ProfileDefault: {userId: string}
  EditProfile: undefined
}

export type BottomTabProfile = BottomTabNavigationProp<
  BottomTabParamList,
  'Profile'
>
