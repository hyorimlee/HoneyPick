import * as React from 'react'
import {memo, useCallback} from 'react'
import {Image, Text} from 'react-native'
import BaseButton from '../../components/button/base'
import {useNavigation} from '@react-navigation/native'
import {Container, EditContainer, InfoContainer} from './styles'
import {ProfileNavigationProp} from './types'
import {useAppSelector} from '../../store/types'

function ProfileInfo() {
  const navigation = useNavigation<ProfileNavigationProp>()
  const {username, description, profileImage} = useAppSelector(state => {
    const {username, description, profileImage} = state.user
    return {username, description, profileImage}
  })
  const editProfile = useCallback(() => {
    navigation.push('EditProfile')
  }, [])

  return (
    <Container>
      <InfoContainer>
        <Image
          source={require('../../assets/images/honeybee.png')}
          style={{
            width: 64,
            height: 64,
            resizeMode: 'contain',
            borderRadius: 100,
            backgroundColor: 'black',
          }}
        />
        <Text style={{fontSize: 18, fontWeight: '500', color: '#000000'}}>
          {username}
        </Text>
        <Text style={{fontSize: 10, color: '#000000'}}>{description}</Text>
        <Text style={{fontSize: 10, color: '#000000'}}>
          100팔로잉 200팔로워
        </Text>
      </InfoContainer>
      <EditContainer>
        <BaseButton text={'프로필 수정'} onPress={editProfile}></BaseButton>
      </EditContainer>
    </Container>
  )
}

export default memo(ProfileInfo)
