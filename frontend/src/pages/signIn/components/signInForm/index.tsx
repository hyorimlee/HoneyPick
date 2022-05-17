import * as React from 'react'
import {memo, useCallback, useRef, useState} from 'react'
import {Alert, TextInput, View} from 'react-native'
import BaseTextInput from '~/components/textInput/base/index'
import BaseButton from '~/components/button/base/index'
import {
  noSpace,
  spaceAlert,
  usernameAlert,
  usernameValid,
} from '~/modules/valid'
import {useAppDispatch} from '~/store/types'
import {requestSignIn} from '~/store/slices/user/asyncThunk'

function SignInForm({paddingHorizontal}: {paddingHorizontal: number}) {
  const dispatch = useAppDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const passwordRef = useRef<TextInput | null>(null)

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

  const loginSubmit = useCallback(() => {
    dispatch(requestSignIn({username, password}))
      .unwrap()
      .catch(error => {
        Alert.alert(error.err)
      })
  }, [username, password])

  const focusPassword = () => {
    passwordRef.current?.focus()
  }

  const buttonDisabled = !(username && password)
  return (
    <View style={{paddingHorizontal}}>
      <BaseTextInput
        value={username}
        onChangeText={usernameChanged}
        onSubmitEditing={focusPassword}
        onKeyPress={usernameAlert}
        placeholder={'아이디'}
        importantForAutofill={'auto'} // Android
        autoComplete={'username'} // Android
        textContentType={'username'} // ios
        returnKeyType={'next'}
        maxLength={10}
      />
      <BaseTextInput
        ref={passwordRef}
        value={password}
        onChangeText={passwordChanged}
        onSubmitEditing={loginSubmit}
        onKeyPress={spaceAlert}
        placeholder={'비밀번호'}
        importantForAutofill={'yes'} // Android
        autoComplete={'password'}
        textContentType={'password'} // ios
        returnKeyType={'next'}
        secureTextEntry
        maxLength={30}
      />
      <BaseButton
        text={'로그인'}
        onPress={loginSubmit}
        marginVertical={10}
        paddingVertical={10}
        borderRadius={5}
        disabled={buttonDisabled}
      />
    </View>
  )
}

export default memo(SignInForm)
