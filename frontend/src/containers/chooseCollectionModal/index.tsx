import * as React from 'react'
import {memo, useState, useEffect} from 'react'
import {View} from 'react-native'

import BaseButton from '../../components/button/base'
import {itemToCollection} from '../../store/slices/item/asyncThunk'
import {useAppSelector} from '../../store/types'

import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group'

import {
  CenteredView,
  ModalView,
  RadioContainer,
  NormalText,
  BoldText,
  PriceText,
} from './styles'

const radioButtonsData: RadioButtonProps[] = [
  {
    id: '1', //string이어야 함
    label: '새 컬렉션 만들기ㅇㄹㅇㄹㅇㄹㅇㄹ',
    value: 'option 1',
    color: '#F9C12E',
  },
  {
    id: '2',
    label: '왜',
    value: 'option 2',
    color: '#F9C12E',
  },
]

function ChooseCollectionModal() {
  const {itemId, saveCollection} = useAppSelector(state => state.item)
  const [radioButtons, setRadioButtons] =
    useState<RadioButtonProps[]>(radioButtonsData)
  const [selectedValue, setSelectedValue] = useState<string>('')

  const onPressRadioButton = (radioButtonsArray: RadioButtonProps[]) => {
    setRadioButtons(radioButtonsArray)
  }

  useEffect(() => {
    // console.log(radioButtons)
    const selected = radioButtons.filter(button => button.selected === true)
    console.log(selected)
    if (selected.length > 0) {
      setSelectedValue(selected[0].id)
    }
  }, [radioButtons])

  return (
    <CenteredView>
      <ModalView>
        <NormalText>아이템을 저장할 컬렉션을 선택해주세요.</NormalText>
        <RadioContainer>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={onPressRadioButton}></RadioGroup>
        </RadioContainer>
        <BaseButton
          text={'선택된 컬렉션에 아이템 추가하기'}
          onPress={() => itemToCollection({itemId})}
          borderRadius={25}
          marginVertical={10}
          paddingVertical={15}
        />
      </ModalView>
    </CenteredView>
  )
}

export default memo(ChooseCollectionModal)
