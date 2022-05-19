import * as React from 'react'
import {memo, useCallback, createRef} from 'react'
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native'
import BaseButton from '../../../../components/button/base'
import {useNavigation} from '@react-navigation/native'
import {
  Container,
  InfoTextContainer,
  ButtonContainer,
  InfoContainer,
  MenuButtonContainer,
  MenuContainer,
} from './styles'
import {useAppSelector, useAppDispatch} from '../../../../store/types'
import ActionSheet from 'react-native-actions-sheet'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import {
  setCollectionLike,
  deleteCollection,
} from '~/store/slices/collection/asyncThunk'
import {CollectionNavigationProp} from '../../types'
import {RootStackNavigationProp} from '../../../../../types/navigation'
import {goToProfile, IComponentProps} from './types'
import uiSlice from '~/store/slices/ui'
import Config from 'react-native-config'
import collectionSlice from '~/store/slices/collection'

function CollectionInfo({accountId, collectionId}: IComponentProps) {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<RootStackNavigationProp>()
  const profileNavigation = useNavigation<goToProfile>()
  const actionSheetRef = createRef<ActionSheet>()

  const {userId} = useAppSelector(state => state.user)
  const {currentCollection} = useAppSelector(state => state.collection)
  const username = currentCollection ? currentCollection.user.username : ''
  const isMyList = currentCollection.user._id === userId

  const openSheet = () => {
    actionSheetRef.current?.show()
  }

  const editCurrentCollection = () => {
    actionSheetRef.current?.hide()
    dispatch(uiSlice.actions.setIsModal('editCollection'))
  }

  const deleteCurrentCollection = useCallback(async () => {
    Alert.alert(
      '컬렉션에 속한 아이템도 모두 삭제됩니다.\n정말 삭제하시겠습니까?',
      undefined,
      [
        {
          text: '확인',
          onPress: () => {
            dispatch(deleteCollection({accountId, collectionId}))
              .unwrap()
              .then(() => navigation.navigate('Home'))
              .catch(() =>
                Alert.alert(
                  '삭제가 되지 않았습니다.\n잠시후 다시 시도해주세요.',
                ),
              )
          },
        },
        {
          text: '취소',
        },
      ],
    )
  }, [accountId, collectionId])

  const openVote = useCallback(() => {
    currentCollection.items.length > 0
      ? dispatch(uiSlice.actions.setIsModal('createVote'))
      : Alert.alert('아이템이 최소 1개 이상있어야 투표 진행이 가능합니다.')
  }, [collectionId, currentCollection.items.length])

  const collectionLike = useCallback(() => {
    dispatch(setCollectionLike({collectionId}))
    dispatch(collectionSlice.actions.changMyLike())
  }, [collectionId])

  const navigationProfile = useCallback(() => {
    profileNavigation.navigate('ProfileDefault', {userId: accountId})
  }, [accountId])

  return (
    <Container>
      <InfoContainer style={{marginBottom: 20}}>
        <InfoTextContainer>
          <Text style={{fontSize: 20, fontWeight: '600', color: '#000000'}}>
            {currentCollection.title}
          </Text>
          <Text style={{fontSize: 14, color: '#000000', marginTop: 10}}>
            {currentCollection.description
              ? currentCollection.description
              : '컬렉션에 대한 설명이 없습니다.'}
          </Text>
        </InfoTextContainer>
        <Image
          source={{
            uri: `${Config.IMAGE_BASE_URL}/w128/${currentCollection.thumbnail}`,
          }}
          style={{
            width: 96,
            height: 96,
            resizeMode: 'contain',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#C4C4C4',
          }}
        />
      </InfoContainer>
      <ButtonContainer>
        {isMyList ? (
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexDirection: 'row',
              flex: 1,
            }}>
            <BaseButton
              text={'투표 진행하기'}
              onPress={openVote}
              paddingVertical={5}
              paddingHorizontal={15}></BaseButton>
            <MenuButtonContainer>
              <TouchableOpacity onPress={openSheet}>
                <FontAwesomeIcon
                  icon={faEllipsisVertical as IconProp}
                  color="#C4C4C4"
                  size={24}
                  style={{marginTop: 15}}
                />
              </TouchableOpacity>
            </MenuButtonContainer>
            <ActionSheet
              ref={actionSheetRef}
              containerStyle={{
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
              }}>
              <MenuContainer>
                <BaseButton
                  text={'컬렉션 정보 수정하기'}
                  onPress={editCurrentCollection}
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
            </ActionSheet>
          </View>
        ) : (
          <>
            <BaseButton
              text={`${
                currentCollection.myLiked ? '마음 취소하기' : '마음에 들어요'
              }`}
              backgroundColor={`${
                currentCollection.myLiked ? '#C4C4C4' : 'default'
              }`}
              onPress={collectionLike}
              paddingVertical={5}
              paddingHorizontal={15}
              ></BaseButton>
            <BaseButton
              text={`${username} 님의 프로필`}
              backgroundColor={'default'}
              onPress={navigationProfile}
              paddingVertical={5}
              paddingHorizontal={15}
              marginHorizontal={10}
            />
          </>
        )}
      </ButtonContainer>
    </Container>
  )
}

export default memo(CollectionInfo)
