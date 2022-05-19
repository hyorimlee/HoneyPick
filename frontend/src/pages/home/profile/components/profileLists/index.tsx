import * as React from 'react'
import {memo, useCallback} from 'react'
import {View} from 'react-native'
import HorizontalList from '~/components/flatList/horizontalList'
import BaseButton from '~/components/button/base'
import {useAppDispatch, useAppSelector} from '~/store/types'
import {
  CollectionHorizontalView,
  CustomActivityIndicator,
  DivisionContainer,
  DivisionText,
} from './styles'
import uiSlice from '~/store/slices/ui'

function ProfileLists() {
  const dispatch = useAppDispatch()
  const {collections, likes, votes} = useAppSelector(state => state.profile)
  const {userId} = useAppSelector(state => state.profile)
  const myUserId = useAppSelector(state => state.user.userId)

  const addCollection = useCallback(() => {
    dispatch(uiSlice.actions.setIsModal('createCollection'))
  }, [])

  return (
    <View>
      <DivisionContainer>
        <CollectionHorizontalView>
          <DivisionText>컬렉션</DivisionText>
          {myUserId === userId ? (
            <BaseButton
              text="추가하기"
              onPress={addCollection}
              paddingVertical={5}
              paddingHorizontal={20}
              fontSize={16}
            />
          ) : null}
        </CollectionHorizontalView>
      </DivisionContainer>
      {collections ? (
        <HorizontalList data={collections} title={'컬렉션'} />
      ) : (
        <CustomActivityIndicator />
      )}
      <DivisionContainer>
        <DivisionText>진행한 투표</DivisionText>
      </DivisionContainer>
      {votes ? (
        <HorizontalList data={votes} title={'진행한 투표'} />
      ) : (
        <CustomActivityIndicator />
      )}
      <DivisionContainer>
        <DivisionText>마음에 든 컬렉션</DivisionText>
      </DivisionContainer>
      {likes ? (
        <HorizontalList data={likes} title={'찜한 컬렉션'} />
      ) : (
        <CustomActivityIndicator />
      )}
    </View>
  )
}

export default memo(ProfileLists)
