import {RouteProp} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

export type RootStackParamList = {
  Home: undefined
  Item: {itemId: string; collectionId: string}
  Collection: {accountId: string; collectionId: string} | undefined
  Follow: {type: 'following' | 'follower'}
  Vote: {
    accountId: string
    collectionId: string
    voteId: string
    isClosed: boolean
  }
  SignIn: undefined
  SignUp: undefined
  Event: undefined
}

// 최상단 스택간 이동하는 navigation type
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>

export type FollowRoute = RouteProp<RootStackParamList, 'Follow'>
