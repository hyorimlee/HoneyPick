import * as React from 'react'
import Config from 'react-native-config'
import {memo, useCallback, useEffect} from 'react'
import {
  SafeAreaView,
  StatusBar,
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  Pressable,
  Text,
} from 'react-native'

import {
  getItemRecommend,
  getCollectionRecommend,
} from '~/store/slices/recommend/asyncThunk'
import {useAppSelector, useAppDispatch} from '~/store/types'

import {
  Container,
  CollectionContainer,
  ItemContainer,
  NormalText,
  BoldText,
  InfoContainer,
  CollectionImageContainer,
  ImageContainer,
  ItemBox,
} from './styles'

import {useIsFocused, useNavigation} from '@react-navigation/native'
import {RootStackNavigationProp} from '~/../types/navigation'
import {STICKERS} from '~/modules/stickers'
import {
  moneyComma,
  recommendCollectionKey,
  stringSlice,
} from '~/modules/convert'
import collectionSlice from '~/store/slices/collection'

const {width} = Dimensions.get('window')

function RecommendStack() {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<RootStackNavigationProp>()
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      dispatch(collectionSlice.actions.collectionUserReset())
    }
  }, [isFocused])

  const pressedCollection = useCallback(
    (accountId: string, collectionId: string) => () => {
      navigation.navigate('Collection', {accountId, collectionId})
    },
    [],
  )

  const pressedItem = useCallback(
    ({itemId, collectionId}: {itemId: string; collectionId: string}) =>
      () => {
        navigation.navigate('Item', {itemId, collectionId})
      },
    [],
  )

  const getCollectionRecommendList = () => {
    dispatch(getCollectionRecommend({}))
  }

  const getItemRecommendList = (recs = '0,1,2,3,4', page = 1) => {
    dispatch(getItemRecommend({recs, page}))
  }

  const {collections, items} = useAppSelector(state => state.recommend)

  useEffect(() => getCollectionRecommendList(), [])
  useEffect(() => getItemRecommendList(), [])

  const collectionRenderItem = ({item, index}: {item: any; index: number}) => {
    if (item.collection === undefined) {
      return <></>
    }

    const thumbnail =
      item.title === 2
        ? item.collection.thumbnail
        : item.collection.items.length > 0
        ? item.collection.items.slice(-1)[0].thumbnail
        : item.collection.thumbnail

    return (
      <View key={item.collection._id} style={{marginBottom: 40}}>
        <CollectionContainer
          onPress={pressedCollection(
            item.collection.user._id,
            item.collection._id,
          )}
          style={{width: width * 0.8, marginLeft: !index ? 30 : 0}}>
          <CollectionImageContainer
            source={{
              uri: `${Config.IMAGE_BASE_URL}/w128/${thumbnail}`,
            }}
            resizeMode={'contain'}
          />
          <InfoContainer style={{flex: 1}}>
            <NormalText numberOfLines={1} ellipsizeMode={'middle'}>
              {recommendCollectionKey[item.title]}
            </NormalText>
            <NormalText>{item.collection.user.nickname} 님의</NormalText>
            <BoldText>{item.collection.title}</BoldText>
          </InfoContainer>
        </CollectionContainer>
      </View>
    )
  }

  const getAdditionalCollection = () => {
    if (collections.length < 5) {
      return <></>
    }
  }

  const itemRenderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <ItemBox
        key={item._id}
        style={index === 0 ? {marginLeft: 30} : {marginLeft: -20}}>
        <Pressable onPress={pressedItem({itemId: item._id, collectionId: ''})}>
          <ImageContainer
            source={{
              uri: `${Config.IMAGE_BASE_URL}/w128/${item.thumbnail}`,
            }}
            resizeMode={'contain'}
          />
          <NormalText>
            {item.priceAfter
              ? moneyComma(item.priceAfter)
              : moneyComma(item.priceBefore)
              ? moneyComma(item.priceBefore)
              : '가격정보 없음'}
          </NormalText>
          <NormalText>
            {item.title
              ? stringSlice(item.title, 18)
              : '이름을 찾을 수 없어요.'}
          </NormalText>
        </Pressable>
      </ItemBox>
    )
  }

  return (
    <SafeAreaView>
      <Container>
        <FlatList
          data={collections}
          renderItem={collectionRenderItem}
          horizontal={true}
          onEndReached={getAdditionalCollection}
        />
        {items.map(({title, itemList, rec, page}, index) => {
          return (
            <View key={title + index.toString()}>
              <BoldText style={{paddingLeft: 30, marginBottom: 10}}>
                {title.slice(0, 3) === '스티커'
                  ? `${STICKERS[parseInt(title.slice(4, 5)) - 1].emoji} '${
                      STICKERS[parseInt(title.slice(4, 5)) - 1].label
                    }' 가 많은 아이템`
                  : title}
              </BoldText>

              <ItemContainer>
                <FlatList
                  renderItem={itemRenderItem}
                  data={itemList}
                  horizontal={true}
                  onEndReached={() => {
                    getItemRecommendList(rec.toString(), page + 1)
                  }}></FlatList>
              </ItemContainer>
            </View>
          )
        })}
      </Container>
    </SafeAreaView>
  )
}

export default memo(RecommendStack)
