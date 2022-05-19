import * as React from 'react'
import {memo, useEffect} from 'react'
import {SafeAreaView, Alert} from 'react-native'

import {useIsFocused} from '@react-navigation/native'
import {useAppSelector, useAppDispatch} from '~/store/types'
import {getEventList} from '~/store/slices/event/asyncThunk'
import {useNavigation} from '@react-navigation/native'
import {EventDefaultNavigationProp, EventItemNavigationProp} from './types'

import {
  Container,
  MainEvent,
  SubEvent,
  EventImage,
  SubEventImage,
  InfoContainer,
  InfoTop,
  TitleText,
  NormalText,
} from './styles'
import Config from 'react-native-config'

function EventList() {
  const isFocused = useIsFocused()
  const dispatch = useAppDispatch()
  const navigation = useNavigation<EventDefaultNavigationProp>()
  const events = useAppSelector(state => state.event.eventList)

  useEffect(() => {
    if (isFocused) {
      dispatch(getEventList())
    }
  }, [isFocused])

  const onClick = (eventId: string) => {
    navigation.navigate('EventItem', {eventId: eventId})
  }

  const SubEvents = events.map((event, idx) => {
    const thumbnail =
      event.items.length > 0
        ? event.items.slice(-1)[0].thumbnail
        : event.thumbnail
    if (idx > 0) {
      return (
        <SubEvent onPress={() => onClick(event._id)} key={idx}>
          <InfoTop>
            <SubEventImage
              source={{
                uri: `${Config.IMAGE_BASE_URL}/raw/${thumbnail}`,
              }}></SubEventImage>
            <InfoContainer>
              <NormalText style={{color: '#8C8C8C'}}>
                directed by {event.user.nickname}
              </NormalText>
              <TitleText style={{color: '#8C8C8C'}}>{event.title}</TitleText>
            </InfoContainer>
          </InfoTop>
          <NormalText style={{color: '#8C8C8C'}}>
            {event.description}
          </NormalText>
        </SubEvent>
      )
    }
  })

  return (
    <SafeAreaView>
      <Container>
        {events.length > 0 ? (
          <>
            <MainEvent onPress={() => onClick(events[0]._id)}>
              <InfoTop>
                <EventImage
                  source={{
                    uri: `${Config.IMAGE_BASE_URL}/raw/${
                      events[0].items.slice(-1)[0].thumbnail
                    }`,
                  }}></EventImage>
                <InfoContainer>
                  <NormalText>directed by {events[0].user.nickname}</NormalText>
                  <TitleText>{events[0].title}</TitleText>
                  <NormalText>{events[0].description}</NormalText>
                </InfoContainer>
              </InfoTop>
              <NormalText>{events[0].additional}</NormalText>
            </MainEvent>
            {SubEvents}
          </>
        ) : null}
      </Container>
    </SafeAreaView>
  )
}

export default memo(EventList)
