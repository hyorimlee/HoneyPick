import * as React from 'react'
import {memo, useCallback, useState} from 'react'
import {Image, View, Text, FlatList, Alert, ScrollView} from 'react-native'
import BaseButton from '../../../../components/button/base'
import {useNavigation} from '@react-navigation/native'
import {Container, ItemsContainer, VoteButtonContainer} from './styles'
import {useAppDispatch, useAppSelector} from '../../../../store/types'
import ItemComponent from '../itemComponent'
import {CollectionNavigationProp} from '../../types'
import {useRoute, RouteProp} from '@react-navigation/native'
import {ProfileStackParamList} from '../../../../../types/navigation'
import { IComponentProps } from './types'
import { RootStackNavigationProp } from '../../../../../types/navigation'
import { setSelectedItems } from '../../../../store/slices/vote'

function ColletionItems({onVote}: IComponentProps) {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<CollectionNavigationProp>()
  const itemNavigation = useNavigation<RootStackNavigationProp>()
  const route = useRoute<RouteProp<ProfileStackParamList>>()
  const {selectedItems} = useAppSelector(state => state.vote)
  const {currentCollection, currentItems} = useAppSelector(state => state.collection)

  const toggleVote = useCallback((item: any) => {
    dispatch(setSelectedItems(item))
  }, [])

  const pushToItemPage = useCallback((itemId: string) => {
    itemNavigation.push('Item', { itemId: itemId, collectionId: currentCollection!._id})
  }, [])

  return (
    <Container>
      <ItemsContainer>
      {currentItems!.map((item, index) => {
        const price = item?.priceBefore ? item.priceBefore : 'No Price'
        return (
          <ItemComponent
          key={index}
          text={item.title}
          price={price}
          uri={item.thumbnail}
          borderColor={selectedItems?.find((votedItem) => votedItem._id === item._id) ? '#F9C12E' : undefined}
          onPress={onVote ? () => toggleVote(item) : () => pushToItemPage(item._id)}
          />
          )
        })}
      </ItemsContainer>
    </Container>
  )
}

export default memo(ColletionItems)
