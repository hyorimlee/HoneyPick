import * as React from 'react'
import {memo, useCallback, useState} from 'react'
import {Image, View, Text, FlatList, Alert, ScrollView} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {Container, ItemsContainer, VoteButtonContainer} from './styles'
import {useAppDispatch, useAppSelector} from '../../../../store/types'
import ItemComponent from '../itemComponent'
import { IComponentProps } from './types'
import { RootStackNavigationProp } from '../../../../../types/navigation'

function ColletionItems({accountId, collectionId}: IComponentProps) {
  const itemNavigation = useNavigation<RootStackNavigationProp>()
  const {selectedItems} = useAppSelector(state => state.vote)
  const {currentCollection, currentItems} = useAppSelector(state => state.collection)

  const pushToItemPage = useCallback((itemId: string) => {
    itemNavigation.push('Item', { itemId: itemId, collectionId: currentCollection!._id})
  }, [])

  return (
    <Container>
      <ItemsContainer>
      {currentItems!.map((item, index) => {
        return (
          <ItemComponent
          key={index}
          text={item?.title ? item.title : 'No title'}
          price={item?.priceBefore ? item.priceBefore : 'No Price'}
          uri={item.thumbnail}
          borderColor={selectedItems?.find((votedItem) => votedItem._id === item._id) ? '#F9C12E' : undefined}
          onPress={() => pushToItemPage(item._id)}
          />
          )
        })}
      </ItemsContainer>
    </Container>
  )
}

export default memo(ColletionItems)
