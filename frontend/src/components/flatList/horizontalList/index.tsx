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
    (collectionId: string, voteId?: string, isClosed?: boolean) => () => {
      title.includes('투표') && voteId && isClosed !== undefined
        ? navigation.navigate('Vote', {
            accountId: userId,
            collectionId,
            voteId,
            isClosed,
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
            ? pressedList(item.collectionId, item._id, item.isClosed)
            : pressedList(item._id)
        }
        style={index === 0 ? {marginLeft: 30} : {marginLeft: -20}}>
        <Image
          source={{uri: `${Config.IMAGE_BASE_URL}/raw/${item.thumbnail}`}}
          style={{
            width: 110,
            height: 110,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#C4C4C4',
          }}></Image>
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
          <Text style={{color: 'black', fontSize: 14, alignSelf: 'center'}}>
            {title}
            {title === '진행한 투표' ? '가' : '이'} 없어요.
          </Text>
        </NoneView>
      )}
    </>
  )
}

export default memo(HorizontalList)
