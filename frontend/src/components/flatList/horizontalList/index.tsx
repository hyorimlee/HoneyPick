import * as React from 'react'
import {memo, useCallback} from 'react'
import {IProps} from './types'
import {useNavigation} from '@react-navigation/native'
import {useAppSelector} from '../../../store/types'
import {CustomFlatList, ItemContainer, NoneView, Title} from './styles'
import {RootStackNavigationProp} from '~/../types/navigation'
import {Image, Text} from 'react-native'
import Config from 'react-native-config'

function HorizontalList({data, title}: IProps) {
  const navigation = useNavigation<RootStackNavigationProp>()
  const {userId} = useAppSelector(state => state.profile)

  const pressedList = useCallback(
    (collectionId: string, voteId?: string) => () => {
      title.includes('투표') && voteId
        ? navigation.navigate('Vote', {
            accountId: userId,
            collectionId,
            voteId,
            isClosed: true,
          })
        : navigation.navigate('Collection', {
            accountId: userId,
            collectionId,
          })
    },
    [userId],
  )

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <ItemContainer
        onPress={
          title.includes('투표')
            ? pressedList(item.collectionId, item._id)
            : pressedList(item._id)
        }
        style={index === 0 ? {marginLeft: 30} : {marginLeft: -20}}>
        <Image
          source={{uri: `${Config.IMAGE_BASE_URL}/raw/${item.thumbnail}`}}
          style={{width: 100, height: 100, borderRadius: 10}}></Image>
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
        <NoneView>
          <Text style={{color: 'black', fontSize: 18, alignSelf: 'center'}}>
            {title}
            {title === '진행한 투표' ? '가' : '이'} 없어요.
          </Text>
        </NoneView>
      )}
    </>
  )
}

export default memo(HorizontalList)
