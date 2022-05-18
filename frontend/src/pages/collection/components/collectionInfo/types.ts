import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'
import {CompositeNavigationProp} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {ProfileStackParamList} from '~/pages/home/profile/types'
import {BottomTabParamList} from '~/pages/home/types'

export interface IComponentProps {
  accountId: string
  collectionId: string
}

export type goToProfile = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Profile'>,
  NativeStackNavigationProp<ProfileStackParamList, 'ProfileDefault'>
>
