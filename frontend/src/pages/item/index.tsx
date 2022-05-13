import * as React from 'react'
import {memo, useState, useEffect, useRef, useCallback} from 'react'
import {SafeAreaView, StatusBar, Linking} from 'react-native'
import Config from 'react-native-config'
import ActionSheet from 'react-native-actions-sheet'

import BaseButton from '~/components/button/base'
import {getItem, itemToCollection} from '~/store/slices/item/asyncThunk'
import {ItemRoute} from './types'
import {useAppSelector, useAppDispatch} from '~/store/types'

import {useIsFocused, useRoute} from '@react-navigation/native'
import {Container, ImageContainer, MenuContainer, DashedBorder} from './styles'
import ItemInfo from './components/itemInfo'
import {isDashOn} from '~/store/slices/item'
import RecommendBar from './components/recommendInfo/recommendBar'
import RecommendInfo from './components/recommendInfo'
import RecommendSettings from './components/recommendSettings'

function ItemStack() {
  const isFocused = useIsFocused()
  const dispatch = useAppDispatch()
  const {item} = useAppSelector(state => state.item)
  const dashOn = useAppSelector(isDashOn)
  const [isSet, setIsSet] = useState(false)
  const actionSheetRef = useRef<ActionSheet | null>(null)
  const route = useRoute<ItemRoute>()
  const {itemId, collectionId} = route.params!

  useEffect(() => {
    if (isFocused) {
      dispatch(getItem(itemId))
    }
  }, [isFocused])

  const openSheet = () => {
    actionSheetRef.current?.show()
  }

  const deleteItem = () => {
    dispatch(
      itemToCollection({
        itemId,
        originalCollectionId: collectionId,
      }),
    )
  }

  const toggleIsSet = () => {
    actionSheetRef.current?.hide()
    // setIsSet(!isSet)
  }

  // 검증 로직 없으면 정상 작동, 검증 로직은 모든 링크가 유효하지 않다고 뜸
  const goToSite = useCallback(async () => {
    await Linking.canOpenURL(item.url)
    // if (supported) {
    //   await Linking.openURL(item.url)
    // } else {
    //   Alert.alert(
    //     '죄송합니다. 잘못된 주소이거나 오류로 이동이 불가능합니다. 다시 시도해주세요.',
    //   )
    // }
  }, [item.url])

  return (
    <SafeAreaView style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
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
            onPress={toggleIsSet}
            borderRadius={25}
            marginVertical={5}
            paddingVertical={15}
          />
        </MenuContainer>
      </ActionSheet>

      <Container>
        <ImageContainer
          source={
            item.thumbnail
              ? {uri: `${Config.IMAGE_BASE_URL}/w510/${item.thumbnail}`}
              : require('~/assets/images/sampleimage1.jpg')
          }
          imageStyle={{
            resizeMode: 'contain',
            borderRadius: 20,
          }}
        />
        <ItemInfo openSheet={openSheet}></ItemInfo>
        {dashOn ? <DashedBorder /> : null}
        {/* {isSet ? (
          <RecommendSettings toggleIsSet={toggleIsSet} />
        ) : // <RecommendInfo />
        null} */}
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

export default memo(ItemStack)
