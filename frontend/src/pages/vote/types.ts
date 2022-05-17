import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'
import {CompositeNavigationProp} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../types/navigation'

export type VoteStackParamList = {
  Default: {accountId: string, collectionId: string, voteId: string}
  VoteResult: {accountId: string, collectionId: string, voteId: string}
}

export type VoteNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootStackParamList, 'Vote'>,
  NativeStackNavigationProp<VoteStackParamList, 'Default'>
>
