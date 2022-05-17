import * as React from 'react'
import {memo, useCallback, useState} from 'react'
import {Image, View, Text, FlatList, Alert, ScrollView} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {Container, ItemsContainer, VoteButtonContainer} from './styles'
import {useAppDispatch, useAppSelector} from '../../../../store/types'
import ItemComponent from '../../../collection/components/itemComponent'
import { IComponentProps } from './types'
import { RootStackNavigationProp } from '../../../../../types/navigation'
import { setSelectedItems } from '../../../../store/slices/vote'

function VoteItems({onVote, accountId, collectionId, voteId}: IComponentProps) {
  const dispatch = useAppDispatch()
  const itemNavigation = useNavigation<RootStackNavigationProp>()
  const {selectedItems} = useAppSelector(state => state.vote)
  const {currentCollection, currentItems} = useAppSelector(state => state.collection)

  const toggleVote = useCallback((item: any) => {
    dispatch(setSelectedItems(item))
  }, [])

  const pushToItemPage = useCallback((itemId: string) => {
    itemNavigation.push('Item', { itemId: itemId, collectionId: collectionId})
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
          onPress={onVote ? () => toggleVote(item) : () => pushToItemPage(item._id)}
          />
          )
        })}
      </ItemsContainer>
    </Container>
  )
}

export default memo(VoteItems)
