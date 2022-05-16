import * as React from 'react'
import {memo, useCallback} from 'react'
import {Image, Pressable, Text, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

function VoteResult() {

  return (
    <KeyboardAwareScrollView>
      <View><Text>투표결과</Text></View>
    </KeyboardAwareScrollView>
  )
}

export default memo(VoteResult)
