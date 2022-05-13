import {NativeStackNavigationProp} from '@react-navigation/native-stack'

export type RootStackParamList = {
  Home: undefined
  Item: undefined
  Collection: {accountId: string; collectionId: string} | undefined
  CreateCollection: undefined
  Follow: {userId: string}
  Vote: undefined
  SignIn: undefined
  SignUp: undefined
}

// 최상단 스택간 이동하는 navigation type
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>

// export type ChooseCollectionStackParamList = {
//   Item: {itemId: string; collectionId: string}
// }

// export type ItemStackParamList = {
//   Default: {itemId: string; collectionId: string}
//   SetHoneyItem: undefined
// }
