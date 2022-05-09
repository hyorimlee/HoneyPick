import * as React from 'react'
import {memo, useEffect} from 'react'
import {RouteProp, useRoute} from '@react-navigation/native'
import {Text, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {ProfileStackParamList} from '../../../../types/navigation'
import ProfileInfo from '../../../containers/profileInfo'
import {getProfile} from '../../../store/slices/profile/asyncThunk'
import {useAppDispatch} from '../../../store/types'
import {getUserCollectionList} from '../../../store/slices/user/asyncThunk'

const paddingHorizontal = 30

function Profile() {
  const dispatch = useAppDispatch()
  const route = useRoute<RouteProp<ProfileStackParamList>>()
  const userId = route.params!.userId

  useEffect(() => {
    dispatch(getProfile({userId}))
    dispatch(getUserCollectionList())
  })

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
