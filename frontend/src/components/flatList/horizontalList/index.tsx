import * as React from 'react'
import {memo, useCallback} from 'react'
import {FlatList, Pressable, Text} from 'react-native'
import {ListItem} from './styles'
import {IProps} from './types'

function HorizontalList({data}: IProps) {
  const pressedList = useCallback((id: string, items: []) => () => {}, [])

  const renderItem = ({item}: {item: any}) => {
    console.log('-  ', item)

    return (
      <Pressable onPress={pressedList(item._id, item.items)}>
        <ListItem></ListItem>
      </Pressable>
    )
  }

  return (
    <FlatList renderItem={renderItem} data={data} horizontal={true}></FlatList>
  )
}

export default memo(HorizontalList)
