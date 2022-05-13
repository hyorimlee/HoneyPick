import * as React from 'react'
import {memo, useEffect, useState} from 'react'
import {RouteProp, useRoute} from '@react-navigation/native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import ProfileInfo from '../components/profileInfo'
import {getLists, getProfile} from '../../../../store/slices/profile/asyncThunk'
import {useAppDispatch, useAppSelector} from '../../../../store/types'
import {SafeAreaView} from 'react-native-safe-area-context'
import ProfileLists from '../components/profileLists'
import ProfileInfo from '../components/profileInfo'
import {Container} from './styles'

const paddingHorizontal = 30

function Profile() {
  const dispatch = useAppDispatch()
  const myUserId = useAppSelector(state => state.user.userId)
  const [isInfoDone, setIsInfoDone] = useState(false)
  // const route = useRoute<RouteProp<ProfileStackParamList>>()
  // const userId = route.params!.userId

  // useEffect(() => {
  //   dispatch(getProfile({userId}))
  //     .unwrap()
  //     .then(() => setIsInfoDone(true))

  //   return () => {}
  // }, [route])

  // useEffect(() => {
  //   const screenFocus = navigation.addListener('focus', () => {
  //     dispatch(getLists({accountId: userId}))
  //   })

  //   return screenFocus
  // }, [navigation])

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
