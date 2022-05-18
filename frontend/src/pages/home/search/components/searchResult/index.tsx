import * as React from 'react'
import {memo, useCallback, useEffect} from 'react'
import {View} from 'react-native'
import HorizontalList from '~/components/flatList/horizontalList'
import {BoldText} from '../../styles'
import {IProps} from './types'
import {useNavigation} from '@react-navigation/native'
import {useAppSelector} from '~/store/types'
import {RootStackNavigationProp} from '~/../types/navigation'
import {ImageContainer, ItemBox, ItemContainer, NormalText} from './styles'
import Config from 'react-native-config'
import {moneyComma, stringSlice} from '~/modules/convert'

function SearchResult({keywordEntered, collections, items}: IProps) {
  const navigation = useNavigation<RootStackNavigationProp>()
  const {userId} = useAppSelector(state => state.user)

  const pressedItem = useCallback(
    (itemId: string) => () => {
      navigation.navigate('Item', {itemId: itemId, collectionId: ''})
    },
    [userId],
  )
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
          imageStyle={{
            resizeMode: 'contain',
            borderRadius: 10,
          }}
          style={{borderRadius: 10, borderWidth: 1, borderColor: '#C4C4C4'}}
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
        <HorizontalList data={collections}></HorizontalList>
      ) : (
        <NormalText style={{marginVertical: 20}}>
          검색 결과가 없습니다.
        </NormalText>
      )}

      <BoldText>'{keywordEntered}'이(가) 포함된 아이템</BoldText>
      {items.length ? (
        <ItemContainer>
          {items.map((item: any) => {
            return itemRenderItem({item})
          })}
        </ItemContainer>
      ) : (
        <NormalText style={{marginVertical: 20}}>
          검색 결과가 없습니다.
        </NormalText>
      )}
    </View>
  )
}
export default memo(SearchResult)
