import * as React from 'react'
import {memo, useCallback} from 'react'
import {Image, Pressable, Text} from 'react-native'
import BaseButton from '../../components/button/base'
import {useNavigation} from '@react-navigation/native'
import {ProfileNavigationProp} from './types'
import {useAppSelector} from '../../store/types'
import Config from 'react-native-config'
import {Container, EditContainer, InfoContainer, FollowContainer, ProfileImage, Nickname, NormalText} from './styles'

function ProfileInfo() {
  const navigation = useNavigation<ProfileNavigationProp>()
  const {userId, nickname, profileImage, description, following, follower} =
    useAppSelector(state => state.profile)
  const myUserId = useAppSelector(state => state.user.userId)

  const editProfile = useCallback(() => {
    navigation.navigate('EditProfile')
  }, [])

  const navigateFollow = () => {
    navigation.push('Follow', {userId})
  }

  return (
    <Container>
      <InfoContainer>
        <ProfileImage
          source={{uri: `${Config.IMAGE_BASE_URL}/raw/${profileImage}`}}
        />
        <Nickname>{nickname}</Nickname>
        <NormalText>{description}</NormalText>
        <FollowContainer>
          <Pressable onPress={navigateFollow}>
            <NormalText>
              {following} 팔로잉
            </NormalText>
          </Pressable>
          <Pressable onPress={navigateFollow}>
            <NormalText>
              {follower} 팔로워
            </NormalText>
          </Pressable>
        </FollowContainer>
      </InfoContainer>
      <EditContainer>
        {myUserId === userId ? (
          <BaseButton
            text='프로필 수정'
            onPress={editProfile}
            paddingVertical={2}
          ></BaseButton>
        ) : null}
      </EditContainer>
    </Container>
  )
}

export default memo(ProfileInfo)
