import * as React from 'react'
import {memo, useEffect, useCallback} from 'react'
import {Image, Pressable, Text, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'
import { VoteStackParamList } from '../types'
import ResultItems from '../components/resultItems'
import { useAppDispatch, useAppSelector } from '../../../store/types'
import { getCollection } from '../../../store/slices/collection/asyncThunk'
import { getVote } from '../../../store/slices/vote/asyncThunk'
import { Container, VoteResultInfoContainer, TitleContainer, TitleText, NormalText } from './styles'
import BaseButton from '../../../components/button/base'
import { deleteVote } from '../../../store/slices/vote/asyncThunk'
import { RootStackNavigationProp } from '~/../types/navigation'

function VoteResult() {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<RootStackNavigationProp>()
  const route = useRoute<RouteProp<VoteStackParamList>>()
  const {accountId, collectionId, voteId} = route.params!
  const {currentVote} = useAppSelector(state => state.vote)
  const {currentCollection} = useAppSelector(state => state.collection)
  const {userId} = useAppSelector(state => state.user)
  const isMyList = currentCollection?.user._id === userId

  useEffect(() => {
    dispatch(getCollection({accountId: accountId, collectionId: collectionId}))
    dispatch(getVote({accountId: accountId, voteId: voteId}))
  }, [])

  const deleteCurrentVote = useCallback(async () => {
    await dispatch(deleteVote({accountId: accountId, voteId: voteId}))
    navigation.navigate('Home')
  }, [])

  return (
    <KeyboardAwareScrollView>
      <Container>
        <VoteResultInfoContainer>
          <TitleContainer>
            <TitleText>{currentVote.title}</TitleText>
            <NormalText>의</NormalText>
          </TitleContainer>
          {isMyList ?
            <BaseButton
            text={'투표 삭제하기'}
            fontSize={14}
            onPress={deleteCurrentVote}
            borderRadius={25}
            paddingVertical={5}
            paddingHorizontal={10}
            /> : null
          }
        </VoteResultInfoContainer>
        <NormalText>결과를 확인하세요!</NormalText>
      </Container>
      <ResultItems accountId={accountId} collectionId={collectionId} voteId={voteId} result={currentVote.result}></ResultItems>
    </KeyboardAwareScrollView>
  )
}

export default memo(VoteResult)
