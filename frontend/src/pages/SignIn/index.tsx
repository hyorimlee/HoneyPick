import * as React from 'react'
import {memo, useCallback, useState, useRef} from 'react'
import {Pressable, Text, TextInput, View} from 'react-native'
import {SignInScreenProps} from './types'
import {Container, CustomTextInput} from './styles'

function SignIn({navigation}: SignInScreenProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const usernameRef = useRef<TextInput | null>(null)
  const passwordRef = useRef<TextInput | null>(null)

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
    [password],
  )

  const loginSubmit = useCallback(() => {}, [])

  const navigateSignUp = useCallback(() => {
    navigation.navigate('SignUp')
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
          // autoCompleteType={'password'}
          autoComplete={'password'}
          clearButtonMode={'while-editing'} // ios
          textContentType={'password'} // ios
          returnKeyType={'next'}
          blurOnSubmit={false}
          secureTextEntry
          onSubmitEditing={loginSubmit}
        />
      </View>
      <View>
        <Pressable onPress={loginSubmit}>
          <Text>로그인 버튼</Text>
        </Pressable>
        <View>
          <Pressable>
            <Text>허니픽이 처음이신가요?</Text>
          </Pressable>
          <Pressable onPress={navigateSignUp}>
            <Text>회원가입</Text>
          </Pressable>
        </View>
      </View>
    </Container>
  )
}

export default memo(SignIn)
