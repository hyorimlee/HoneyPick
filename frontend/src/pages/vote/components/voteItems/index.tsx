import * as React from 'react'
import {memo, useCallback, useState, useEffect} from 'react'
import {Image, View, Text, FlatList, Alert, ScrollView} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {Container, ItemsContainer, VoteButtonContainer} from './styles'
import {useAppDispatch, useAppSelector} from '../../../../store/types'
import ItemComponent from '../../../collection/components/itemComponent'
import { IComponentProps } from './types'
import { RootStackNavigationProp } from '../../../../../types/navigation'
import { setSelectedItems } from '../../../../store/slices/vote'
import { IItem } from '~/store/slices/item/types'

function VoteItems({onVote, accountId, collectionId, eventId, voteId}: IComponentProps) {
  const dispatch = useAppDispatch()
  const itemNavigation = useNavigation<RootStackNavigationProp>()
  const {selectedItems} = useAppSelector(state => state.vote)
  const {currentItems} = useAppSelector(state => state.collection)
  const currentEventItems = useAppSelector(state => state.event.event.items)

  const toggleVote = useCallback((item: any) => {
    dispatch(setSelectedItems(item))
  }, [])

  const pushToItemPage = useCallback((itemId: string) => {
    if (collectionId) {
      itemNavigation.push('Item', {itemId: itemId, collectionId: collectionId})
    } else {
      itemNavigation.push('Item', {itemId: itemId, collectionId: '' })
    }
  }, [])

  return (
    <Container>
      {!eventId ? (
        <ItemsContainer>
        {currentItems!.map((item: any, index: number) => {
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
      ) : (
        <ItemsContainer>
      {currentEventItems!.map((item: any, index: number) => {
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
      ) }
    </Container>
  )
}

export default memo(VoteItems)
