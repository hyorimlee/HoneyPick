import * as React from 'react'
import {memo} from 'react'
import {FlatList, Text} from 'react-native'
import {IProps} from './types'

function HorizontalList({data}: IProps) {
  const renderItem = ({item}: {item: any}) => {
    return <Text>test</Text>
  }

  return (
    <FlatList renderItem={renderItem} data={data} horizontal={true}></FlatList>
  )
}

export default memo(HorizontalList)
