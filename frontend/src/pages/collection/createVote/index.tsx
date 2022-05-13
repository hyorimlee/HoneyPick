import * as React from 'react'
import {memo, useCallback, useRef, useState, useEffect, useMemo} from 'react'
import {Text, View} from 'react-native'
import BaseTextInput from '../../../components/textInput/base/index'
import BaseButton from '../../../components/button/base/index'
import {useAppDispatch} from '../../../store/types'
import {editCollection} from '../../../store/slices/collection/asyncThunk'
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native'
import {useAppSelector} from '../../../store/types'
import {ProfileStackParamList} from '../../../../types/navigation'
import {ProfileNavigationProp} from '../../../containers/profileInfo/types'
import { createVote } from '../../../store/slices/vote/asyncThunk'

function CreateVote() {
  const navigation = useNavigation<ProfileNavigationProp>()
  const route = useRoute<RouteProp<ProfileStackParamList>>()
  const collection = useAppSelector(state => state.collection.currentCollection)
  const vote = useAppSelector(state => state.vote.currentVote)
  const dispatch = useAppDispatch()
  const [voteTitle, setVoteTitle] = useState<string>('')
  const [isPublic, setIsPublic] = useState<boolean>(true)
  const {userId} = useAppSelector(state => state.user)

  const voteTitleChanged = useCallback(
    (text: string) => {
      setVoteTitle(text)
    },
    [voteTitle],
  )

  const changeIsPublic = useCallback(() => {
    const prevState = isPublic
    setIsPublic(!prevState)
  }, [isPublic])

  const openVote = useCallback(() => {
    dispatch(
      createVote({
        collectionId: collection!._id,
        title: voteTitle,
        isPublic: isPublic
      }),
    )
      .unwrap()
      .then(res => {
        navigation.push('Collection', {
          accountId: collection.user._id,
          collectionId: collection._id,
        })
      })
  }, [voteTitle, isPublic])

  return (
    <View style={{paddingHorizontal: 20}}>
      <Text style={{fontWeight: 'bold'}}>
        시작될 투표의 제목을 적어주세요
      </Text>
      <BaseTextInput
        value={voteTitle}
        onChangeText={voteTitleChanged}
        placeholder={'어떤 주제로 투표하실 건가요?'}
        returnKeyType={'next'}
        maxLength={10}
      />
      <BaseButton
        text={isPublic? '비공개로 투표하기' : '공개 투표하기'}
        onPress={changeIsPublic}
        marginVertical={10}
        paddingVertical={10}
        borderRadius={5}
        disabled={!voteTitle}
      />
      <BaseButton
        text={'투표 시작하기'}
        onPress={openVote}
        marginVertical={10}
        paddingVertical={10}
        borderRadius={5}
        disabled={!voteTitle}
      />
    </View>
  )
}

export default memo(CreateVote)
