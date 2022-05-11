import * as React from 'react'
import {memo, useState, useCallback} from 'react'
import {View, Text, Image} from 'react-native'
import {CustomFlatList, HorizontalContainer} from './styles'
import {IProps} from './types'
import BaseButton from '../../button/base'
import Config from 'react-native-config'

function FollowList({data}: IProps) {
  const followChange = useCallback(
    (accountId: string) => () => {
      console.log(accountId)
    },
    [],
  )

  const renderItem = ({item}: {item: any}) => {
    const {_id, image, nickname, description} = item

    return (
      <HorizontalContainer>
        <Image source={{uri: `${Config.IMAGE_BASE_URL}/raw/${image}`}}></Image>
        <View>
          <Text>{nickname}</Text>
          <Text>{description}</Text>
        </View>
        <BaseButton
          text={item.isFollow === true ? '언팔로우' : '팔로우'}
          backgroundColor={item.isFollow === true ? '#C4C4C4' : '#F9C12E'}
          color={item.isFollow === true ? 'black' : 'white'}
          onPress={followChange(_id)}
        />
      </HorizontalContainer>
    )
  }

  return <CustomFlatList data={data} renderItem={renderItem}></CustomFlatList>
}

export default memo(FollowList)
