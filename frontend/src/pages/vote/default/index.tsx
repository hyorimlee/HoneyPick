import * as React from 'react'
import {memo, useState, useEffect, useCallback} from 'react'
import {Text, View, Dimensions, Alert} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import VoteInfo from '../components/voteInfo'
import VoteItems from '../components/voteItems'
import {useRoute, RouteProp} from '@react-navigation/native'
import { VoteStackParamList } from '../types'
import {getCollection} from '../../../store/slices/collection/asyncThunk'
import {useAppSelector, useAppDispatch} from '../../../store/types'
import {getVote, vote} from '../../../store/slices/vote/asyncThunk'
import {setCurrentVote, cleanSelectedItems} from '../../../store/slices/vote'
import BaseButton from '../../../components/button/base'
import { IVoteState } from '../../../store/slices/vote/types'

function Vote() {
  const dispatch = useAppDispatch()
  const route = useRoute<RouteProp<VoteStackParamList>>()
  const windowWidth = Dimensions.get('window').width;
  const {accountId, collectionId, voteId} = route.params!
  const {userId} = useAppSelector(state => state.user)
  const {currentVote, selectedItems} = useAppSelector(state => state.vote)
  const {currentCollection} = useAppSelector(state => state.collection)
  const isMyList = currentCollection?.user._id === userId
  const isVoted = currentVote?.participants?.some((participant: {_id: string} | undefined) => participant?._id === userId)
  const [onVote, setOnVote] = useState<boolean>(false)

  useEffect(() => {
    dispatch(getCollection({accountId: accountId, collectionId: collectionId}))
    dispatch(getVote({accountId: accountId, voteId: voteId}))
  }, [])

  const startVote = useCallback(() => {
    const prevState = onVote
    if (!prevState) {
      setOnVote(!prevState)
    }
    Alert.alert('아이템을 선택 후 투표를 제출해 주세요!')
  }, [onVote])

  const submitVote = useCallback(() => {
    if (selectedItems.length === 0) {
      Alert.alert('하나 이상의 아이템을 선택해 주세요!')
    } else {
      selectedItems.map(async (item) => {
        await dispatch(vote({accountId: accountId, voteId: currentVote?._id, itemId: item._id}))
      })

      dispatch(getVote({accountId: accountId, voteId: voteId}))
      dispatch(cleanSelectedItems())

      const prevState = onVote
      if (prevState) {
        setOnVote(!prevState)
      }
    }
  }, [accountId, currentVote, onVote, selectedItems])

  return (
    <>
    <KeyboardAwareScrollView style={{paddingHorizontal: 20, marginTop: 30}}>
      <VoteInfo accountId={accountId} collectionId={collectionId} voteId={voteId}></VoteInfo>
      <VoteItems onVote={onVote} accountId={accountId} collectionId={collectionId} voteId={voteId}></VoteItems>
    </KeyboardAwareScrollView>
    {!isMyList && !isVoted ?
      <BaseButton
        text={onVote ? '투표 제출하기' : '투표 시작하기'}
        onPress={onVote ? submitVote : startVote}
        borderRadius={25}
        marginVertical={10}
        marginHorizontal={30}
        paddingVertical={15}
        position='absolute'
        width={windowWidth - 60}
        bottom={0}
      /> : null
    }
    </>
  )
}

export default memo(Vote)
