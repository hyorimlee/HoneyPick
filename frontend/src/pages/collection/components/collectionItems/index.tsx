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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import { IComponentProps } from './types'
import { RootStackNavigationProp } from '../../../../../types/navigation'

function ColletionItems({onVote}: IComponentProps) {
  const navigation = useNavigation<CollectionNavigationProp>()
  const itemNavigation = useNavigation<RootStackNavigationProp>()
  const route = useRoute<RouteProp<ProfileStackParamList>>()
  const selectedItems = useState<any[]>([])
  const {currentCollection, currentItems} = useAppSelector(state => state.collection)
  console.log(currentItems)
  const addItem = useCallback(() => {
    console.log('addItem')
  }, [])

  const pushToItemPage = useCallback((itemId: string) => {
    itemNavigation.push('Item', { itemId: itemId, collectionId: currentCollection!._id})
  }, [])

  return (
    <Container>
      <ItemsContainer>
      {currentItems!.map((item, index) => {
        const price = item?.priceBefore ? item.priceBefore : 'No Price'
        console.log(item)
        return (
          <ItemComponent
          key={index}
          text={item.title}
          price={price}
          uri={item.thumbnail}
          onPress={onVote ? addItem : () => pushToItemPage(item._id)}
          />
          )
        })}
      </ItemsContainer>
    </Container>
  )
}

export default memo(ColletionItems)
