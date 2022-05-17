import * as React from 'react'
import {memo, useState, useEffect, useCallback, useRef} from 'react'
import {
  SafeAreaView,
  StatusBar,
  Linking,
  Pressable,
  Text,
  View,
} from 'react-native'
import Config from 'react-native-config'
import ActionSheet from 'react-native-actions-sheet'

import BaseButton from '~/components/button/base'
import {getItem, itemToCollection} from '~/store/slices/item/asyncThunk'
import {ItemRoute} from './types'
import {useAppSelector, useAppDispatch} from '~/store/types'

import {useIsFocused, useRoute} from '@react-navigation/native'
import {Container, ImageContainer, MenuContainer, DashedBorder} from './styles'
import ItemInfo from './components/itemInfo'
import {isDashOn, setSaveCollection} from '~/store/slices/item'
import RecommendBar from './components/recommendInfo/recommendBar'
import RecommendInfo from './components/recommendInfo'
import RecommendSettings from './components/recommendSettings'

function ItemStack() {
  const isFocused = useIsFocused()
  const dispatch = useAppDispatch()
  const dashOn = useAppSelector(isDashOn)
  const route = useRoute<ItemRoute>()
  const {itemId, collectionId} = route.params!
  const actionSheetRef = useRef<ActionSheet>(null)
  const {item, review} = useAppSelector(state => state.item)
  const {userId} = useAppSelector(state => state.user)
  const {currentCollection} = useAppSelector(state => state.collection)
  const [isRecommendMode, setIsRecommendMode] = useState(false)
  const isMyItem = userId === currentCollection!.user._id

  useEffect(() => {
    if (isFocused && !isRecommendMode) {
      dispatch(getItem(itemId))
    }
  }, [isFocused, isRecommendMode])

  const openSheet = () => {
    actionSheetRef.current?.show()
  }

  const deleteItem = () => {
    actionSheetRef.current?.hide()
    dispatch(
      itemToCollection({
        itemId,
        originalCollectionId: collectionId,
      }),
    )
  }

  const toggleIsRecommendMode = useCallback(() => {
    actionSheetRef.current?.hide()
    setIsRecommendMode(!isRecommendMode)
  }, [isRecommendMode])

  // 검증 로직 없으면 정상 작동, 검증 로직은 모든 링크가 유효하지 않다고 뜸
  const goToSite = useCallback(async () => {
    await Linking.openURL(item.url)
    // if (supported) {
    //   await Linking.openURL(item.url)
    // } else {
    //   Alert.alert(
    //     '죄송합니다. 잘못된 주소이거나 오류로 이동이 불가능합니다. 다시 시도해주세요.',
    //   )
    // }
  }, [item.url])

  const saveMyCollection = () => {
    dispatch(setSaveCollection('yet'))
  }

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
          {review ? (
            <BaseButton
              text={'추천 정보 수정하기'}
              onPress={toggleIsRecommendMode}
              borderRadius={25}
              marginVertical={5}
              paddingVertical={15}
            />
          ) : (
            <BaseButton
              text={'이 상품 추천하기'}
              onPress={toggleIsRecommendMode}
              borderRadius={25}
              marginVertical={5}
              paddingVertical={15}
            />
          )}
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
        <ItemInfo
          openSheet={openSheet}
          isRecommendMode={isRecommendMode}
          collectionId={collectionId}></ItemInfo>
        {dashOn ? <DashedBorder /> : null}
        {isRecommendMode ? (
          <RecommendSettings toggleIsRecommendMode={toggleIsRecommendMode} />
        ) : (
          <>
            <RecommendInfo />
            {isMyItem ? (
              <BaseButton
                text={'사이트로 이동하기'}
                onPress={goToSite}
                borderRadius={25}
                marginVertical={10}
                paddingVertical={15}
              />
            ) : (
              <View style={{flexDirection: 'row'}}>
                <BaseButton
                  text={'사이트로 이동하기'}
                  onPress={goToSite}
                  borderRadius={25}
                  marginVertical={10}
                  paddingVertical={15}
                />
                <BaseButton
                  text={'내 컬렉션에 담기'}
                  onPress={saveMyCollection}
                  borderRadius={25}
                  marginVertical={10}
                  paddingVertical={15}
                />
              </View>
            )}
          </>
        )}
      </Container>
    </SafeAreaView>
  )
}

export default memo(ItemStack)
