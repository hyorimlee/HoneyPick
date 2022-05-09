import * as React from 'react'
import {memo, useCallback, useRef, useState, useMemo} from 'react'
import {Text, View} from 'react-native'
import BaseTextInput from '../../../components/textInput/base/index'
import BaseButton from '../../../components/button/base/index'
import {useAppDispatch} from '../../../store/types'
import { editCollection } from '../../../store/slices/collection/asyncThunk'
import { useNavigation } from '@react-navigation/native'
import { CollectionNavigationProp } from '../types'
import { useAppSelector } from '../../../store/types'

function EditCollection() {
  const navigation = useNavigation<CollectionNavigationProp>()
  const dispatch = useAppDispatch()
  const [collectionName, setCollectionName] = useState('')
  const [collectionDescription, setCollectionDescription] = useState('')
  const {userId} = useAppSelector(state => state.user)

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

  const editCollectionInfo = useCallback(async () => {
    await dispatch(editCollection({accountId: userId, collectionId:1 , collectionInfo: {title: collectionName, description: collectionDescription, isPublic: true}}))
    navigation.push('Default')
  }, [collectionName, collectionDescription])

  return (
    <View style={{paddingHorizontal:20}}>
      <Text style={{fontWeight:'bold'}}>변경될 컬렉션의 이름을 적어주세요</Text>
      <BaseTextInput
        value={collectionName}
        onChangeText={collectionNameChanged}
        placeholder={'컬렉션 이름'}
        returnKeyType={'next'}
        maxLength={10}
      />
      <Text style={{fontWeight:'bold'}}>변경될 컬렉션에 대한 설명이 있나요?</Text>
      <BaseTextInput
        value={collectionDescription}
        onChangeText={collectionDescChanged}
        placeholder={'컬렉션에 대한 설명'}
        returnKeyType={'next'}
        maxLength={50}
      />
      <BaseButton
        text={'컬렉션 생성하기'}
        onPress={editCollectionInfo}
        marginVertical={10}
        paddingVertical={10}
        borderRadius={5}
        disabled={!collectionName}
      />
    </View>
  )
}

export default memo(EditCollection)
