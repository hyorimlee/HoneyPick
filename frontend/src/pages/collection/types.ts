import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'
import {CompositeNavigationProp} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../../../types/navigation'

export type CollectionStackParamList = {
  CollectionDefault: {accountId: string; collectionId: string} | undefined
}

export type CollectionNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootStackParamList, 'Collection'>,
  NativeStackNavigationProp<CollectionStackParamList, 'CollectionDefault'>
>
