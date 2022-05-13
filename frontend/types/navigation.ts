import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'
import {CompositeNavigationProp} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

export type RootStackParamList = {
  SignIn: undefined
  SignUp: undefined
}

export type BottomTabParamList = {
  Profile: undefined
  Item: undefined
}

export type ProfileStackParamList = {
  Default: {userId: string}
  EditProfile: undefined
  Collection: {accountId: string, collectionId: string} | undefined
  EditCollection: undefined
  Follow: {userId: string}
  CreateCollection: undefined
  CreateVote: undefined
}

export type CollectionStackParamList = {
  Default: {collection: any}
  EditCollection: undefined
  ItemPage: undefined
}

export type ChooseCollectionStackParamList = {
  Item: {itemId: string; collectionId: string}
}

export type ItemStackParamList = {
  Default: {itemId: string; collectionId: string}
  SetHoneyItem: undefined
}

export type ProfileNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Profile'>,
  NativeStackNavigationProp<ProfileStackParamList, 'Default'>
>

export type BottomTabProfileProp = BottomTabNavigationProp<
  BottomTabParamList,
  'Profile'
>
