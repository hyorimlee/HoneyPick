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
        <Pressable onPress={navigateSignIn}>
          <Text style={{color, fontSize: 10}}>로그인 하러가기</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default memo(SignUp)
