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

function CollectionForm({type}: {type: 'create' | 'edit'}) {
  const dispatch = useAppDispatch()
  const collection = useAppSelector(state => state.collection.currentCollection)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

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
      if (type === 'create') {
        dispatch(
          createCollection({
            title,
            description,
            isPublic: true,
          }),
        )
      } else {
        dispatch(
          editCollection({
            accountId: collection!.user!._id,
            collectionId: collection!._id,
            collectionInfo: {
              title,
              description,
              isPublic: true,
            },
          }),
        )
      }
    } catch (error: any) {
      Alert.alert(error.err)
    } finally {
      dispatch(uiSlice.actions.setIsModalOn(false))
    }
  }, [title, description])

  const closeModal = useCallback(() => {
    dispatch(uiSlice.actions.setIsModalOn(false))
  }, [])

  return (
    <KeyboardAwareScrollView style={{paddingHorizontal: 10}}>
      <View style={{marginVertical: 10}}>
        <CustomText>컬렉션의 이름을 적어주세요.</CustomText>
        <BaseTextInput
          value={title}
          onChangeText={titleChanged}
          placeholder={'컬렉션 이름'}
          returnKeyType={'next'}
          maxLength={10}
        />
      </View>
      <View style={{marginVertical: 10}}>
        <CustomText>컬렉션에 대한 설명을 적어주세요.</CustomText>
        <BaseTextInput
          value={description}
          onChangeText={descriptionChanged}
          placeholder={'컬렉션 설명'}
          returnKeyType={'next'}
          maxLength={50}
        />
      </View>
      <BaseButton
        text={`컬렉션 ${type === 'create' ? '생성' : '수정'}하기`}
        onPress={saveCollection}
        marginVertical={10}
        paddingVertical={10}
        borderRadius={5}
        disabled={!title}
      />
      <BaseButton
        text={'돌아가기'}
        onPress={closeModal}
        marginVertical={10}
        paddingVertical={10}
        borderRadius={5}
      />
    </KeyboardAwareScrollView>
  )
}

export default memo(CollectionForm)
