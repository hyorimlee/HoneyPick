import * as React from 'react'
import {memo, useEffect, useState} from 'react'
import {RouteProp, useRoute} from '@react-navigation/native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {
  ProfileNavigationProp,
  ProfileStackParamList,
} from '../../../../types/navigation'
import ProfileInfo from '../../../containers/profileInfo'
import {getLists, getProfile} from '../../../store/slices/profile/asyncThunk'
import {useAppDispatch, useAppSelector} from '../../../store/types'
import {SafeAreaView} from 'react-native-safe-area-context'
import ProfileLists from '../../../containers/profileLists'

const paddingHorizontal = 30

function Profile({navigation}: {navigation: ProfileNavigationProp}) {
  const dispatch = useAppDispatch()
  const myUserId = useAppSelector(state => state.user.userId)
  const [isInfoDone, setIsInfoDone] = useState(false)
  const route = useRoute<RouteProp<ProfileStackParamList>>()
  const userId = route.params!.userId

  useEffect(() => {
    dispatch(getProfile({userId}))
      .unwrap()
      .then(() => setIsInfoDone(true))

    return () => {}
  }, [route])

  useEffect(() => {
    const screenFocus = navigation.addListener('focus', () => {
      dispatch(getLists({accountId: userId}))
    })

    return screenFocus
  }, [navigation])

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView style={{paddingHorizontal}}>
        {isInfoDone ? <ProfileInfo></ProfileInfo> : null}
        <ProfileLists></ProfileLists>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default memo(Profile)
