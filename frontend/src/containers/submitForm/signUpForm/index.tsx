import * as React from 'react'
import {memo, useState, useCallback, useRef} from 'react'
import {Alert, Pressable, Text, TextInput, View} from 'react-native'
import BaseTextInput from '../../../components/textInput/base'
import BaseButton from '../../../components/button/base'
import PhoneForm from '../phoneForm/index'
import {
  noSpace,
  passwordCompare,
  spaceAlert,
  usernameValid,
} from '../../../modules/valid'

function SignUpForm({paddingHorizontal}: {paddingHorizontal: number}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [phone, setPhone] = useState('')
  const passwordRef = useRef<TextInput | null>(null)
  const passwordConfirmRef = useRef<TextInput | null>(null)
  const phoneRef = useRef<any>(null)

  const usernameChanged = useCallback(
    (text: string) => {
      setUsername(usernameValid(text))
    },
    [username],
  )

  const passwordChanged = useCallback(
    (text: string) => {
      setPassword(noSpace(text))
    },
    [username],
  )

  const passwordConfirmChanged = useCallback(
    (text: string) => {
      setPasswordConfirm(noSpace(text))
      passwordCompare(password, passwordConfirm)
    },
    [username],
  )

  const setValidPhone = useCallback((text: string) => {
    setPhone(text)
  }, [])

  const signUpSubmit = useCallback(() => {
    Alert.alert('회원가입 성공 하고 바로 로그인 시키기')
  }, [])

  return (
    <View style={{paddingHorizontal}}>
      <BaseTextInput
        value={username}
        onChangeText={usernameChanged}
        onSubmitEditing={() => passwordRef.current?.focus()}
        onKeyPress={spaceAlert}
        placeholder={'아이디'}
        placeholderTextColor={'#C4C4C4'}
        importantForAutofill={'yes'} // Android
        autoComplete={'username'} // Android
        textContentType={'username'} // ios
        returnKeyType={'next'}
        blurOnSubmit={false}
        maxLength={10}
      />
      <BaseTextInput
        ref={passwordRef}
        value={password}
        onChangeText={passwordChanged}
        onSubmitEditing={() => passwordConfirmRef.current?.focus()}
        onKeyPress={spaceAlert}
        placeholder={'비밀번호'}
        placeholderTextColor={'#C4C4C4'}
        importantForAutofill={'yes'} // Android
        autoComplete={'password'} // Android
        textContentType={'password'} // ios
        returnKeyType={'next'}
        blurOnSubmit={false}
        secureTextEntry
        maxLength={30}
      />
      <BaseTextInput
        ref={passwordConfirmRef}
        value={passwordConfirm}
        onChangeText={passwordConfirmChanged}
        onSubmitEditing={() => {}}
        onKeyPress={spaceAlert}
        placeholder={'비밀번호 확인'}
        placeholderTextColor={'#C4C4C4'}
        importantForAutofill={'yes'} // Android
        autoComplete={'password'} // Android
        textContentType={'password'} // ios
        returnKeyType={'next'}
        blurOnSubmit={false}
        secureTextEntry
      />
      {/* 패스워드 일치 여부 판별 추가 필요 */}
      <PhoneForm setValidPhone={setValidPhone} />
      <BaseButton
        text={'회원가입'}
        onPress={signUpSubmit}
        marginVertical={10}
        borderRadius={5}
      />
    </View>
  )
}

export default memo(SignUpForm)
