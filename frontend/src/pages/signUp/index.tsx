import * as React from 'react'
import {memo, useCallback} from 'react'
import {Image, Pressable, Text, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {SignUpScreenProps} from './types'
import SignUpForm from './components/signUpForm'

const paddingHorizontal = 30
const color = 'black'

function SignUp({navigation}: SignUpScreenProps) {
  const navigateSignIn = useCallback(() => {
    navigation.navigate('SignIn')
  }, [])

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <View style={{paddingHorizontal}}>
        <Image
          source={require('../../assets/images/textLogo.png')}
          style={{
            width: '100%',
            resizeMode: 'contain',
          }}
        />
      </View>
      <SignUpForm paddingHorizontal={paddingHorizontal} />
      <View style={{paddingHorizontal, alignItems: 'center'}}>
        <Text style={{color: 'grey', fontSize: 12, textAlign: 'center'}}>
          휴대전화번호는 중복 가입을 방지하기 위해 사용되며 저장되지 않습니다.
        </Text>
        <Pressable onPress={navigateSignIn}>
          <Text style={{color, fontSize: 14, marginTop: 20}}>
            로그인 하러가기
          </Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default memo(SignUp)
