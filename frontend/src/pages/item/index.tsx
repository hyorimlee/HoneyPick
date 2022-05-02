import * as React from 'react'
import {memo} from 'react'
import {Alert, SafeAreaView, StatusBar} from 'react-native'
import {Container, ImageContainer, MenuContainer, TextContainer, NormalText, BoldText, PriceText, DashedBorder} from './styles'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'
import RecommendBar from '../../containers/recommendBar'
import BaseButton from '../../components/button/base'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

function Item() {

  // 사이트로 이동하기
  const goToSite = () => {
    Alert.alert('임시~~~')
  }

  return (
    <SafeAreaView style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
      <Container>
        <ImageContainer
          source={require('../../assets/images/sampleimage1.jpg')}
          imageStyle={{
            resizeMode: 'contain',
            borderRadius: 20,
          }}
        />
        <MenuContainer>
          <TextContainer>
            <NormalText>사이트명</NormalText>
            <BoldText>아이템 이름</BoldText>
            <PriceText>가격</PriceText>
            <NormalText>컬렉션 이름</NormalText>
          </TextContainer>
          <FontAwesomeIcon icon={faEllipsisVertical as IconProp} color='#C4C4C4' size={24} style={{marginTop: 15}} />
        </MenuContainer>
        <DashedBorder />
        <TextContainer>
          <NormalText>다른 허니비들이 이 아이템을 추천하는 이유</NormalText>
          <RecommendBar></RecommendBar>
        </TextContainer>
        <BaseButton
          text={'사이트로 이동하기'}
          onPress={goToSite}
          borderRadius={25}
          marginVertical={10}
          paddingVertical={15}
        />
      </Container>
    </SafeAreaView>
  )
}

export default memo(Item)