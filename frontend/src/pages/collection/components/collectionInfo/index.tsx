import * as React from 'react'
import {memo, useCallback, useState, useEffect, createRef} from 'react'
import {Image, Text, TouchableOpacity} from 'react-native'
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
import {deleteCollection} from '../../../../store/slices/collection/asyncThunk'
import {setFollow} from '../../../../store/slices/profile/asyncThunk'
import profileSlice from '../../../../store/slices/profile'
import {CollectionNavigationProp} from '../../types'
import {RootStackNavigationProp} from '../../../../../types/navigation'
import {IComponentProps} from './types'
import uiSlice from '~/store/slices/ui'

function CollectionInfo({accountId, collectionId}: IComponentProps) {
  const navigation = useNavigation<RootStackNavigationProp>()
  const collectionNavigation = useNavigation<CollectionNavigationProp>()
  const dispatch = useAppDispatch()

  const {userId} = useAppSelector(state => state.user)
  const {currentCollection} = useAppSelector(state => state.collection)
  const isMyList = currentCollection?.user._id === userId

  const actionSheetRef = createRef<ActionSheet>()
  const username = currentCollection?.user?.username
    ? currentCollection.user.username
    : 'No name'

  const openSheet = () => {
    actionSheetRef.current?.show()
  }

  const editCurrentCollection = () => {
    actionSheetRef.current?.hide()
    dispatch(uiSlice.actions.setIsModal('editCollection'))
  }

  const deleteCurrentCollection = useCallback(async () => {
    await dispatch(
      deleteCollection({accountId: accountId, collectionId: collectionId}),
    )
    navigation.navigate('Home')
  }, [])

  const openVote = useCallback(() => {
    collectionNavigation.push('CreateVote')
  }, [])

  const followChange = useCallback(() => {
    dispatch(setFollow({userId}))
    dispatch(profileSlice.actions.changeFollow({userId, accountId}))
  }, [])

  return (
    <Container>
      <InfoContainer>
        <InfoTextContainer>
          <Text style={{fontSize: 18, fontWeight: '500', color: '#000000'}}>
            {currentCollection?.title ? currentCollection.title : 'Notitle'}
          </Text>
          <Text style={{fontSize: 10, color: '#000000', marginTop: 10}}>
            {currentCollection?.description
              ? currentCollection.description
              : 'Notitle'}
          </Text>
        </InfoTextContainer>
        <Image
          source={require('~/assets/images/honeybee.png')}
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
        {isMyList ? (
          <BaseButton
            text={'투표 진행하기'}
            onPress={openVote}
            fontSize={8}
            paddingVertical={5}
            paddingHorizontal={10}></BaseButton>
        ) : null}
        {!isMyList ? (
          <>
            <BaseButton
              text={'컬렉션 찜하기'}
              onPress={openVote}
              fontSize={8}
              paddingVertical={5}
              paddingHorizontal={10}
              marginHorizontal={6}></BaseButton>
            <BaseButton
              text={
                true ? `${username}님을 팔로우` : `${username}님을 언팔로우`
              }
              onPress={followChange}
              fontSize={8}
              paddingVertical={5}
              paddingHorizontal={10}></BaseButton>
          </>
        ) : null}
      </ButtonContainer>
      {/* Dashed Line 나중에 svg나 다른 라이브러리로 교체해야함 */}
      <Text ellipsizeMode="clip" numberOfLines={1}>
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        -
      </Text>
      {isMyList ? (
        <>
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
        </>
      ) : null}
    </Container>
  )
}

export default memo(CollectionInfo)
