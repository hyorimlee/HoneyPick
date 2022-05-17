import * as React from 'react'
import {memo, useCallback, useState} from 'react'
import {Image, View, Text, FlatList, Alert, ScrollView} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {Container, LargeItem, MediumItem, SmallItem} from './styles'
import {useAppDispatch, useAppSelector} from '../../../../store/types'
import ItemComponent from '../../../collection/components/itemComponent'
import { IComponentProps } from './types'
import { RootStackNavigationProp } from '../../../../../types/navigation'
import { setSelectedItems } from '../../../../store/slices/vote'

function ResultItems({accountId, collectionId, voteId, result}: IComponentProps) {
  const dispatch = useAppDispatch()
  const itemNavigation = useNavigation<RootStackNavigationProp>()
  const {selectedItems} = useAppSelector(state => state.vote)
  const {currentCollection} = useAppSelector(state => state.collection)

  const pushToItemPage = useCallback((itemId: string) => {
    itemNavigation.push('Item', {itemId: itemId, collectionId: collectionId})
  }, [])

  return (
    <Container>
      {result.map((item, index) => {
        if (index === 0) {
          return(
            <LargeItem key={index}>
              <View><Text>{item.count}</Text></View>
            </LargeItem>
          )
        } else if (index === 1 || index === 2) {
          return(
            <MediumItem key={index}>
              <View><Text>{item._id}</Text></View>
            </MediumItem>
          )
        } else {
          return(
            <SmallItem key={index}>
              <View><Text>etc</Text></View>
            </SmallItem>
          )
        }

      })}
    </Container>
  )
}

export default memo(ResultItems)
