import * as React from 'react'
import {memo, useState, useCallback, useRef} from 'react'
import {Alert, Text, TextInput, View} from 'react-native'
import BaseTextInput from '~/components/textInput/base'
import BaseButton from '~/components/button/base'
import PhoneForm from '~/containers/submitForm/phoneForm/index'
import {
  nicknameValid,
  noSpace,
  passwordCompare,
  spaceAlert,
  usernameAlert,
  nicknameAlert,
  usernameValid,
} from '~/modules/valid'
import {useAppDispatch} from '~/store/types'
import {requestSignUp} from '~/store/slices/user/asyncThunk'

function SignUpForm({paddingHorizontal}: {paddingHorizontal: number}) {
  const dispatch = useAppDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [nickname, setNickname] = useState('')
  const [passwordIsSame, setPasswordIsSame] = useState(false)
  const [phone, setPhone] = useState('')

  const passwordRef = useRef<TextInput | null>(null)
  const passwordConfirmRef = useRef<TextInput | null>(null)
  const nicknameRef = useRef<TextInput | null>(null)

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
    [password],
  )

  const passwordConfirmChanged = useCallback(
    (text: string) => {
      setPasswordConfirm(noSpace(text))
      setPasswordIsSame(passwordCompare(password, text))
    },
    [password],
  )

  const nicknameChanged = useCallback(
    (text: string) => {
      setNickname(nicknameValid(text))
    },
    [nickname],
  )

  const setValidPhone = useCallback((text: string) => {
    setPhone(text)
  }, [])

  const signUpSubmit = useCallback(() => {
    dispatch(requestSignUp({username, password, nickname, phone}))
      .unwrap()
      .catch(error => {
        Alert.alert(error.err)
      })
  }, [username, password, passwordConfirm, phone, nickname])

  const buttonDisabled = !(username && password === passwordConfirm && phone)
  const passwordConfirmError = !passwordIsSame && passwordConfirm.length > 0
  return (
    <View style={{paddingHorizontal}}>
      <BaseTextInput
        value={username}
        onChangeText={usernameChanged}
        onSubmitEditing={() => passwordRef.current?.focus()}
        onKeyPress={usernameAlert}
        placeholder={'아이디'}
        importantForAutofill={'yes'} // Android
        autoComplete={'username'} // Android
        textContentType={'username'} // ios
        returnKeyType={'next'}
        maxLength={10}
      />
      <BaseTextInput
        ref={passwordRef}
        value={password}
        onChangeText={passwordChanged}
        onSubmitEditing={() => passwordConfirmRef.current?.focus()}
        onKeyPress={spaceAlert}
        placeholder={'비밀번호'}
        importantForAutofill={'yes'} // Android
        autoComplete={'password'} // Android
        textContentType={'password'} // ios
        returnKeyType={'next'}
        secureTextEntry
        maxLength={30}
      />
      <BaseTextInput
        ref={passwordConfirmRef}
        value={passwordConfirm}
        onChangeText={passwordConfirmChanged}
        onSubmitEditing={() => nicknameRef.current?.focus()}
        onKeyPress={spaceAlert}
        placeholder={'비밀번호 확인'}
        importantForAutofill={'yes'} // Android
        autoComplete={'password'} // Android
        textContentType={'password'} // ios
        returnKeyType={'next'}
        secureTextEntry
        borderBottomColor={passwordConfirmError ? 'red' : '#FFD669'}
      />
      {passwordConfirmError ? (
        <Text style={{color: 'black', fontSize: 10}}>
          비밀번호가 일치하지 않습니다.
        </Text>
      ) : null}
      <BaseTextInput
        ref={nicknameRef}
        value={nickname}
        onChangeText={nicknameChanged}
        onKeyPress={nicknameAlert}
        placeholder={'별명'}
        returnKeyType={'next'}
        maxLength={10}
      />
      <PhoneForm setValidPhone={setValidPhone} />
      <BaseButton
        text={'회원가입'}
        onPress={signUpSubmit}
        marginVertical={10}
        paddingVertical={10}
        borderRadius={5}
        disabled={buttonDisabled}
      />
    </View>
  )
}

export default memo(SignUpForm)
