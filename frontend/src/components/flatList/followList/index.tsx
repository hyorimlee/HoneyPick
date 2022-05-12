import * as React from 'react'
import {memo, useState, useCallback} from 'react'
import {View, Text, Image, Pressable} from 'react-native'
import {CustomFlatList, HorizontalContainer} from './styles'
import {IProps} from './types'
import BaseButton from '../../button/base'
import Config from 'react-native-config'
import {useAppDispatch, useAppSelector} from '../../../store/types'
import {setFollow} from '../../../store/slices/profile/asyncThunk'
import {useNavigation} from '@react-navigation/native'
import {ProfileNavigationProp} from '../../../../types/navigation'
import profileSlice from '../../../store/slices/profile'

function FollowList({data}: IProps) {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<ProfileNavigationProp>()
  const myUserId = useAppSelector(state => state.user.userId)

  const followChange = useCallback(
    (userId: string) => () => {
      dispatch(setFollow({userId}))
      dispatch(profileSlice.actions.changeFollow({userId, myUserId}))
    },
    [],
  )

  const navigateProfile = useCallback(
    (userId: string) => () => {
      navigation.navigate('Default', {userId})
    },
    [],
  )

  const renderItem = ({item}: {item: any}) => {
    const {_id, profileImage, nickname, description, myFollow} = item

    return (
      <HorizontalContainer>
        <View style={{flex: 1}}>
          <Pressable onPress={navigateProfile(_id)}>
            <Image
              source={{uri: `${Config.IMAGE_BASE_URL}/raw/${profileImage}`}}
              style={{
                width: 64,
                height: 64,
                resizeMode: 'contain',
                borderRadius: 100,
                backgroundColor: 'black',
              }}></Image>
          </Pressable>
        </View>
        <View style={{flex: 1}}>
          <Pressable onPress={navigateProfile(_id)}>
            <Text>{nickname}</Text>
            <Text>{description}</Text>
          </Pressable>
        </View>
        <View style={{flex: 1}}>
          {myUserId !== _id ? (
            <BaseButton
              text={myFollow === true ? '언팔로우' : '팔로우'}
              backgroundColor={myFollow === true ? '#C4C4C4' : ''}
              onPress={followChange(_id)}
            />
          ) : null}
        </View>
      </HorizontalContainer>
    )
  }

  return <CustomFlatList data={data} renderItem={renderItem}></CustomFlatList>
}

export default memo(FollowList)
