import * as React from 'react'
import {memo, useCallback, useState} from 'react'
import {Image, View, Text, FlatList, Alert, ScrollView} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {Container, ItemsContainer, VoteButtonContainer} from './styles'
import {useAppDispatch, useAppSelector} from '../../../../store/types'
import ItemComponent from '../itemComponent'
import {IComponentProps} from './types'
import {RootStackNavigationProp} from '../../../../../types/navigation'

function ColletionItems({accountId, collectionId}: IComponentProps) {
  const itemNavigation = useNavigation<RootStackNavigationProp>()
  const {selectedItems} = useAppSelector(state => state.vote)
  const {currentCollection, currentItems} = useAppSelector(
    state => state.collection,
  )

  const pushToItemPage = useCallback(
    (itemId: string) => () => {
      itemNavigation.push('Item', {
        itemId: itemId,
        collectionId: currentCollection._id,
      })
    },
    [currentCollection._id],
  )

  return (
    <Container>
      <ItemsContainer style={{alignItems: 'flex-start'}}>
        {currentItems.length ? (
          currentItems.map((item, index) => {
            return (
              <ItemComponent
                key={index}
                text={item.title ? item.title : '이름을 찾을 수 없어요.'}
                price={item.priceAfter ? item.priceAfter : item.priceBefore}
                uri={item.thumbnail}
                isRecommend={item.recommend ? item.recommend : null}
                onPress={pushToItemPage(item._id)}
              />
            )
          })
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', fontSize: 20}}>아이템이 없어요.</Text>
          </View>
        )}
      </ItemsContainer>
    </Container>
  )
}

export default memo(ColletionItems)
