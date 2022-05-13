import * as React from 'react'
import {memo, useCallback, useState} from 'react'
import {Image, View, Text, FlatList, Alert} from 'react-native'
import BaseButton from '../../../../components/button/base'
import {useNavigation} from '@react-navigation/native'
import {Container} from './styles'
import {useAppSelector} from '../../../../store/types'
import ItemComponent from '../itemComponent'
import {CollectionNavigationProp} from '../../types'
import {useRoute, RouteProp} from '@react-navigation/native'
import {ProfileStackParamList} from '../../../../../types/navigation'

function ColletionItems() {
  const navigation = useNavigation<CollectionNavigationProp>()
  const route = useRoute<RouteProp<ProfileStackParamList>>()
  const items = useAppSelector(state => state.collection.currentItems)

  const pushToItemPage = useCallback(() => {
    navigation.push('ItemPage')
  }, [])

  return (
    <Container>
      {items.map((item, index) => {
        const price = item.priceBefore ? item.priceBefore : 'No Price'
        console.log(item)
        return (
          <ItemComponent
            key={index}
            text={item.title}
            price={price}
            uri={item.thumbnail}
            onPress={pushToItemPage}
          />
        )
      })}
    </Container>
  )
}

export default memo(ColletionItems)
