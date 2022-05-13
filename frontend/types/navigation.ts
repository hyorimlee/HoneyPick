import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'
import {CompositeNavigationProp} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

export type RootStackParamList = {
  Home: undefined
  ItemStack: undefined
  CollectionStack: undefined
  CreateCollectionStack: undefined
  FollowStack: undefined
  VoteStack: undefined
  SignIn: undefined
  SignUp: undefined
}

// Collection: {accountId: string; collectionId: string} | undefined
// EditCollection: undefined
// Follow: {userId: string}
// CreateCollection: undefined
// CreateVote: undefined

// export type ChooseCollectionStackParamList = {
//   Item: {itemId: string; collectionId: string}
// }

// export type ItemStackParamList = {
//   Default: {itemId: string; collectionId: string}
//   SetHoneyItem: undefined
// }
