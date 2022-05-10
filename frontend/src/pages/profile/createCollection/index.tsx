import * as React from 'react'
import {memo, useCallback, useRef, useState} from 'react'
import {Text, View} from 'react-native'
import BaseTextInput from '../../../components/textInput/base/index'
import BaseButton from '../../../components/button/base/index'
import {useAppDispatch, useAppSelector} from '../../../store/types'
import { createCollection } from '../../../store/slices/collection/asyncThunk'
import { useNavigation } from '@react-navigation/native'
import { ProfileNavigationProp } from '../../../containers/profileInfo/types'

function CreateCollection({isModal, setOpenCreationForm}: {isModal?: boolean, setOpenCreationForm?: React.Dispatch<React.SetStateAction<boolean>>}) {
  const navigation = useNavigation<ProfileNavigationProp>()
  const dispatch = useAppDispatch()
  const userId = useAppSelector(state => state.user.userId)
  const [collectionName, setCollectionName] = useState('')
  const [collectionDescription, setCollectionDescription] = useState('')

  const collectionNameChanged = useCallback(
    (text: string) => {
      setCollectionName(text)
    },
    [collectionName],
  )

  const collectionDescChanged = useCallback(
    (text: string) => {
      setCollectionDescription(text)
    },
    [collectionDescription],
  )

  const createNewCollection = useCallback(async () => {
    await dispatch(createCollection({title: collectionName, description: collectionDescription, isPublic: true}))
    if (isModal && setOpenCreationForm) {
      setOpenCreationForm(false)
    } else {
      navigation.push('Default', {userId})
    }
  }, [collectionName, collectionDescription])

  return (
    <View style={{paddingHorizontal:20}}>
      <Text style={{fontWeight:'bold'}}>생성할 컬렉션의 이름을 적어주세요</Text>
      <BaseTextInput
        value={collectionName}
        onChangeText={collectionNameChanged}
        placeholder={'컬렉션 이름'}
        returnKeyType={'next'}
        maxLength={10}
      />
      <Text style={{fontWeight:'bold'}}>컬렉션에 대한 설명이 있나요?</Text>
      <BaseTextInput
        value={collectionDescription}
        onChangeText={collectionDescChanged}
        placeholder={'컬렉션에 대한 설명'}
        returnKeyType={'next'}
        maxLength={50}
      />
      <BaseButton
        text={'컬렉션 생성하기'}
        onPress={createNewCollection}
        marginVertical={10}
        paddingVertical={10}
        borderRadius={5}
        disabled={!collectionName}
      />
      {isModal && setOpenCreationForm ? <BaseButton
        text={'돌아가기'}
        onPress={() => setOpenCreationForm(false)}
        marginVertical={10}
        paddingVertical={10}
        borderRadius={5}
      /> : null}
    </View>
  )
}

export default memo(CreateCollection)
