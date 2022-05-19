import * as React from 'react'
import {memo, useState, useCallback} from 'react'
import {Alert, Text} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import BaseTextInput from '~/components/textInput/base/index'
import BaseButton from '~/components/button/base/index'
import {useAppDispatch, useAppSelector} from '~/store/types'
import {useNavigation} from '@react-navigation/native'
import {CollectionNavigationProp} from '~/pages/collection/types'
import {createVote} from '~/store/slices/vote/asyncThunk'
import uiSlice from '~/store/slices/ui'

function VoteForm() {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<CollectionNavigationProp>()
  const collection = useAppSelector(state => state.collection.currentCollection)
  const [voteTitle, setVoteTitle] = useState('')
  // const [isPublic, setIsPublic] = useState(true)

  const voteTitleChanged = useCallback(
    (text: string) => {
      setVoteTitle(text)
    },
    [voteTitle],
  )

  // const changeIsPublic = useCallback(() => {
  //   setIsPublic(!isPublic)
  // }, [isPublic])

  const openVote = useCallback(() => {
    dispatch(
      createVote({
        collectionId: collection!._id,
        title: voteTitle,
        isPublic: true,
      }),
    )
      .unwrap()
      .then(() =>
        Alert.alert('투표가 시작되었습니다.', undefined, [
          {
            text: '확인',
            onPress: () => dispatch(uiSlice.actions.setIsModal(false)),
          },
        ]),
      )
  }, [voteTitle])

  return (
    <KeyboardAwareScrollView>
      <Text style={{fontWeight: 'bold'}}>시작될 투표의 제목을 적어주세요</Text>
      <BaseTextInput
        value={voteTitle}
        onChangeText={voteTitleChanged}
        placeholder={'어떤 주제로 투표하실 건가요?'}
        returnKeyType={'next'}
        maxLength={20}
      />
      {/* <BaseButton
        text={isPublic ? '비공개로 투표하기' : '공개 투표하기'}
        onPress={changeIsPublic}
        marginVertical={10}
        paddingVertical={10}
        borderRadius={5}
        disabled={!voteTitle}
      /> */}
      <BaseButton
        text={'투표 시작하기'}
        onPress={openVote}
        marginVertical={10}
        paddingVertical={10}
        borderRadius={5}
        disabled={!voteTitle}
      />
    </KeyboardAwareScrollView>
  )
}

export default memo(VoteForm)
