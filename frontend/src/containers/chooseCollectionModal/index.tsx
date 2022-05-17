import * as React from 'react'
import {memo, useState, useEffect} from 'react'
import {Alert} from 'react-native'

import BaseButton from '../../components/button/base'
import {useAppSelector, useAppDispatch} from '../../store/types'
import {itemToCollection} from '../../store/slices/item/asyncThunk'
import {getUserCollectionList} from '../../store/slices/user/asyncThunk'
import {CollectionState} from '../../store/slices/collection/types'
import {setCollectionId, setSaveCollection} from '../../store/slices/item'
import {ChooseCollectionNavigationProp} from './types'

import {useNavigation} from '@react-navigation/native'
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group'

import {
  CenteredView,
  Background,
  ModalView,
  RadioContainer,
  NormalText,
} from './styles'
import CreateCollection from '../../pages/createCollection'

const radioButtonsData: RadioButtonProps[] = [
  {
    id: 'new', //string
    label: '새 컬렉션 만들기',
    value: 'newCollection',
    selected: false,
    color: '#F9C12E',
  },
]

function ChooseCollectionModal() {
  const dispatch = useAppDispatch()
  const {collections} = useAppSelector(state => state.user)
  const {itemId} = useAppSelector(state => state.item)
  const navigation = useNavigation<ChooseCollectionNavigationProp>()

  const [radioButtons, setRadioButtons] = useState<RadioButtonProps[]>([
    {
      ...radioButtonsData[0],
    },
  ])
  const [selectedValue, setSelectedValue] = useState('')
  const [openCreationForm, setOpenCreationForm] = useState(false)

  useEffect(() => {
    dispatch(getUserCollectionList())
  }, [])

  useEffect(() => {
    if (openCreationForm === false && collections.length > 0) {
      const newButtonData = collections.map((collection: CollectionState) => ({
        id: collection._id,
        label: collection.title,
        value: collection._id,
        color: '#F9C12E',
      }))
      const ButtonData = [{...radioButtonsData[0]}].concat(newButtonData)
      setRadioButtons(ButtonData)
    }
  }, [openCreationForm, collections])

  const onPressRadioButton = (radioButtonsArray: RadioButtonProps[]) => {
    setRadioButtons(radioButtonsArray)
    const selected = radioButtonsArray.filter(
      button => button.selected === true,
    )
    if (selected[0].id === 'new') {
      setOpenCreationForm(true)
    } else {
      setSelectedValue(selected[0].id)
    }
  }

  const submitItemToCollection = () => {
    if (selectedValue) {
      const data = {
        itemId,
        collectionId: selectedValue,
      }
      dispatch(itemToCollection(data))
      dispatch(setSaveCollection('no'))
      dispatch(setCollectionId(selectedValue))
      Alert.alert('저장이 완료되었습니다.')
      navigation.navigate('Default', data)
    } else {
      Alert.alert('컬렉션을 선택해주세요.')
    }
  }

  const onPressBackground = () => {
    dispatch(setSaveCollection('no'))
  }

  return (
    <CenteredView>
      <Background onPress={onPressBackground} />
      <ModalView>
        {openCreationForm ? (
          <CreateCollection
            isModal
            setOpenCreationForm={setOpenCreationForm}></CreateCollection>
        ) : (
          <>
            <NormalText>아이템을 저장할 컬렉션을 선택해주세요.</NormalText>
            <RadioContainer>
              <RadioGroup
                radioButtons={radioButtons}
                onPress={onPressRadioButton}
                containerStyle={{alignItems: 'flex-start'}}></RadioGroup>
            </RadioContainer>
            <BaseButton
              text={'선택된 컬렉션에 아이템 추가하기'}
              onPress={submitItemToCollection}
              borderRadius={25}
              marginVertical={10}
              paddingVertical={15}
            />
          </>
        )}
      </ModalView>
    </CenteredView>
  )
}

export default memo(ChooseCollectionModal)
