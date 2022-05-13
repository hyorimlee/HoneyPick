import * as React from 'react'
import {memo, useCallback} from 'react'
import {Pressable} from 'react-native'
import BaseButton from '~/components/button/base'
import {useNavigation} from '@react-navigation/native'
import {useAppSelector} from '~/store/types'
import Config from 'react-native-config'
import {
  Container,
  EditContainer,
  InfoContainer,
  FollowContainer,
  ProfileImage,
  Nickname,
  NormalText,
} from './styles'
import {RootStackNavigationProp} from '~/../types/navigation'
import {ProfileDefaultNavigationProp} from '../../default/types'

function ProfileInfo() {
  const profileDefaultNavigation = useNavigation<ProfileDefaultNavigationProp>()
  const followNavigation = useNavigation<RootStackNavigationProp>()
  const {userId, nickname, profileImage, description, following, follower} =
    useAppSelector(state => state.profile)
  const myUserId = useAppSelector(state => state.user.userId)

  const editProfile = useCallback(() => {
    profileDefaultNavigation.navigate('EditProfile')
  }, [])

  const navigateFollow = () => {
    followNavigation.push('Follow', {userId})
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
            <NormalText>{following} 팔로잉</NormalText>
          </Pressable>
          <Pressable onPress={navigateFollow}>
            <NormalText>{follower} 팔로워</NormalText>
          </Pressable>
        </FollowContainer>
      </InfoContainer>
      <EditContainer>
        {myUserId === userId ? (
          <BaseButton
            text="프로필 수정"
            onPress={editProfile}
            paddingVertical={2}
            fontSize={12}></BaseButton>
        ) : null}
      </EditContainer>
    </Container>
  )
}

export default memo(ProfileInfo)
