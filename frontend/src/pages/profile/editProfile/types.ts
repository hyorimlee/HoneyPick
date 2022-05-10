import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'
import {CompositeNavigationProp} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {
  BottomTabParamList,
  ProfileStackParamList,
} from '../../../../types/navigation'

export type ProfileNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Profile'>,
  NativeStackNavigationProp<ProfileStackParamList, 'Default'>
>

export type ProfileImage = string | {uri: string; name: string; type: string}
