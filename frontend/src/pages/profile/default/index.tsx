import * as React from 'react'
import {memo, useEffect, useState} from 'react'
import {RouteProp, useRoute} from '@react-navigation/native'
import {Text, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {ProfileStackParamList} from '../../../../types/navigation'
import ProfileInfo from '../../../containers/profileInfo'
import {getLists, getProfile} from '../../../store/slices/profile/asyncThunk'
import {useAppDispatch, useAppSelector} from '../../../store/types'
import HorizontalList from '../../../components/flatList/horizontalList'

const paddingHorizontal = 30

function Profile() {
  const dispatch = useAppDispatch()
  const [isInfoDone, setIsInfoDone] = useState(false)
  const route = useRoute<RouteProp<ProfileStackParamList>>()
  const userId = route.params!.userId

  useEffect(() => {
    dispatch(getProfile({userId}))
      .unwrap()
      .then(() => setIsInfoDone(true))
    dispatch(getLists({accountId: userId}))

    return () => {}
  })

  return (
    <KeyboardAwareScrollView style={{paddingHorizontal}}>
      {isInfoDone ? <ProfileInfo></ProfileInfo> : null}
      <View>
        <Text>나의 컬렉션</Text>
        <HorizontalList data={[{id: 1}, {id: 2}]}></HorizontalList>
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
