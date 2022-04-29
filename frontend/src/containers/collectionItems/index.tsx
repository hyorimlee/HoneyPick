import * as React from 'react'
import {memo, useCallback, useState} from 'react'
import {Image, View, Text, FlatList} from 'react-native'
import BaseButton from '../../components/button/base'
import {useNavigation} from '@react-navigation/native'
import {Container} from './styles'
import {useAppSelector} from '../../store/types'

function ColletionItems() {
  const items = [
    {itemName: 'item1'},
    {itemName: 'item2'},
    {itemName: 'item3'},
    {itemName: 'item4'},
    {itemName: 'item5'},
    {itemName: 'item6'},
    {itemName: 'item7'},
    {itemName: 'item8'},
    {itemName: 'item9'},
  ]

  return (
    <Container>
            <FlatList
              data={items}
              renderItem={({ item }) => (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    margin: 1,
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{width:80, height:80}}
                    source={require('../../assets/images/honeybee.png')}
                  />
                  <Text>{item.itemName}</Text>
                </View>
              )}
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
            />
    </Container>
  )
}

export default memo(ColletionItems)
