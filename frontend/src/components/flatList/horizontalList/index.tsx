import * as React from 'react'
import {memo, useCallback} from 'react'
import {IProps} from './types'
import {useNavigation} from '@react-navigation/native'
import {useAppSelector} from '../../../store/types'
import {CustomFlatList, ItemContainer, Title} from './styles'
import {RootStackNavigationProp} from '~/../types/navigation'
import {Image, Text} from 'react-native'
import Config from 'react-native-config'

function HorizontalList({data}: IProps) {
  const navigation = useNavigation<RootStackNavigationProp>()
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
        <Image
          source={{uri: `${Config.IMAGE_BASE_URL}/raw/${item.thumbnail}`}}
          style={{width: 75, height: 75, borderRadius: 10}}></Image>
        <Title>{item.title}</Title>
      </ItemContainer>
    )
  }

  return (
    <>
      {Array.from(data).length > 0 ? (
        <CustomFlatList
          renderItem={renderItem}
          data={data}
          horizontal={true}
          showsHorizontalScrollIndicator={false}></CustomFlatList>
      ) : (
        <Text style={{color: 'black'}}>비어있습니다.</Text>
      )}
    </>
  )
}

export default memo(HorizontalList)
