import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'
import {CompositeNavigationProp} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {
  BottomTabParamList,
  ProfileStackParamList,
  CollectionStackParamList,
} from '../../../types/navigation'

export type CollectionNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Profile'>,
  NativeStackNavigationProp<CollectionStackParamList, 'EditCollection'>
>
