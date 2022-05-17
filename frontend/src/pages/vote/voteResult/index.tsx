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
import { Container, TitleContainer, TitleText, NormalText } from './styles'

function VoteResult() {
  const dispatch = useAppDispatch()
  const route = useRoute<RouteProp<VoteStackParamList>>()
  const {accountId, collectionId, voteId} = route.params!
  const {currentVote} = useAppSelector(state => state.vote)
  const {currentCollection} = useAppSelector(state => state.collection)

  useEffect(() => {
    dispatch(getCollection({accountId: accountId, collectionId: collectionId}))
    dispatch(getVote({accountId: accountId, voteId: voteId}))
  }, [])

  return (
    <KeyboardAwareScrollView>
      <Container>
        <TitleContainer>
          <TitleText>{currentVote.title}</TitleText>
          <NormalText>의</NormalText>
        </TitleContainer>
        <NormalText>결과를 확인하세요!</NormalText>
      </Container>
      <ResultItems accountId={accountId} collectionId={collectionId} voteId={voteId} result={currentVote.result}></ResultItems>
    </KeyboardAwareScrollView>
  )
}

export default memo(VoteResult)
