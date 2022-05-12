import * as React from 'react'
import {memo, useCallback} from 'react'
import {FlatList, Pressable, Text} from 'react-native'
import {ListItem} from './styles'
import {IProps} from './types'
import {ProfileNavigationProp} from '../../../containers/profileInfo/types'
import {useNavigation} from '@react-navigation/native'
import {useAppSelector} from '../../../store/types'

function HorizontalList({data}: IProps) {
  const navigation = useNavigation<ProfileNavigationProp>()
  const {userId} = useAppSelector(state => state.profile)

  const pressedList = useCallback(
    (id: string) => () => {
      console.log(id)
      console.log(userId)
      navigation.navigate('Collection', {accountId: userId, collectionId: id})
    },
    [userId],
  )

  const renderItem = ({item}: {item: any}) => {
    console.log('-  ', item)

    return (
      <Pressable onPress={pressedList(item._id)}>
        <ListItem></ListItem>
      </Pressable>
    )
  }

  return (
    <FlatList renderItem={renderItem} data={data} horizontal={true}></FlatList>
  )
}

export default memo(HorizontalList)
