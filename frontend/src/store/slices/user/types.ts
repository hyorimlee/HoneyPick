<<<<<<< HEAD
import {CollectionState} from './../collection/types'
=======
import {PayloadAction, SerializedError} from '@reduxjs/toolkit'
>>>>>>> 35469eae06b77d6259517a5b4a261a8890eff0a2

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
