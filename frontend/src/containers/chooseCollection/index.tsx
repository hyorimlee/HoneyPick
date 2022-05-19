import * as React from 'react'
import {memo, useState, useEffect} from 'react'
import {Alert, Text} from 'react-native'
import BaseButton from '../../components/button/base'
import {useAppSelector, useAppDispatch} from '../../store/types'
import {itemToCollection} from '../../store/slices/item/asyncThunk'
import {getUserCollectionList} from '../../store/slices/user/asyncThunk'
import {CollectionState} from '../../store/slices/collection/types'
import {setCollectionId} from '../../store/slices/item'
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group'
import {RadioContainer, NormalText} from './styles'
import uiSlice from '~/store/slices/ui'

const radioButtonsData: RadioButtonProps[] = [
  {
    id: 'new', //string
    label: <Text style={{color: '#000000'}}>새 컬렉션 만들기</Text>,
    value: 'newCollection',
    selected: false,
    color: '#F9C12E',
  },
]

function ChooseCollection() {
  const dispatch = useAppDispatch()
  const {isModal} = useAppSelector(state => state.ui)
  const {collections} = useAppSelector(state => state.user)
  const {itemId} = useAppSelector(state => state.item)

  const [radioButtons, setRadioButtons] = useState<RadioButtonProps[]>([
    {
      ...radioButtonsData[0],
    },
  ])
  const [selectedValue, setSelectedValue] = useState('')

  useEffect(() => {
    if (isModal === 'clipboard') {
      dispatch(getUserCollectionList())
    }
  }, [isModal])

  useEffect(() => {
    if (collections.length === 0) {
      return
    }

    const newButtonData = collections.map((collection: CollectionState) => ({
      id: collection._id,
      label: <Text style={{color: '#000000'}}>{collection.title}</Text>,
      value: collection._id,
      color: '#F9C12E',
    }))
    const ButtonData = [{...radioButtonsData[0]}].concat(newButtonData)
    setRadioButtons(ButtonData)
  }, [collections])

  const onPressRadioButton = (radioButtonsArray: RadioButtonProps[]) => {
    setRadioButtons(radioButtonsArray)
    const selected = radioButtonsArray.filter(
      button => button.selected === true,
    )

    if (selected[0].id === 'new') {
      dispatch(uiSlice.actions.setIsModal('clipboardCreateCollection'))
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
        .unwrap()
        .then(() => {
          Alert.alert('저장이 완료되었습니다.', undefined, [
            {
              text: '확인',
              onPress: () => {
                dispatch(uiSlice.actions.setIsModal(false))
                dispatch(setCollectionId(selectedValue))
              },
            },
          ])
        })
    } else {
      Alert.alert('컬렉션을 선택해주세요.')
    }
  }

  return (
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
  )
}

export default memo(ChooseCollection)
