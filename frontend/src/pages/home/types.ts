import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'

export type BottomTabParamList = {
  Profile: undefined
  Recommand: undefined
  Search: undefined
}

export type BottomTabProfileProp = BottomTabNavigationProp<
  BottomTabParamList,
  'Profile'
>
