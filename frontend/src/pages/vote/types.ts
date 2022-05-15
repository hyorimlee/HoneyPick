import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'
import {CompositeNavigationProp} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../types/navigation'

export type VoteStackParamList = {
  CreateVote: undefined
  VoteResult: undefined
}

export type VoteNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootStackParamList, 'Vote'>,
  NativeStackNavigationProp<VoteStackParamList, 'CreateVote'>
>
