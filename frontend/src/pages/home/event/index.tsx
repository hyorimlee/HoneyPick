import * as React from 'react'
import {memo} from 'react'
import {SafeAreaView, View, Text} from 'react-native'

import {Container, MainEvent, SubEvent, EventImage, InfoContainer, InfoTop, TitleText, NormalText} from './styles'

function EventStack() {
  return (
    <SafeAreaView>
      <Container>
        <MainEvent>
          <InfoTop>
            <EventImage
              source={require('../../../assets/images/sampleimage2.jpg')}
            ></EventImage>
            <InfoContainer>
              <NormalText>directed by</NormalText>
              <TitleText>어드민 유저 닉네임</TitleText>
              <NormalText>짧은 설명 (1~2줄)</NormalText>
            </InfoContainer>
          </InfoTop>
          <NormalText>설명이짱길거예요그러니까마음의준비를하시고 어쩌구저쩌구븢ㄹ라블라야호야호ㅏㄴ아러</NormalText>
        </MainEvent>
        <SubEvent>
          <InfoTop>
            <EventImage
              source={require('../../../assets/images/sampleimage2.jpg')}
            ></EventImage>
            <InfoContainer>
              <NormalText>directed by</NormalText>
              <TitleText>어드민 유저 닉네임</TitleText>
            </InfoContainer>
          </InfoTop>
          <NormalText>끝난 이벤트는 짧은 설명</NormalText>
        </SubEvent>
        <SubEvent>
          <InfoTop>
            <EventImage
              source={require('../../../assets/images/sampleimage2.jpg')}
            ></EventImage>
            <InfoContainer>
              <NormalText>directed by</NormalText>
              <TitleText>어드민 유저 닉네임</TitleText>
            </InfoContainer>
          </InfoTop>
          <NormalText>끝난 이벤트는 짧은 설명</NormalText>
        </SubEvent>
      </Container>
    </SafeAreaView>
  )
}

export default memo(EventStack)