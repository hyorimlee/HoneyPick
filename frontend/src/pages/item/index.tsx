import * as React from 'react'
import {memo, createRef, useEffect} from 'react'
import {Alert, SafeAreaView, StatusBar, Text, TouchableOpacity} from 'react-native'
import {Container, ImageContainer, InfoContainer, TextContainer, MenuContainer, NormalText, BoldText, PriceText, DashedBorder} from './styles'
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'
import RecommendBar from '../../containers/recommendBar'
import BaseButton from '../../components/button/base'
import ActionSheet, {SheetManager} from "react-native-actions-sheet"

function Item() {
  const actionSheetRef = createRef<ActionSheet>()

  const openSheet = () => {
    actionSheetRef.current?.show()
  }

  // const closeSheet = () => {
  //   actionSheetRef.current?.show()
  // }

  const goToSite = () => {
    Alert.alert('사이트로 이동하기')
  }
  const deleteItem = () => {
    Alert.alert('컬렉션에서 삭제하기')
  }
  const setHoneyItem = () => {
    Alert.alert('상품 추천하기(꿀템)')
  }

  return (
    <SafeAreaView style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
      {/* bottom sheet menu */}
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{borderTopLeftRadius: 25, borderTopRightRadius: 25}}
      >
        <MenuContainer>
          <BaseButton
            text={'이 컬렉션에서 삭제하기'}
            onPress={deleteItem}
            borderRadius={25}
            marginVertical={5}
            paddingVertical={15}
          />
          <BaseButton
            text={'이 상품 추천하기'}
            onPress={setHoneyItem}
            borderRadius={25}
            marginVertical={5}
            paddingVertical={15}
          />
        </MenuContainer>
      </ActionSheet>
      <Container>
        <ImageContainer
          source={require('../../assets/images/sampleimage1.jpg')}
          imageStyle={{
            resizeMode: 'contain',
            borderRadius: 20,
          }}
        />
        <InfoContainer>
          <TextContainer>
            <NormalText>사이트명</NormalText>
            <BoldText>아이템 이름</BoldText>
            <PriceText>가격</PriceText>
            <NormalText>컬렉션 이름</NormalText>
          </TextContainer>
          <TouchableOpacity onPress={openSheet}>
            <FontAwesomeIcon
              icon={faEllipsisVertical as IconProp}
              color='#C4C4C4'
              size={24}
              style={{marginTop: 15}}
            />
          </TouchableOpacity>
        </InfoContainer>
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