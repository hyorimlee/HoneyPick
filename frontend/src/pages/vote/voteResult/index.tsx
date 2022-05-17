import * as React from 'react'
import {memo, useEffect, useCallback} from 'react'
import {Image, Pressable, Text, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import { useRoute, RouteProp } from '@react-navigation/native'
import { VoteStackParamList } from '../types'
import ResultItems from '../components/resultItems'
import { useAppDispatch, useAppSelector } from '../../../store/types'
import { getCollection } from '../../../store/slices/collection/asyncThunk'
import { getVote } from '../../../store/slices/vote/asyncThunk'

function VoteResult() {
  const dispatch = useAppDispatch()
  const route = useRoute<RouteProp<VoteStackParamList>>()
  const {accountId, collectionId, voteId} = route.params!
  const {currentVote} = useAppSelector(state => state.vote)
  const {currentCollection} = useAppSelector(state => state.collection)
  // const result = currentVote!.result.sort((a, b) => {return b.count - a.count})
  const result = [{_id: '1', count: '10'},{_id: '2', count: '9'},{_id: '3', count: '8'},{_id: '4', count: '8'},{_id: '5', count: '5'},
                  {_id: '6', count: '4'},{_id: '7', count: '3'},{_id: '8', count: '3'},{_id: '9', count: '1'},{_id: '10', count: '0'}]

  useEffect(() => {
    dispatch(getCollection({accountId: accountId, collectionId: collectionId}))
    dispatch(getVote({accountId: accountId, voteId: voteId}))
  }, [])

  return (
    <KeyboardAwareScrollView>
      <View><Text>투표결과</Text></View>
      <ResultItems accountId={accountId} collectionId={collectionId} voteId={voteId} result={result}></ResultItems>
    </KeyboardAwareScrollView>
  )
}

export default memo(VoteResult)
