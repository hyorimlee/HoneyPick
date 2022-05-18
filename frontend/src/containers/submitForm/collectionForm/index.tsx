import * as React from 'react'
import {memo, useCallback, useState} from 'react'
import {Alert, View} from 'react-native'
import BaseTextInput from '../../../components/textInput/base/index'
import BaseButton from '../../../components/button/base/index'
import {useAppDispatch, useAppSelector} from '../../../store/types'
import {
  createCollection,
  editCollection,
} from '../../../store/slices/collection/asyncThunk'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {CustomText} from './styles'
import uiSlice from '~/store/slices/ui'
import {getLists} from '~/store/slices/profile/asyncThunk'

function CollectionForm() {
  const dispatch = useAppDispatch()
  const {userId} = useAppSelector(state => state.user)
  const {isModal} = useAppSelector(state => state.ui)
  const {currentCollection} = useAppSelector(state => state.collection)
  const [title, setTitle] = useState(
    isModal === 'editCollection' ? currentCollection!.title : '',
  )
  const [description, setDescription] = useState(
    isModal === 'editCollection' ? currentCollection!.description : '',
  )

  const titleChanged = useCallback(
    (text: string) => {
      setTitle(text)
    },
    [title],
  )

  const descriptionChanged = useCallback(
    (text: string) => {
      setDescription(text)
    },
    [description],
  )

  const saveCollection = useCallback(() => {
    if (title.length === 0) {
      return Alert.alert('제목을 1자 이상 입력해주세요.')
    }

    try {
      if (isModal.toString().toLowerCase().includes('createcollection')) {
        dispatch(
          createCollection({
            title,
            description,
            isPublic: true,
          }),
        )
          .unwrap()
          .then(() => {
            dispatch(getLists({accountId: userId}))
              .unwrap()
              .then(() => {
                isModal === 'clipboardCreateCollection'
                  ? dispatch(uiSlice.actions.setIsModal('clipboard'))
                  : dispatch(uiSlice.actions.setIsModal(false))
              })
          })
      } else if (isModal === 'editCollection') {
        dispatch(
          editCollection({
            accountId: currentCollection!.user._id,
            collectionId: currentCollection!._id,
            collectionInfo: {
              title,
              description,
              isPublic: true,
            },
          }),
        )
          .unwrap()
          .then(() => {
            dispatch(uiSlice.actions.setIsModal(false))
          })
      }
    } catch (error: any) {
      Alert.alert(error.err)
    }
  }, [title, description])

  const closeModal = useCallback(() => {
    isModal === 'clipboardCreateCollection'
      ? dispatch(uiSlice.actions.setIsModal('clipboard'))
      : dispatch(uiSlice.actions.setIsModal(false))
  }, [])

  return (
    <KeyboardAwareScrollView>
      <View>
        <CustomText>컬렉션의 이름을 적어주세요.</CustomText>
        <BaseTextInput
          value={title}
          onChangeText={titleChanged}
          placeholder={'컬렉션 이름'}
          returnKeyType={'next'}
          maxLength={10}
        />
      </View>
      <View style={{marginBottom: 30}}>
        <CustomText style={{marginTop: 20}}>
          컬렉션에 대한 설명을 적어주세요.
        </CustomText>
        <BaseTextInput
          value={description}
          onChangeText={descriptionChanged}
          placeholder={'컬렉션 설명'}
          returnKeyType={'next'}
          maxLength={50}
        />
      </View>
      <BaseButton
        text={`컬렉션 ${
          isModal.toString().toLowerCase().includes('createcollection')
            ? '생성'
            : '수정'
        }하기`}
        onPress={saveCollection}
        marginVertical={10}
        paddingVertical={10}
        borderRadius={5}
        disabled={!title}
      />
      <BaseButton
        text={'돌아가기'}
        onPress={closeModal}
        paddingVertical={10}
        borderRadius={5}
      />
    </KeyboardAwareScrollView>
  )
}

export default memo(CollectionForm)
