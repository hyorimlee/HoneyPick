import * as React from 'react'
import {memo, useState, useEffect, useCallback} from 'react'
import {Text, View, Dimensions} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import CollectionInfo from '../components/collectionInfo'
import CollectionItems from '../components/collectionItems'
import {useRoute, RouteProp} from '@react-navigation/native'
import { CollectionNavigationProp, CollectionStackParamList } from '../types'
import {getCollection} from '../../../store/slices/collection/asyncThunk'
import {useAppSelector, useAppDispatch} from '../../../store/types'
import {getVote, vote} from '../../../store/slices/vote/asyncThunk'
import {setCurrentVote} from '../../../store/slices/vote'
import BaseButton from '../../../components/button/base'
import { IVoteState } from '../../../store/slices/vote/types'

function Collection() {
  const dispatch = useAppDispatch()
  const route = useRoute<RouteProp<CollectionStackParamList>>()
  const windowWidth = Dimensions.get('window').width;
  const {accountId, collectionId} = route.params!
  const {userId} = useAppSelector(state => state.user)
  const {votes} = useAppSelector(state => state.profile)
  const {currentVote, selectedItems} = useAppSelector(state => state.vote)
  const collection = useAppSelector(state => state.collection.currentCollection)
  const matchedVote: IVoteState | undefined = votes.find((vote: IVoteState | undefined) => vote!.collectionId === collectionId)
  const isVoting = matchedVote?.isClosed === undefined ? false : !matchedVote.isClosed
  const isMyList = collection.user._id === userId
  const isVoted = matchedVote?.participants?.some((participant: {_id: string} | undefined) => participant?._id === userId)
  const [onVote, setOnVote] = useState<boolean>(false)

  useEffect(() => {
    dispatch(getCollection({accountId: accountId, collectionId: collectionId}))
    if (matchedVote) {
      dispatch(getVote({accountId: accountId, voteId: matchedVote._id}))
    } else {
      dispatch(setCurrentVote({}))
    }
  }, [])

  const startVote = useCallback(() => {
    const prevState = onVote
    if (!prevState) {
      setOnVote(!prevState)
    }
  }, [onVote])

  const submitVote = useCallback(() => {
    selectedItems.map(async (item) => {
      await dispatch(vote({accountId: accountId, voteId: currentVote?._id, itemId: item.item._id}))
    })

    dispatch(getVote({accountId: accountId, voteId: currentVote?._id}))

    const prevState = onVote
    if (prevState) {
      setOnVote(!prevState)
    }
  }, [accountId, currentVote, onVote])

  return (
    <>
    <KeyboardAwareScrollView style={{paddingHorizontal: 20, marginTop: 30}}>
      <CollectionInfo></CollectionInfo>
      <CollectionItems onVote={onVote}></CollectionItems>
    </KeyboardAwareScrollView>
    {isVoting && !isMyList && !isVoted ?
      <BaseButton
        text={onVote ? '투표 제출하기' : '투표 시작하기'}
        onPress={onVote ? submitVote : startVote}
        fontSize={8}
        marginVertical={10}
        paddingVertical={15}
        marginHorizontal={30}
        position='absolute'
        width={windowWidth - 60}
        bottom="0%"
      /> : null
    }
    </>
  )
}

export default memo(Collection)
