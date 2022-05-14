import * as React from 'react'
import {memo} from 'react'
import {SafeAreaView, Dimensions} from 'react-native'

import BaseButton from '../../../../components/button/base'
import CollectionInfo from '~/pages/collection/components/collectionInfo'

import {Container} from './styles'
import {MainEvent, InfoTop, EventImage, InfoContainer, NormalText, TitleText} from '../styles'

function Event() {
  const windowWidth = Dimensions.get('window').width

  return (
    <SafeAreaView style={{height: '100%'}}>
      <Container>
        <MainEvent>
          <InfoTop>
            <EventImage
              source={require('../../../../assets/images/sampleimage2.jpg')}
            ></EventImage>
            <InfoContainer>
              <NormalText>directed by</NormalText>
              <TitleText>어드민 유저 닉네임</TitleText>
              <NormalText>짧은 설명 (1~2줄)</NormalText>
            </InfoContainer>
          </InfoTop>
          <NormalText>설명이짱길거예요그러니까마음의준비를하시고 어쩌구저쩌구븢ㄹ라블라야호야호ㅏㄴ아러</NormalText>
        </MainEvent>
        {/* <CollectionInfo></CollectionInfo> */}
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

export default memo(Event)