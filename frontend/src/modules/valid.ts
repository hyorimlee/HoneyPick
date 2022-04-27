import {
  Alert,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native'

export const noSpace = (text: string): string => {
  const covertText = text
  return covertText.replace(' ', '')
}

export const usernameValid = (text: string): string => {
  const converted = text
  return converted.replace(/[^a-z|A-Z|0-9|ㄱ-ㅎ|가-힣]/g, '')
}

export const passwordCompare = (password1: string, password2: string) => {
  return password1 === password2 ? true : false
}

export const spaceAlert = ({
  nativeEvent,
}: {
  nativeEvent: any | NativeSyntheticEvent<TextInputKeyPressEventData>
}) => {
  nativeEvent.key === ' ' ? Alert.alert('공백은 입력할 수 없습니다.') : null
}
