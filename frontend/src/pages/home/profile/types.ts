import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'
import {BottomTabParamList} from '../types'

export type ProfileStackParamList = {
  Default: {userId: string}
  EditProfile: undefined
}

export type BottomTabProfile = BottomTabNavigationProp<
  BottomTabParamList,
  'Profile'
>
