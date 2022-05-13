import * as React from 'react'
import {memo, useCallback} from 'react'
import {Image, Pressable, Text, View} from 'react-native'
import {SignInScreenProps} from './types'
import {NavigateContainer} from './styles'
import SignInForm from './components/signInForm'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

const paddingHorizontal = 30
const color = 'black'

function SignIn({navigation}: SignInScreenProps) {
  const navigateSignUp = useCallback(() => {
    navigation.navigate('SignUp')
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
      <SignInForm paddingHorizontal={paddingHorizontal} />
      <NavigateContainer paddingHorizontal={paddingHorizontal}>
        <Pressable>
          {/* 처음 방문한 유저 관련된 로직 추가 필요 */}
          <Text style={{color}}>허니픽이 처음이신가요?</Text>
        </Pressable>
        <Pressable onPress={navigateSignUp}>
          <Text style={{color}}>회원가입</Text>
        </Pressable>
      </NavigateContainer>
    </KeyboardAwareScrollView>
  )
}

export default memo(SignIn)
