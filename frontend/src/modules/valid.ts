/* 입력 데이터 검증 관련된 변수 및 함수 */

import {
  Alert,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native'

/* 공백 관련 */
// 공백 입력이 있는 경우, 공백을 모두 제거해서 반환
export const noSpace = (text: string): string => {
  const covertText = text
  return covertText.replace(' ', '')
}

// 공백이 입력되는 경우 공백 입력 못하도록 알림창
export const spaceAlert = ({
  nativeEvent,
}: {
  nativeEvent: any | NativeSyntheticEvent<TextInputKeyPressEventData>
}) => {
  nativeEvent.key === ' ' ? Alert.alert('공백은 입력할 수 없습니다.') : null
}

/* username 관련 */
// username 가능한 문자 정규표현식
const usernameRegex = /[^a-z|A-Z|0-9|_]/g

// 특수문자 입력시 모두 제거해서 반환
export const usernameValid = (text: string): string => {
  const converted = text
  return converted.replace(usernameRegex, '')
}

// 특수문자 입력되는 경우 입력 못하도록 알림창
export const usernameAlert = ({
  nativeEvent,
}: {
  nativeEvent: any | NativeSyntheticEvent<TextInputKeyPressEventData>
}) => {
  usernameRegex.test(nativeEvent.key)
    ? Alert.alert('영문 및 숫자와 _ 입력만 가능합니다.')
    : null
}

/* nickname 관련 */
// nickname 가능한 문자 정규표현식
const nicknameRegex = /[^a-z|A-Z|0-9|ㄱ-ㅎ|가-힣]/g

// 특수문자 입력시 모두 제거해서 반환
export const nicknameValid = (text: string) => {
  return text.replace(nicknameRegex, '')
}

// 특수문자 입력되는 경우 입력 못하도록 알림창
export const nicknameAlert = ({
  nativeEvent,
}: {
  nativeEvent: any | NativeSyntheticEvent<TextInputKeyPressEventData>
}) => {
  nicknameRegex.test(nativeEvent.key)
    ? Alert.alert('한글 및 영문, 숫자만 입력 가능합니다.')
    : null
}

/* 비밀번호 관련 */
// 비밀번호와 비밀번호 확인이 일치하지 않는 경우
export const passwordCompare = (password1: string, password2: string) => {
  return password1 === password2 ? true : false
}

/* 휴대전화 번호 관련 */
export const phoneValid = (text: string): string => {
  const converted = text
  return converted
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
    .replace(/(\-{1,2})$/g, '')
}

export const onlyNumber = (text: string): string => {
  const converted = text
  return converted.replace(/\D/g, '')
}

export const onlyNumberAlert = ({
  nativeEvent,
}: {
  nativeEvent: any | NativeSyntheticEvent<TextInputKeyPressEventData>
}) => {
  ;/[^0-9]/g.test(nativeEvent.key) && nativeEvent.key !== 'Backspace'
    ? Alert.alert('숫자만 입력해주세요.')
    : null
}
