import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {BottomTabParamList} from '../../types'
import {EventStackParamList} from '../types'

export type EventDefaultNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Event'>,
  NativeStackNavigationProp<EventStackParamList, 'EventDefault'>
>

export type EventItemNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Event'>,
  NativeStackNavigationProp<EventStackParamList, 'EventItem'>
>
