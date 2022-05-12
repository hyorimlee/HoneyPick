import * as React from 'react'
import {memo, useCallback} from 'react'
import {FlatList, Pressable, Text} from 'react-native'
import {IProps} from './types'
import {ProfileNavigationProp} from '../../../containers/profileInfo/types'
import {useNavigation} from '@react-navigation/native'
import {useAppSelector} from '../../../store/types'
import {CustomFlatList, ItemContainer, ListItem, Title} from './styles'

function HorizontalList({data}: IProps) {
  const navigation = useNavigation<ProfileNavigationProp>()
  const {userId} = useAppSelector(state => state.profile)

  const pressedList = useCallback(
    (id: string) => () => {
      navigation.navigate('Collection', {accountId: userId, collectionId: id})
    },
    [userId],
  )

  const renderItem = ({item}: {item: any}) => {
    return (
      <ItemContainer onPress={pressedList(item._id)}>
        <ListItem></ListItem>
        <Title>컬렉션 이름</Title>
      </ItemContainer>
    )
  }

  return (
    <CustomFlatList renderItem={renderItem} data={data} horizontal={true}></CustomFlatList>
  )
}

export default memo(HorizontalList)
