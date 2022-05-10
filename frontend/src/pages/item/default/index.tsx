import * as React from 'react'
import Config from 'react-native-config'
import {memo, createRef, useState, useEffect, useCallback} from 'react'
import {Alert, SafeAreaView, StatusBar, TouchableOpacity, Modal, Linking} from 'react-native'

import RecommendBar from '../../../containers/recommendBar'
import BaseButton from '../../../components/button/base'
import {getItem} from '../../../store/slices/item/asyncThunk'
import {ItemNavigationProp} from './types'
import {useAppSelector, useAppDispatch} from '../../../store/types'

import ActionSheet from "react-native-actions-sheet"
import {useNavigation} from '@react-navigation/native'
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'
import {Container, ImageContainer, InfoContainer, TextContainer, MenuContainer, StickerContainer, NormalText, BoldText, PriceText, DashedBorder, EmojiText} from './styles'

// 중복 제거
const STICKERS = [
  {id: '1', label: '🎁 선물하기 좋아요', emoji: '🎁'},
  {id: '2', label: '🔨 튼튼해요', emoji: '🔨'},
  {id: '3', label: '💰 가격이 합리적이에요', emoji: '💰'},
  {id: '4', label: '😋 맛있어요', emoji: '😋'},
  {id: '5', label: '🧶 부드러워요', emoji: '🧶'},
  {id: '6', label: '🎨 디자인이 예뻐요', emoji: '🎨'},
]

function Item() {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<ItemNavigationProp>()
  const actionSheetRef = createRef<ActionSheet>()
  const [modalVisible, setModalVisible] = useState(false)
  const {itemId, collectionId, item, review} = useAppSelector(state => state.item)

  const openSheet = () => {
    actionSheetRef.current?.show()
  }

  useEffect(() => {
    console.log(itemId)
    dispatch(getItem(itemId))
    console.log('아이템 정보 가져오기')
  }, [])

  // 유효한 주소인데도 유효하지 않다고 뜸
  const goToSite = useCallback(async() => {
    console.log(item.url)
    const supported = await Linking.canOpenURL(item.url)
    if (supported) {
      await Linking.openURL(item.url)
    } else {
      Alert.alert('유효하지 않은 주소입니다.')
    }
  }, [item.url])

  const deleteItem = () => {
    Alert.alert('컬렉션에서 삭제하기')
  }

  const setHoneyItem = () => {
    navigation.navigate('SetHoneyItem')
  }

  const itemSticker = STICKERS.map(sticker => {
    if (review?.stickers.includes(sticker.id)) {
      return (
        <EmojiText>{sticker.emoji}</EmojiText>
      )
    }
  })

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
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
      </Modal>
      <Container>
        <ImageContainer
          source={item.thumbnail ? {uri: `${Config.IMAGE_BASE_URL}/w510/${item.thumbnail}`} : require('../../../assets/images/sampleimage1.jpg')}
          imageStyle={{
            resizeMode: 'contain',
            borderRadius: 20,
          }}
        />
        <InfoContainer>
          <TextContainer>
            <NormalText>{item.brand}</NormalText>
            <BoldText>{item.title}</BoldText>
            <PriceText>{item.priceBefore}</PriceText>
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
        {review ?
          <TextContainer>
            <NormalText>{}님이 이 아이템을 추천하는 이유</NormalText>
            <StickerContainer>
              {itemSticker}
            </StickerContainer>
          </TextContainer>
        : ''}
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
        {/* <BaseButton
          text={'아이템 가져오기 테스트'}
          onPress={() => getItemInfo(itemId)}
          borderRadius={25}
          marginVertical={10}
          paddingVertical={15}
        /> */}
      </Container>
    </SafeAreaView>
  )
}

export default memo(Item)
