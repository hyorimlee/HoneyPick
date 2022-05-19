import * as React from 'react'
import {memo, useCallback, useEffect} from 'react'
import {Dimensions, FlatList, Image, Pressable, Text, View} from 'react-native'
import {BoldText} from '../../styles'
import {IProps} from './types'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import {useAppDispatch, useAppSelector} from '~/store/types'
import {RootStackNavigationProp} from '~/../types/navigation'
import {ImageContainer, ItemBox, ItemContainer, NormalText} from './styles'
import Config from 'react-native-config'
import {moneyComma, stringSlice} from '~/modules/convert'
import collectionSlice from '~/store/slices/collection'

const {width} = Dimensions.get('window')

function SearchResult({keywordEntered, collections, items}: IProps) {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<RootStackNavigationProp>()
  const {userId} = useAppSelector(state => state.user)

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      dispatch(collectionSlice.actions.collectionUserReset())
    }
  }, [isFocused])

  const pressedItem = useCallback(
    (itemId: string) => () => {
      navigation.navigate('Item', {itemId: itemId, collectionId: ''})
    },
    [userId],
  )

  const pressedCollection = useCallback(
    ({collectionId, accountId}: {collectionId: string; accountId: string}) =>
      () => {
        navigation.navigate('Collection', {collectionId, accountId})
      },
    [],
  )

  const collectionRenderItem = ({item, index}: {item: any; index: number}) => {
    const thumbnail =
      item.items.length > 0 ? item.items.slice(-1)[0].thumbnail : item.thumbnail

    return (
      <View
        style={{
          marginRight: 30,
          marginLeft: !index ? 30 : -20,
          marginBottom: 30,
        }}>
        <Pressable
          onPress={pressedCollection({
            collectionId: item._id,
            accountId: item.user._id,
          })}>
          <ImageContainer
            source={{
              uri: `${Config.IMAGE_BASE_URL}/w128/${thumbnail}`,
            }}
            style={{}}></ImageContainer>
          <Text style={{color: 'black', fontSize: 14, alignSelf: 'center'}}>
            {item.title}
          </Text>
        </Pressable>
      </View>
    )
  }

  const itemRenderItem = ({item}: {item: any}) => {
    return (
      <ItemBox style={{flex: 1}} key={item._id} onPress={pressedItem(item._id)}>
        <ImageContainer
          source={
            item.thumbnail
              ? {
                  uri: `${Config.IMAGE_BASE_URL}/w128/${item.thumbnail}`,
                }
              : require('~/assets/images/sampleimage1.jpg')
          }
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
          {item.title ? stringSlice(item.title, 18) : 'No Title'}
        </NormalText>
      </ItemBox>
    )
  }

  return (
    // 아이템 리스트
    <View>
      <BoldText>'{keywordEntered}'이(가) 포함된 컬렉션</BoldText>
      {collections.length ? (
        <FlatList
          data={collections}
          renderItem={collectionRenderItem}
          horizontal={true}></FlatList>
      ) : (
        <NormalText style={{marginVertical: 30, marginHorizontal: 30}}>
          검색 결과가 없습니다.
        </NormalText>
      )}
      <BoldText>'{keywordEntered}'이(가) 포함된 아이템</BoldText>
      <View style={{paddingHorizontal: 30}}>
        {items.length ? (
          <ItemContainer>
            {items.map((item: any) => {
              return itemRenderItem({item})
            })}
          </ItemContainer>
        ) : (
          <NormalText style={{marginVertical: 30}}>
            검색 결과가 없습니다.
          </NormalText>
        )}
      </View>
    </View>
  )
}
export default memo(SearchResult)
