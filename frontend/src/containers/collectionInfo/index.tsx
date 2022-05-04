import * as React from 'react'
import {memo, useCallback, useState, createRef} from 'react'
import {Image, Text, TouchableOpacity} from 'react-native'
import BaseButton from '../../components/button/base'
import {useNavigation} from '@react-navigation/native'
import {Container, InfoTextContainer, ButtonContainer, InfoContainer, MenuButtonContainer, MenuContainer} from './styles'
import {CollectionNavigationProp} from '../../pages/collection/types'
import {useAppSelector} from '../../store/types'
import ActionSheet from 'react-native-actions-sheet'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'
import {IconProp} from '@fortawesome/fontawesome-svg-core'


function CollectionInfo() {
  const navigation = useNavigation<CollectionNavigationProp>()
  const [collectionName, setCollectionName] = useState('내 콜렉션')
  const [collectionDesc, setCollectionDesc] = useState('내 콜렉션에 대한 설명 내 콜렉션에 대한 설명 내 콜렉션에 대한 설명 내 콜렉션에 대한 설명 내 콜렉션에 대한 설명 내 콜렉션에 대한 설명')
  const [collectioImage, setCollectioImage] = useState('')
  const [isVoting, setIsVoting] = useState(false)
  const [voteResult, setVoteResult] = useState('')
  const [menuPopup, setMenuPopup] = useState(false)

  const actionSheetRef = createRef<ActionSheet>()

  const openSheet = () => {
    actionSheetRef.current?.show()
  }

  const editCollection = useCallback(() => {
    navigation.push('EditCollection')
  }, [])

  const deleteCollection = useCallback(() => {
    // 컬렉션 삭제를 요청하는 로직
    // 삭제 후 Profile로 push
  }, [])

  const voteHandler = useCallback(() => {
    const prevState = isVoting

    setIsVoting(!isVoting)

    if (prevState) {
      //투표종료, 투표 결과를 가져오는 API요청 + 에러처리
      setVoteResult('투표결과내용')
    } else {
      // 투표를 시작하는 API요청 + 에러처리
    }

  }, [isVoting, setVoteResult])

  const showVoteResult = useCallback(() => {
    // navigation.push('VoteResult')
  }, [])

  return (
    <Container>
      <InfoContainer>
        <InfoTextContainer>
          <Text style={{fontSize: 18, fontWeight: '500', color: '#000000'}}>{collectionName}</Text>
          <Text style={{fontSize: 10, color: '#000000', marginTop: 10}}>{collectionDesc}</Text>
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
          <BaseButton text={'투표 시작하기'} onPress={voteHandler} fontSize={8} paddingVertical={5} paddingHorizontal={10}></BaseButton>:
          <BaseButton text={'투표 종료하기'} onPress={voteHandler} fontSize={8} paddingVertical={5} paddingHorizontal={10}></BaseButton>
        }
        {voteResult ? <BaseButton text={'투표 결과보기'} onPress={showVoteResult} fontSize={8} paddingVertical={5} paddingHorizontal={10} marginHorizontal={6}></BaseButton> : null}
      </ButtonContainer>
      {/* Dashed Line 나중에 svg나 다른 라이브러리로 교체해야함 */}
      <Text ellipsizeMode="clip" numberOfLines={1}>
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      </Text>
      <MenuButtonContainer>
        <TouchableOpacity onPress={openSheet}>
          <FontAwesomeIcon
            icon={faEllipsisVertical as IconProp}
            color='#C4C4C4'
            size={24}
            style={{marginTop: 15}}
          />
        </TouchableOpacity>
      </MenuButtonContainer>
        <ActionSheet
          ref={actionSheetRef}
          containerStyle={{borderTopLeftRadius: 25, borderTopRightRadius: 25}}
        >
          <MenuContainer>
            <BaseButton
              text={'컬렉션 정보 수정하기'}
              onPress={editCollection}
              borderRadius={25}
              marginVertical={5}
              paddingVertical={15}
            />
            <BaseButton
              text={'이 컬렉션 삭제하기'}
              onPress={deleteCollection}
              borderRadius={25}
              marginVertical={5}
              paddingVertical={15}
            />
          </MenuContainer>
        </ActionSheet>

    </Container>
  )
}

export default memo(CollectionInfo)
