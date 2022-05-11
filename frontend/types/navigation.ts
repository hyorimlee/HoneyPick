export type RootStackParamList = {
  SignIn: undefined
  SignUp: undefined
}

export type BottomTabParamList = {
  Profile: undefined
}

export type ProfileStackParamList = {
  Default: {userId: string}
  EditProfile: undefined
  Collection: {collection: object} | undefined
  EditCollection: undefined
}

export type CollectionStackParamList = {
  Default: {collection: any}
  EditCollection: undefined
  ItemPage: undefined
}

export type ChooseCollectionParamList = {
  ChooseCollectionModal: undefined
  CreateCollection: undefined
}