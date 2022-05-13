import * as React from 'react'
import {memo, useState, useCallback} from 'react'
import {View, Text, Image, Pressable} from 'react-native'
import {IProps} from './types'
import BaseButton from '../../../../components/button/base'
import Config from 'react-native-config'
import {useAppDispatch, useAppSelector} from '../../../../store/types'
import {setFollow} from '../../../../store/slices/profile/asyncThunk'
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native'
import profileSlice from '../../../../store/slices/profile'
import {
  CustomFlatList,
  HorizontalContainer,
  ProfileImage,
  ButtonContainer,
  Nickname,
  Description,
} from './styles'

function FollowList({data}: IProps) {
  const dispatch = useAppDispatch()
  // const navigation = useNavigation<ProfileNavigationProp>()
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
      // navigation.navigate('Default', {userId})
    },
    [],
  )

  const renderItem = ({item}: {item: any}) => {
    const {_id, profileImage, nickname, description, myFollow} = item

    return (
      <HorizontalContainer>
        <View>
          <Pressable
            onPress={navigateProfile(_id)}
            style={{flexDirection: 'row'}}>
            <ProfileImage
              source={{
                uri: `${Config.IMAGE_BASE_URL}/raw/${profileImage}`,
              }}></ProfileImage>
            <View style={{paddingLeft: 10}}>
              <Nickname>{nickname}</Nickname>
              <Description>{description}</Description>
            </View>
          </Pressable>
        </View>
        <ButtonContainer>
          {myUserId !== _id ? (
            <BaseButton
              text={myFollow === true ? '언팔로우' : '팔로우'}
              backgroundColor={myFollow === true ? '#C4C4C4' : ''}
              onPress={followChange(_id)}
              fontSize={12}
              paddingVertical={2}
              paddingHorizontal={15}
            />
          ) : null}
        </ButtonContainer>
      </HorizontalContainer>
    )
  }

  return <CustomFlatList data={data} renderItem={renderItem}></CustomFlatList>
}

export default memo(FollowList)
