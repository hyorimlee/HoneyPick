/* 입력 데이터 검증 관련된 변수 및 함수 */

import {
  Alert,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native'

/* 공백 입력이 있는 경우, 공백을 모두 제거해서 반환 */
export const noSpace = (text: string): string => {
  const covertText = text
  return covertText.replace(' ', '')
}

export const spaceAlert = ({
  nativeEvent,
}: {
  nativeEvent: any | NativeSyntheticEvent<TextInputKeyPressEventData>
}) => {
  nativeEvent.key === ' ' ? Alert.alert('공백은 입력할 수 없습니다.') : null
}

const usernameRegex = /[^a-z|A-Z|0-9|ㄱ-ㅎ|가-힣|_|-]/g

export const usernameValid = (text: string): string => {
  const converted = text
  return converted.replace(usernameRegex, '')
}

export const specialCharacterAlert = ({
  nativeEvent,
}: {
  nativeEvent: any | NativeSyntheticEvent<TextInputKeyPressEventData>
}) => {
  usernameRegex.test(nativeEvent.key)
    ? Alert.alert('특수문자(-, _ 가능) 및 공백은 입력할 수 없습니다.')
    : null
}

export const passwordCompare = (password1: string, password2: string) => {
  return password1 === password2 ? true : false
}
