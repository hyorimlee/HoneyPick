import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'

export type BottomTabParamList = {
  Profile: undefined
  Recommend: undefined
  Search: undefined
}

export type BottomTabProfileProp = BottomTabNavigationProp<
  BottomTabParamList,
  'Profile'
>
