import * as React from 'react'
import {memo, useEffect, useState} from 'react'
import {useRoute} from '@react-navigation/native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import ProfileInfo from '../components/profileInfo'
import {getLists, getProfile} from '~/store/slices/profile/asyncThunk'
import {useAppDispatch, useAppSelector} from '~/store/types'
import {SafeAreaView} from 'react-native-safe-area-context'
import ProfileLists from '../components/profileLists'
import {ProfileDefaultNavigationProp, ProfileDefaultRoute} from './types'
import {Alert, BackHandler} from 'react-native'

function Profile({navigation}: {navigation: ProfileDefaultNavigationProp}) {
  const dispatch = useAppDispatch()
  const {isModal} = useAppSelector(state => state.ui)
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
    if (isModal === false) {
      navigation.addListener('state', getListsFunc)
      navigation.addListener('focus', getListsFunc)
      getListsFunc()

      return () => {
        navigation.removeListener('state', getListsFunc)
        navigation.removeListener('focus', getListsFunc)
      }
    }
  }, [navigation, userId, isModal])

  const getListsFunc = () => dispatch(getLists({accountId: userId}))

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        {isInfoDone ? <ProfileInfo></ProfileInfo> : null}
        <ProfileLists></ProfileLists>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default memo(Profile)
