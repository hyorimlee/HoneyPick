import * as React from 'react'
import {memo, useCallback} from 'react'
import {Pressable, Alert} from 'react-native'
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
import EncryptedStorage from 'react-native-encrypted-storage'
import {useDispatch} from 'react-redux'
import userSlice from '~/store/slices/user'

function ProfileInfo() {
  const dispatch = useDispatch()
  const profileDefaultNavigation = useNavigation<ProfileDefaultNavigationProp>()
  const followNavigation = useNavigation<RootStackNavigationProp>()
  const {userId, nickname, profileImage, description, following, follower} =
    useAppSelector(state => state.profile)
  const myUserId = useAppSelector(state => state.user.userId)

  const logout = useCallback(async () => {
    try {
      await EncryptedStorage.removeItem('refreshToken')
      dispatch(userSlice.actions.setReset())
    } catch (error) {
      Alert.alert('오류가 발생했습니다.\n다시 시도해주세요')
    }
  }, [])

  const editProfile = useCallback(() => {
    profileDefaultNavigation.navigate('EditProfile')
  }, [])

  const navigateFollow = (type: 'following' | 'follower') => () => {
    followNavigation.push('Follow', {type})
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
          <Pressable onPress={navigateFollow('following')}>
            <NormalText>{following} 팔로잉</NormalText>
          </Pressable>
          <Pressable onPress={navigateFollow('follower')}>
            <NormalText>{follower} 팔로워</NormalText>
          </Pressable>
        </FollowContainer>
      </InfoContainer>
      <EditContainer>
        {myUserId === userId ? (
          <>
            <BaseButton
              text="로그아웃"
              onPress={logout}
              paddingVertical={2}
              marginVertical={10}
              fontSize={12}></BaseButton>
            <BaseButton
              text="프로필 수정"
              onPress={editProfile}
              paddingVertical={2}
              fontSize={12}></BaseButton>
          </>
        ) : null}
      </EditContainer>
    </Container>
  )
}

export default memo(ProfileInfo)
