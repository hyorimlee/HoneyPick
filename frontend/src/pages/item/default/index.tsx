import * as React from 'react'
import Config from 'react-native-config'
import {memo, createRef, useState, useEffect, useCallback} from 'react'
import {
  Alert,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Linking,
} from 'react-native'

import {STICKERS} from '../../../modules/stickers'
import RecommendBar from '../../../containers/recommendBar'
import BaseButton from '../../../components/button/base'
import {getItem, itemToCollection} from '../../../store/slices/item/asyncThunk'
import {ItemNavigationProp} from './types'
import {useAppSelector, useAppDispatch} from '../../../store/types'

import ActionSheet from "react-native-actions-sheet"
import {useNavigation, useIsFocused} from '@react-navigation/native'
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'
import {Container, ImageContainer, InfoContainer, TextContainer, MenuContainer, StickerContainer, RowTextContainer, NormalText, BoldText, PriceText, DashedBorder, EmojiText, PriceTextGray, Stamp} from './styles'

// itemId, collectionId}: {itemId: string, collectionId: string}
function Item() {
  const dispatch = useAppDispatch()
  const isFocused = useIsFocused()
  const navigation = useNavigation<ItemNavigationProp>()
  const actionSheetRef = createRef<ActionSheet>()
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [filteredStickers, setFilteredStickers] = useState<[string, number][]>([])
  const {itemId, collectionId, item, review} = useAppSelector(state => state.item)
  // const {item, review} = useAppSelector(state => state.item)

  const openSheet = () => {
    console.log('메뉴창 열려라')
    actionSheetRef.current?.show()
  }

  useEffect(() => {
    const filtered = item.stickers.filter(s => s[1])
    setFilteredStickers(filtered)
    console.log(filtered)
  }, [item.stickers])

  useEffect(() => {
    if (itemId && isFocused) {
      dispatch(getItem(itemId))
      console.log('아이템 정보 가져오기')
    }
  }, [itemId, isFocused])

  // 검증 로직 없으면 정상 작동, 검증 로직은 모든 링크가 유효하지 않다고 뜸
  const goToSite = useCallback(async () => {
    await Linking.openURL(item.url)
    // const supported = await Linking.canOpenURL(item.url)
    // if (supported) {
    //   await Linking.openURL(item.url)
    // } else {
    //   Alert.alert('유효하지 않은 주소입니다.')
    // }
  }, [item.url])

  const deleteItem = () => {
    Alert.alert('컬렉션에서 삭제하기')
    const data = {
      itemId,
      originalCollectionId: collectionId
    }
    dispatch(itemToCollection(data))
    // 컬렉션에서 삭제하면 프로필로 이동?
  }

  const setHoneyItem = () => {
    navigation.navigate('SetHoneyItem')
  }

  const itemSticker = STICKERS.map(sticker => {
    if (review?.stickers.includes(sticker.id)) {
      return (
        <EmojiText key={sticker.id}>{sticker.emoji}</EmojiText>
      )
    }
  })

  return (
    <SafeAreaView style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
      {/* bottom sheet menu */}
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{borderTopLeftRadius: 25, borderTopRightRadius: 25}}>
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
      {/* bottom sheet end */}
      <Container>
        <ImageContainer
          source={
            item.thumbnail
              ? {uri: `${Config.IMAGE_BASE_URL}/w510/${item.thumbnail}`}
              : require('../../../assets/images/sampleimage1.jpg')
          }
          imageStyle={{
            resizeMode: 'contain',
            borderRadius: 20,
          }}
        />
        <InfoContainer>
          <TextContainer>
            <NormalText>{item.brand}</NormalText>
            <BoldText>{item.title}</BoldText>
            {item.priceAfter !== 0 ?
              <RowTextContainer>
                <PriceText>￦</PriceText>
                <PriceText>{item.priceBefore}</PriceText>
              </RowTextContainer>
            : <RowTextContainer>
                <PriceText>￦</PriceText>
                <PriceTextGray>{item.priceBefore}</PriceTextGray>
                <PriceText>{item.priceAfter}</PriceText>
              </RowTextContainer>
            }
            <NormalText>컬렉션 이름</NormalText>
          </TextContainer>
          <TouchableOpacity onPress={openSheet}>
            <FontAwesomeIcon
              icon={faEllipsisVertical as IconProp}
              color="#C4C4C4"
              size={24}
              style={{marginTop: 15}}
            />
          </TouchableOpacity>
        </InfoContainer>
        {review || filteredStickers.length > 0 ? <DashedBorder /> : null}
        {review ?
          <TextContainer>
            <RowTextContainer>
              <NormalText>{}님이 이 아이템을 추천하는 이유</NormalText>
              <Stamp
                source={
                  review.isRecommend === 2 ?
                  require('../../../assets/images/honeystamp.png') :
                  require('../../../assets/images/goodstamp.png')
                }
                style={{resizeMode: 'contain'}}
              ></Stamp>
            </RowTextContainer>
            <StickerContainer>{itemSticker}</StickerContainer>
          </TextContainer>
        : null}
        {filteredStickers.length > 0 ?
          <TextContainer>
            <NormalText>다른 허니비들이 이 아이템을 추천하는 이유</NormalText>
            <RecommendBar stickers={filteredStickers}></RecommendBar>
          </TextContainer>
        : null}
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
