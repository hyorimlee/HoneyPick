import * as React from 'react'
import {memo, useEffect, useState, useCallback} from 'react'
import {SafeAreaView, Dimensions, Text} from 'react-native'
import {useRoute, RouteProp} from '@react-navigation/native'

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

function EventItem() {
  const dispatch = useAppDispatch()
  const windowWidth = Dimensions.get('window').width
  const route = useRoute<RouteProp<EventStackParamList>>()
  const {eventId} = route.params!
  const event = useAppSelector(state => state.event.event)
  const [onVote, setOnVote] = useState<boolean>(false)
  const {selectedItems} = useAppSelector(state => state.vote)

  useEffect(() => {
    dispatch(getEvent(eventId))
  }, [])

  const startVote = useCallback(() => {
    const prevState = onVote
    if (!prevState) {
      setOnVote(!prevState)
    }
  }, [onVote])

  const submitVote = useCallback(() => {
    selectedItems.map(async (item) => {
      await dispatch(vote({accountId: '', voteId: event.vote._id, itemId: item._id}))
    })

    dispatch(getEvent(eventId))
    dispatch(cleanSelectedItems())

    const prevState = onVote
    if (prevState) {
      setOnVote(!prevState)
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
                    source={require('~/assets/images/sampleimage2.jpg')}></EventImage>
                  <InfoContainer>
                    <NormalText>directed by {event.user.nickname}</NormalText>
                    <TitleText>{event.title}</TitleText>
                    <NormalText>{event.description}</NormalText>
                  </InfoContainer>
                </InfoTop>
                <NormalText>{event.additional}</NormalText>
              </MainEvent>
            </EventInfoContainer>
            {event.vote.isClosed ? <ResultItems
              result={event.vote.result}
            ></ResultItems> : <VoteItemsContainer><VoteItems
              onVote={onVote}
              eventId={event._id}
              voteId={event.vote._id}
            ></VoteItems></VoteItemsContainer>
            }
          </>
        ) : null}
      </Container>
      {event.vote.isClosed ? null : <BaseButton
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
      }
    </SafeAreaView>
  )
}

export default memo(EventItem)
