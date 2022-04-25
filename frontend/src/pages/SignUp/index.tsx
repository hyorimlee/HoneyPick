import * as React from 'react'
import {memo, useCallback, useState, useRef} from 'react'
import {Alert, Pressable, Text, TextInput, View} from 'react-native'
import {SignUpScreenProps} from './types'
import {Container, CustomTextInput} from './styles'

function SignUp({navigation}: SignUpScreenProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const usernameRef = useRef<typeof CustomTextInput | null>(null)
  const passwordRef = useRef<TextInput | null>(null)
  const passwordConfirmRef = useRef<TextInput | null>(null)
  const phoneRef = useRef<TextInput | null>(null)
  const codeRef = useRef<TextInput | null>(null)

  const usernameChanged = useCallback(
    (text: string) => {
      setUsername(text)
    },
    [username],
  )

  const passwordChanged = useCallback(
    (text: string) => {
      setPassword(text)
    },
    [username],
  )

  const passwordConfirmChanged = useCallback(
    (text: string) => {
      setPasswordConfirm(text)
    },
    [username],
  )

  const phoneChanged = useCallback(
    (text: string) => {
      setPhone(text)
    },
    [username],
  )

  const codeChanged = useCallback(
    (text: string) => {
      setCode(text)
    },
    [username],
  )

  const navigateSignIn = useCallback(() => {
    navigation.navigate('SignIn')
  }, [])

  return (
    <Container>
      <Text>로고</Text>
      <View>
        <CustomTextInput
          ref={usernameRef}
          value={username}
          onChangeText={usernameChanged}
          placeholder={'아이디'}
          placeholderTextColor={'#C4C4C4'}
          importantForAutofill={'yes'} // Android
          autoComplete={'username'} // Android
          clearButtonMode={'while-editing'} // ios
          textContentType={'username'} // ios
          returnKeyType={'next'}
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <CustomTextInput
          ref={passwordRef}
          value={password}
          onChangeText={passwordChanged}
          placeholder={'비밀번호'}
          placeholderTextColor={'#C4C4C4'}
          importantForAutofill={'yes'} // Android
          autoComplete={'password'} // Android
          clearButtonMode={'while-editing'} // ios
          textContentType={'password'} // ios
          returnKeyType={'next'}
          blurOnSubmit={false}
          secureTextEntry
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
        />
        <CustomTextInput
          ref={passwordConfirmRef}
          value={passwordConfirm}
          onChangeText={passwordConfirmChanged}
          placeholder={'비밀번호 확인'}
          placeholderTextColor={'#C4C4C4'}
          importantForAutofill={'yes'} // Android
          autoComplete={'password'} // Android
          clearButtonMode={'while-editing'} // ios
          textContentType={'password'} // ios
          returnKeyType={'next'}
          blurOnSubmit={false}
          secureTextEntry
          onSubmitEditing={() => phoneRef.current?.focus()}
        />
        <View>
          <CustomTextInput
            ref={phoneRef}
            value={phone}
            onChangeText={phoneChanged}
            placeholder={'휴대전화번호'}
            placeholderTextColor={'#C4C4C4'}
            importantForAutofill={'yes'} // Android
            autoComplete={'tel'} // Android
            clearButtonMode={'while-editing'} // ios
            textContentType={'telephoneNumber'} // ios
            keyboardType={'number-pad'}
            returnKeyType={'send'}
            blurOnSubmit={false}
            onSubmitEditing={() => Alert.alert('코드전송')}
          />
        </View>
        <CustomTextInput
          ref={codeRef}
          value={code}
          onChangeText={codeChanged}
          placeholder={'인증번호'}
          placeholderTextColor={'#C4C4C4'}
          clearButtonMode={'while-editing'} // ios
          keyboardType={'number-pad'}
          returnKeyType={'send'}
          blurOnSubmit={false}
        />
      </View>
      <Pressable>
        <Text>회원가입 버튼</Text>
      </Pressable>
      <Pressable onPress={navigateSignIn}>
        <Text>로그인 하러가기</Text>
      </Pressable>
    </Container>
  )
}

export default memo(SignUp)
