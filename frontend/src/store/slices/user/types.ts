import {CollectionState} from './../collection/types'

export interface IAccessToken {
  refreshToken: string | null
}

export interface UserState {
  userId: string
  accessToken: string
  collections: CollectionState[],
}

export interface ISignInParameter {
  username: string
  password: string
}

export interface ISignUpParameter {
  username: string
  password: string
  nickname: string
  phone: string
}

export interface IPhoneVerifyParameter {
  phoneNumber: string
}

export interface IPhoneVerifyCheckParameter {
  phoneId: string
  verificationCode: string
}
