import * as React from 'react'
import {memo, useCallback, useRef, useState} from 'react'
import {Alert, TextInput, View} from 'react-native'
import BaseTextInput from '../../../components/textInput/base/index'
import BaseButton from '../../../components/button/base/index'
import {noSpace, spaceAlert, usernameValid} from '../../../modules/valid'

function SignInForm({paddingHorizontal}: {paddingHorizontal: number}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isPressing, setIsPressing] = useState(false)
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
    setIsPressing(false)
    Alert.alert('로그인')
  }, [])

  const pressIn = useCallback(() => {
    setIsPressing(true)
  }, [])

  const pressOut = useCallback(() => {
    setIsPressing(false)
  }, [])

  const focusPassword = () => {
    passwordRef.current?.focus()
  }

  return (
    <View style={{paddingHorizontal}}>
      <BaseTextInput
        value={username}
        onChangeText={usernameChanged}
        onSubmitEditing={focusPassword}
        onKeyPress={spaceAlert}
        placeholder={'아이디'}
        placeholderTextColor={'#C4C4C4'}
        importantForAutofill={'auto'} // Android
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
        onSubmitEditing={loginSubmit}
        onKeyPress={spaceAlert}
        placeholder={'비밀번호'}
        placeholderTextColor={'#C4C4C4'}
        importantForAutofill={'yes'} // Android
        autoComplete={'password'}
        textContentType={'password'} // ios
        returnKeyType={'next'}
        blurOnSubmit={false}
        secureTextEntry
        maxLength={30}
      />
      <BaseButton
        text={'로그인'}
        onPress={loginSubmit}
        onPressIn={pressIn}
        onPressOut={pressOut}
        marginVertical={10}
        paddingVertical={10}
        borderRadius={5}
        backgroundColor={
          !username || !password
            ? '#C4C4C4'
            : isPressing
            ? '#FFD669'
            : '#F9C12E'
        }
        disabled={username && password ? false : true}
      />
    </View>
  )
}

export default memo(SignInForm)
