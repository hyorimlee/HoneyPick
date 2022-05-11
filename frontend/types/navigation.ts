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
}

export type CollectionStackParamList = {
  Default: undefined
  EditCollection: undefined
  ItemPage: undefined
}

export type ItemStackParamList = {
  Default: {itemId: string, collectionId: string}
  SetHoneyItem: undefined
}