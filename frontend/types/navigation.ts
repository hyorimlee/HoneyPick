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
  Collection: {collection: object} | undefined
  EditCollection: undefined
  Follow: {userId: string}
}

export type CollectionStackParamList = {
  Default: {collection: any}
  EditCollection: undefined
  ItemPage: undefined
}

export type ChooseCollectionStackParamList = {
  Item: {itemId: string, collectionId: string}
}

export type ItemStackParamList = {
  Default: undefined
  SetHoneyItem: undefined
}