import * as React from 'react'
import {memo, useState, useEffect, useCallback, useRef} from 'react'
import {
  SafeAreaView,
  StatusBar,
  Linking,
  View,
  Dimensions,
  Alert,
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
import {isDashOn} from '~/store/slices/item'
import RecommendInfo from './components/recommendInfo'
import RecommendSettings from './components/recommendSettings'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '~/../types/navigation'
import uiSlice from '~/store/slices/ui'

function ItemStack({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList>
}) {
  const isFocused = useIsFocused()
  const dispatch = useAppDispatch()
  const dashOn = useAppSelector(isDashOn)
  const route = useRoute<ItemRoute>()
  const {itemId, collectionId} = route.params!
  const actionSheetRef = useRef<ActionSheet>(null)

  const {item, review} = useAppSelector(state => state.item)
  const {userId} = useAppSelector(state => state.user)
  const {currentCollection} = useAppSelector(state => state.collection)

  const isMyItem = userId === currentCollection!.user._id
  const [isRecommendMode, setIsRecommendMode] = useState(false)
  const {isModal} = useAppSelector(state => state.ui)
  const isValidItem = item.title || item.priceBefore

  useEffect(() => {
    if (isFocused && !isRecommendMode) {
      dispatch(getItem(itemId))
    }
  }, [isFocused, isRecommendMode])

  const openSheet = useCallback(() => {
    actionSheetRef.current?.show()
  }, [])

  const deleteItem = useCallback(() => {
    actionSheetRef.current?.hide()
    Alert.alert(
      '아이템이 컬렉션에서 삭제됩니다.\n정말 삭제하시겠습니까?',
      undefined,
      [
        {
          text: '확인',
          onPress: () => {
            dispatch(
              itemToCollection({
                itemId,
                originalCollectionId: collectionId,
              }),
            )
              .unwrap()
              .then(() => navigation.pop())
              .catch(error => {
                Alert.alert(
                  '삭제가 되지 않았습니다.\n잠시후 다시 시도해주세요.',
                )
              })
          },
        },
        {
          text: '취소',
        },
      ],
    )
  }, [collectionId])

  const toggleIsRecommendMode = useCallback(() => {
    actionSheetRef.current?.hide()
    setIsRecommendMode(!isRecommendMode)
  }, [isRecommendMode])

  // 검증 로직 없으면 정상 작동, 검증 로직은 모든 링크가 유효하지 않다고 뜸
  const goToSite = useCallback(async () => {
    await Linking.openURL(item.url)
  }, [item.url])

  const saveMyCollection = () => {
    dispatch(uiSlice.actions.setIsModal('clipboard'))
  }

  return (
    <SafeAreaView style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
      {isMyItem && collectionId !== '' ? (
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
      ) : null}

      <Container>
        <ImageContainer
          source={
            item.thumbnail && isValidItem
              ? {uri: `${Config.IMAGE_BASE_URL}/w510/${item.thumbnail}`}
              : require('../../assets/images/honeybee.png')
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
              <>
                {isValidItem ? (
                  <BaseButton
                    text={'사이트로 이동하기'}
                    onPress={goToSite}
                    borderRadius={25}
                    marginVertical={10}
                    paddingVertical={15}
                  />
                ) : null}
              </>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <>
                  {isValidItem ? (
                    <>
                      <BaseButton
                        flex={1}
                        text={'사이트로 이동하기'}
                        onPress={goToSite}
                        borderRadius={25}
                        marginVertical={10}
                        paddingVertical={15}
                      />
                      <BaseButton
                        flex={1}
                        text={'내 컬렉션에 담기'}
                        onPress={saveMyCollection}
                        borderRadius={25}
                        marginVertical={10}
                        paddingVertical={15}
                        marginLeft={10}
                      />
                    </>
                  ) : null}
                </>
              </View>
            )}
          </>
        )}
      </Container>
    </SafeAreaView>
  )
}

export default memo(ItemStack)
