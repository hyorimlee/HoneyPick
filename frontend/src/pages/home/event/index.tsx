import * as React from 'react'
import {memo} from 'react'
import {SafeAreaView, Alert} from 'react-native'

import {Container, MainEvent, SubEvent, EventImage, SubEventImage, InfoContainer, InfoTop, TitleText, NormalText} from './styles'

// API 받아오면 삭제
const events = [
  {
    title: '제목1',
    nickname: '어드민',
    description: '짧은 설명(1~2줄)',
    longDescription: '긴 설명 설명이짱길겁니다 그러니까마음의준비를하시고 블라블라어쩌구저쩌구'
  },
  {
    title: '제목2',
    nickname: '어드민',
    description: '짧은 설명(1~2줄)',
    longDescription: '긴 설명 설명이짱길겁니다 그러니까마음의준비를하시고 블라블라어쩌구저쩌구'
  },
  {
    title: '제목3',
    nickname: '어드민',
    description: '짧은 설명(1~2줄)',
    longDescription: '긴 설명 설명이짱길겁니다 그러니까마음의준비를하시고 블라블라어쩌구저쩌구'
  },
]

function EventStack() {
  const onClick = (idx: number) => {
    Alert.alert(idx + ' 으로 이동')
  }
  
  const SubEvents = events.map((event, idx) => {
    if (idx > 0) {
      return (
        <SubEvent onPress={() => onClick(idx)}>
          <InfoTop>
            <SubEventImage
              source={require('../../../assets/images/sampleimage2.jpg')}
            ></SubEventImage>
            <InfoContainer>
              <NormalText style={{color: '#8C8C8C'}}>directed by {event.nickname}</NormalText>
              <TitleText style={{color: '#8C8C8C'}}>{event.title}</TitleText>
            </InfoContainer>
          </InfoTop>
          <NormalText style={{color: '#8C8C8C'}}>{event.description}</NormalText>
        </SubEvent>
      )
    }
  })
  
  return (
    <SafeAreaView>
      <Container>
        <MainEvent onPress={() => onClick(0)}>
          <InfoTop>
            <EventImage
              source={require('../../../assets/images/sampleimage2.jpg')}
            ></EventImage>
            <InfoContainer>
              <NormalText>directed by {events[0].nickname}</NormalText>
              <TitleText>{events[0].title}</TitleText>
              <NormalText>{events[0].description}</NormalText>
            </InfoContainer>
          </InfoTop>
          <NormalText>{events[0].longDescription}</NormalText>
        </MainEvent>
        {SubEvents}
      </Container>
    </SafeAreaView>
  )
}

export default memo(EventStack)