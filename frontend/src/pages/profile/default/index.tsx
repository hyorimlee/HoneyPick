import * as React from 'react'
import {memo} from 'react'
import {Text, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import ProfileInfo from '../../../containers/profileInfo'

const paddingHorizontal = 30

function Profile() {
  return (
    <KeyboardAwareScrollView style={{paddingHorizontal}}>
      <ProfileInfo></ProfileInfo>
      <View>
        <Text>나의 컬렉션</Text>
      </View>
      <View>
        <Text>진행한 투표</Text>
      </View>
      <View>
        <Text>찜한 컬렉션</Text>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default memo(Profile)
