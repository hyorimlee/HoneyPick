import * as React from 'react'
import {memo, useEffect} from 'react'
import {SafeAreaView, Dimensions} from 'react-native'
import {useRoute, RouteProp} from '@react-navigation/native'

import BaseButton from '../../../../components/button/base'
import {EventStackParamList} from '../types'
import {useAppDispatch, useAppSelector} from '~/store/types'
import {getEvent} from '~/store/slices/event/asyncThunk'

import {Container} from './styles'
import {MainEvent, InfoTop, EventImage, InfoContainer, NormalText, TitleText} from '../default/styles'

function EventItem() {
  const dispatch = useAppDispatch()
  const windowWidth = Dimensions.get('window').width
  const route = useRoute<RouteProp<EventStackParamList>>()
  const {eventId} = route.params!
  const event = useAppSelector(state => state.event.event)

  console.log('페이지 넘어옴')

  useEffect(() => {
    dispatch(getEvent(eventId))
  })
  
  return (
    <SafeAreaView style={{height: '100%'}}>
      <Container>
        {event ? (
          <MainEvent>
            <InfoTop>
              <EventImage
                source={require('../../../../assets/images/sampleimage2.jpg')}
              ></EventImage>
              <InfoContainer>
                <NormalText>directed by {event.user.nickname}</NormalText>
                <TitleText>{event.title}</TitleText>
                <NormalText>{event.description}</NormalText>
              </InfoContainer>
            </InfoTop>
            <NormalText>{event.additional}</NormalText>
          </MainEvent>
        ) : null}
      </Container>
      <BaseButton
        text={'투표하기'}
        onPress={() => console.log('얍')}
        borderRadius={25}
        marginVertical={10}
        marginHorizontal={30}
        paddingVertical={15}
        position="absolute"
        width={windowWidth-60}
        bottom={0}
      />
    </SafeAreaView>
  )
}

export default memo(EventItem)