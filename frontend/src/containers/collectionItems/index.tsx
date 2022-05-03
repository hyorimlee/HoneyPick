import * as React from 'react'
import {memo, useCallback, useState} from 'react'
import {Image, View, Text, FlatList, Alert} from 'react-native'
import BaseButton from '../../components/button/base'
import {useNavigation} from '@react-navigation/native'
import {Container} from './styles'
import {useAppSelector} from '../../store/types'
import ItemComponent from '../../components/itemComponent'
import { CollectionNavigationProp } from '../../pages/collection/types'

function ColletionItems() {
  const navigation = useNavigation<CollectionNavigationProp>()

  const items = [
    {itemName: 'item1', itemPrice:1000},
    {itemName: 'item2', itemPrice:1000},
    {itemName: 'item3'},
    {itemName: 'item4'},
    {itemName: 'item5'},
    {itemName: 'item6'},
    {itemName: 'item7'},
    {itemName: 'item8'},
    {itemName: 'item9'},
    {itemName: 'item1'},
    {itemName: 'item2'},
    {itemName: 'item3'},
    {itemName: 'item4'},
    {itemName: 'item5'},
    {itemName: 'item6'},
    {itemName: 'item7'},
    {itemName: 'item8'},
    {itemName: 'item9'},
    {itemName: 'item1'},
    {itemName: 'item2'},
    {itemName: 'item3'},
    {itemName: 'item4'},
  ]


  const pushToItemPage = useCallback(() => {
    navigation.push('ItemPage')
  }, [])

  return (
    <Container>
      {items.map((item, index) => {
        const price = item.itemPrice ? item.itemPrice : 'No Price'
        return(<ItemComponent key={index} text={item.itemName} price={price} onPress={pushToItemPage}/>)
      })}
    </Container>
  )
}

export default memo(ColletionItems)
