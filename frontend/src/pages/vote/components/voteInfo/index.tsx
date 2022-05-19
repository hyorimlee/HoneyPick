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
import {endVote, deleteVote} from '../../../../store/slices/vote/asyncThunk'
import {setFollow} from '../../../../store/slices/profile/asyncThunk'
import profileSlice from '../../../../store/slices/profile'
import {IComponentProps} from './types'
import {RootStackNavigationProp} from '../../../../../types/navigation'
import { setCollectionLike } from '~/store/slices/collection/asyncThunk'
import collectionSlice from '~/store/slices/collection'

function VoteInfo({accountId, collectionId, voteId}: IComponentProps) {
  const navigation = useNavigation<RootStackNavigationProp>()
  const dispatch = useAppDispatch()

  const {userId} = useAppSelector(state => state.user)
  const {currentCollection} = useAppSelector(state => state.collection)
  const {currentVote} = useAppSelector(state => state.vote)
  const isMyList = currentCollection?.user._id === userId

  const actionSheetRef = createRef<ActionSheet>()
  const username = currentCollection?.user?.username
    ? currentCollection.user.username
    : 'No name'

  const openSheet = () => {
    actionSheetRef.current?.show()
  }

  const deleteCurrentVote = useCallback(async () => {
    await dispatch(deleteVote({accountId: accountId, voteId: voteId}))
    navigation.navigate('Home')
  }, [])

  const collectionLike = useCallback(() => {
    dispatch(setCollectionLike({collectionId}))
    dispatch(collectionSlice.actions.changMyLike())
  }, [collectionId])

  const closeVote = useCallback(async () => {
    await dispatch(endVote({accountId: accountId, voteId: voteId}))
    navigation.navigate('Vote', {
      accountId: accountId,
      collectionId: collectionId,
      voteId: voteId,
      isClosed: true,
    })
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
            {currentVote?.title ? currentVote.title : 'Notitle'}
          </Text>
          {/* <Text style={{fontSize: 10, color: '#000000', marginTop: 10}}>
            {currentCollection?.description ?currentCollection.description : 'Notitle'}
          </Text> */}
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
            text={'투표 종료하기'}
            onPress={closeVote}
            fontSize={16}
            paddingVertical={5}
            paddingHorizontal={10}></BaseButton>
        ) : (
          <>
            <BaseButton
              text={`${
                currentCollection.myLiked ? '마음이 취소하기' : '마음에 들어요'
              }`}
              backgroundColor={`${
                currentCollection.myLiked ? '#C4C4C4' : 'default'
              }`}
              onPress={collectionLike}
              paddingVertical={5}
              paddingHorizontal={15}
              ></BaseButton>
          </>
        )}
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
                text={'이 투표 삭제하기'}
                onPress={deleteCurrentVote}
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

export default memo(VoteInfo)
