import * as React from 'react'
import {memo, useCallback} from 'react'
import {Image, Pressable, Text} from 'react-native'
import BaseButton from '../../components/button/base'
import {useNavigation} from '@react-navigation/native'
import {Container, EditContainer, InfoContainer} from './styles'
import {ProfileNavigationProp} from './types'
import {useAppSelector} from '../../store/types'
import Config from 'react-native-config'

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
        <Image
          source={{uri: `${Config.IMAGE_BASE_URL}/raw/${profileImage}`}}
          style={{
            width: 64,
            height: 64,
            resizeMode: 'contain',
            borderRadius: 100,
            backgroundColor: 'black',
          }}
        />
        <Text style={{fontSize: 18, fontWeight: '500', color: '#000000'}}>
          {nickname}
        </Text>
        <Text style={{fontSize: 10, color: '#000000'}}>{description}</Text>
        <Pressable onPress={navigateFollow}>
          <Text style={{fontSize: 10, color: '#000000'}}>
            {following}팔로잉 {follower}팔로워
          </Text>
        </Pressable>
      </InfoContainer>
      <EditContainer>
        {myUserId === userId ? (
          <BaseButton text={'프로필 수정'} onPress={editProfile}></BaseButton>
        ) : null}
      </EditContainer>
    </Container>
  )
}

export default memo(ProfileInfo)
