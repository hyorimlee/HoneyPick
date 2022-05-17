import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'
import {BottomTabParamList} from '../types'

export type EventStackParamList = {
  EventDefault: undefined
  EventItem: {eventId: string}
}

export type BottomTabEvent = BottomTabNavigationProp<
  BottomTabParamList,
  'Event'
>
