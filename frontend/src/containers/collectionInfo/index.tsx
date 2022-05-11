import * as React from 'react'
import {memo, useCallback, useState, createRef} from 'react'
import {Image, Text, TouchableOpacity} from 'react-native'
import BaseButton from '../../components/button/base'
import {useNavigation} from '@react-navigation/native'
import {Container, InfoTextContainer, ButtonContainer, InfoContainer, MenuButtonContainer, MenuContainer} from './styles'
import {useAppSelector, useAppDispatch} from '../../store/types'
import ActionSheet from 'react-native-actions-sheet'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import {CollectionState} from '../../store/slices/collection/types'
import { useRoute, RouteProp } from '@react-navigation/native'
import { CollectionStackParamList } from '../../../types/navigation'
import { ProfileStackParamList } from '../../../types/navigation'
import { deleteCollection } from '../../store/slices/collection/asyncThunk'
import { ProfileNavigationProp } from '../profileInfo/types'

function CollectionInfo() {
  const navigation = useNavigation<ProfileNavigationProp>()
  const route = useRoute<RouteProp<ProfileStackParamList>>()
  const collection = route.params.collection
  const dispatch = useAppDispatch()

  const [isVoting, setIsVoting] = useState(false)
  const [isMyList, setIsMyList] = useState(true)
  const [voteResult, setVoteResult] = useState('')
  const actionSheetRef = createRef<ActionSheet>()
  const username = collection?.user?.username ? collection.user.username : 'No name'

  const openSheet = () => {
    actionSheetRef.current?.show()
  }

  const editCollection = useCallback(() => {
    navigation.push('EditCollection', collection)
  }, [])

  const deleteCurrentCollection = useCallback(async () => {
    await dispatch(deleteCollection({accountId: collection!.user!._id, collectionId: collection!._id}))
    openSheet()
    navigation.navigate('Profile')
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
          <Text style={{fontSize: 18, fontWeight: '500', color: '#000000'}}>{collection?.title ? collection.title : 'Notitle'}</Text>
          <Text style={{fontSize: 10, color: '#000000', marginTop: 10}}>{collection?.description ? collection.description : 'Notitle'}</Text>
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
        {/* 내 리스트 판별로직 추가필요 */}
        {}
        {isMyList ?
          (!isVoting ?
           <BaseButton text={'투표 시작하기'} onPress={voteHandler} fontSize={8} paddingVertical={5} paddingHorizontal={10}></BaseButton>:
           <BaseButton text={'투표 종료하기'} onPress={voteHandler} fontSize={8} paddingVertical={5} paddingHorizontal={10}></BaseButton>
          ) : null
        }
        {isMyList && voteResult ? <BaseButton text={'투표 결과보기'} onPress={showVoteResult} fontSize={8} paddingVertical={5} paddingHorizontal={10} marginHorizontal={6}></BaseButton> : null}
        {!isMyList ? <BaseButton text={'컬렉션 찜하기'} onPress={showVoteResult} fontSize={8} paddingVertical={5} paddingHorizontal={10} marginHorizontal={6}></BaseButton> : null}
        {!isMyList ?
          (true ? <BaseButton text={`${username}님을 팔로우`} onPress={voteHandler} fontSize={8} paddingVertical={5} paddingHorizontal={10}></BaseButton>:
          <BaseButton text={`${username}님을 언팔로우`} onPress={voteHandler} fontSize={8} paddingVertical={5} paddingHorizontal={10}></BaseButton>) : null
        }
        </ButtonContainer>
      {/* Dashed Line 나중에 svg나 다른 라이브러리로 교체해야함 */}
      <Text ellipsizeMode="clip" numberOfLines={1}>
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      </Text>
      {isMyList ?
      <><MenuButtonContainer>
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
            onPress={deleteCurrentCollection}
            borderRadius={25}
            marginVertical={5}
            paddingVertical={15}
          />
        </MenuContainer>
      </ActionSheet></> : null
      }
    </Container>
  )
}

export default memo(CollectionInfo)
