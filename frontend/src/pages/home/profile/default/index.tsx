import * as React from 'react'
import {memo, useEffect, useState} from 'react'
import {useRoute} from '@react-navigation/native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import ProfileInfo from '../components/profileInfo'
import {getLists, getProfile} from '~/store/slices/profile/asyncThunk'
import {useAppDispatch, useAppSelector} from '~/store/types'
import {SafeAreaView} from 'react-native-safe-area-context'
import ProfileLists from '../components/profileLists'
import {Container} from './styles'
import {ProfileDefaultNavigationProp, ProfileDefaultRoute} from './types'

function Profile({navigation}: {navigation: ProfileDefaultNavigationProp}) {
  const dispatch = useAppDispatch()
  const myUserId = useAppSelector(state => state.user.userId)
  const [isInfoDone, setIsInfoDone] = useState(false)
  const route = useRoute<ProfileDefaultRoute>()
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
  }, [navigation, userId])

  return (
    <SafeAreaView>
      <Container>
        <KeyboardAwareScrollView>
          {isInfoDone ? <ProfileInfo></ProfileInfo> : null}
          <ProfileLists></ProfileLists>
        </KeyboardAwareScrollView>
      </Container>
    </SafeAreaView>
  )
}

export default memo(Profile)
