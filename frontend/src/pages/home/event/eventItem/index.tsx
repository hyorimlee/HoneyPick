import * as React from 'react'
import {memo, useEffect, useState, useCallback} from 'react'
import {SafeAreaView, Dimensions, Text, Alert} from 'react-native'
import {useRoute, RouteProp, useIsFocused} from '@react-navigation/native'

import BaseButton from '../../../../components/button/base'
import {EventStackParamList} from '../types'
import {useAppDispatch, useAppSelector} from '~/store/types'
import {getEvent} from '~/store/slices/event/asyncThunk'
import VoteItems from '../../../vote/components/voteItems'
import ResultItems from '~/pages/vote/components/resultItems'
import {vote} from '~/store/slices/vote/asyncThunk'
import {cleanSelectedItems} from '~/store/slices/vote'
import {Container, EventInfoContainer, VoteItemsContainer} from './styles'
import {
  MainEvent,
  InfoTop,
  EventImage,
  InfoContainer,
  NormalText,
  TitleText,
} from '../default/styles'
import Config from 'react-native-config'
import collectionSlice from '~/store/slices/collection'

function EventItem() {
  const dispatch = useAppDispatch()
  const windowWidth = Dimensions.get('window').width
  const route = useRoute<RouteProp<EventStackParamList>>()
  const {eventId} = route.params!
  const {userId} = useAppSelector(state => state.user)
  const event = useAppSelector(state => state.event.event)
  const [onVote, setOnVote] = useState<boolean>(false)
  const {selectedItems} = useAppSelector(state => state.vote)
  const isVoted = event.vote.participants.some(
    (participant: {_id: string} | undefined) => participant?._id === userId,
  )
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      dispatch(collectionSlice.actions.collectionUserReset())
    }
  }, [isFocused])

  useEffect(() => {
    dispatch(getEvent(eventId))
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
      selectedItems.map(async item => {
        await dispatch(
          vote({accountId: '', voteId: event.vote._id, itemId: item._id}),
        )
      })

      dispatch(getEvent(eventId))
      dispatch(cleanSelectedItems())

      const prevState = onVote
      if (prevState) {
        setOnVote(!prevState)
      }
    }
  }, [event, onVote, selectedItems])

  return (
    <SafeAreaView style={{height: '100%'}}>
      <Container>
        {event ? (
          <>
            <EventInfoContainer>
              <MainEvent>
                <InfoTop>
                  <EventImage
                    source={{
                      uri: `${Config.IMAGE_BASE_URL}/w128/${event.thumbnail}`,
                    }}></EventImage>
                  <InfoContainer>
                    <TitleText>{event.title}</TitleText>
                    <NormalText>{event.description}</NormalText>
                    <NormalText>directed by {event.user.nickname}</NormalText>
                  </InfoContainer>
                </InfoTop>
                <NormalText>{event.additional}</NormalText>
              </MainEvent>
            </EventInfoContainer>
            {event.vote.isClosed ? (
              <ResultItems result={event.vote.result}></ResultItems>
            ) : (
              <VoteItemsContainer>
                <VoteItems
                  onVote={onVote}
                  eventId={event._id}
                  voteId={event.vote._id}></VoteItems>
              </VoteItemsContainer>
            )}
          </>
        ) : null}
      </Container>
      {!event.vote.isClosed && !isVoted ? (
        <BaseButton
          text={onVote ? '투표 제출하기' : '투표 시작하기'}
          onPress={onVote ? submitVote : startVote}
          borderRadius={25}
          marginVertical={10}
          marginHorizontal={30}
          paddingVertical={15}
          position="absolute"
          width={windowWidth - 60}
          bottom={0}
        />
      ) : null}
    </SafeAreaView>
  )
}

export default memo(EventItem)
