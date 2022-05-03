import * as React from 'react'
import {memo, useCallback, useState} from 'react'
import {Image, Text} from 'react-native'
import BaseButton from '../../components/button/base'
import {useNavigation} from '@react-navigation/native'
import {Container, InfoTextContainer, ButtonContainer, InfoContainer, MenuContainer} from './styles'
import {CollectionNavigationProp} from './types'
import {useAppSelector} from '../../store/types'

function CollectionInfo() {
  const navigation = useNavigation<CollectionNavigationProp>()
  const [collectionName, setCollectionName] = useState('내 콜렉션')
  const [collectionDesc, setCollectionDesc] = useState('내 콜렉션에 대한 설명 내 콜렉션에 대한 설명 내 콜렉션에 대한 설명 내 콜렉션에 대한 설명 내 콜렉션에 대한 설명 내 콜렉션에 대한 설명')
  const [collectioImage, setCollectioImage] = useState('')
  const [isVoting, setIsVoting] = useState(false)
  const [voteResult, setVoteResult] = useState(false)
  const [menuPopup, setMenuPopup] = useState(false)

  const editCollection = useCallback(() => {
    navigation.push('EditCollection')
  }, [])

  const voteHandler = useCallback(() => {
    setIsVoting(!isVoting)
    setVoteResult(!voteResult)
  }, [isVoting, voteResult])

  const menuHandler = useCallback(() => {
    setMenuPopup(!menuPopup)
  }, [menuPopup])

  return (
    <Container>
      <InfoContainer>
        <InfoTextContainer>
          <Text style={{fontSize: 18, fontWeight: '500'}}>{collectionName}</Text>
          <Text style={{fontSize: 10}}>{collectionDesc}</Text>
        </InfoTextContainer>
        <Image
          source={require('../../assets/images/honeybee.png')}
          style={{
            width: 96,
            height: 96,
            resizeMode: 'contain',
            borderRadius: 10,
            borderWidth: 4,
            borderColor: 'black',
            backgroundColor: 'white',
          }}
        />
      </InfoContainer>
      <ButtonContainer>
        {!isVoting ?
          <BaseButton text={'투표 시작하기'} onPress={voteHandler}></BaseButton>:
          <BaseButton text={'투표 종료하기'} onPress={voteHandler}></BaseButton>
        }
        {voteResult && <BaseButton text={'투표 결과보기'} onPress={voteHandler}></BaseButton>}
      </ButtonContainer>
      {/* Dashed Line 나중에 svg나 다른 라이브러리로 교체해야함 */}
      <Text ellipsizeMode="clip" numberOfLines={1}>
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      </Text>
      <MenuContainer>
        <BaseButton text={'햄버거메뉴 버튼 자리'} onPress={menuHandler}></BaseButton>
      </MenuContainer>
    </Container>
  )
}

export default memo(CollectionInfo)
