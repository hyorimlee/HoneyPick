import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {BottomTabParamList} from '../../types'
import {ProfileStackParamList} from '../types'

export type ProfileDefaultNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Profile'>,
  NativeStackNavigationProp<ProfileStackParamList, 'ProfileDefault'>
>

export type ProfileDefaultRoute = RouteProp<ProfileStackParamList>
