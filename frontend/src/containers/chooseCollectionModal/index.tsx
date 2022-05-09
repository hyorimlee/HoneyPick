import * as React from 'react'
import {memo, useState, useEffect} from 'react'

import BaseButton from '../../components/button/base'
import {useAppSelector, useAppDispatch} from '../../store/types'
import {itemToCollection} from '../../store/slices/item/asyncThunk'
import {getUserCollectionList} from '../../store/slices/user/asyncThunk'
import {CollectionState} from '../../store/slices/collection/types'
import {setSaveCollection} from '../../store/slices/item'

import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group'

import {CenteredView, ModalView, RadioContainer, NormalText} from './styles'
import CreateCollection from '../../pages/profile/createCollection'

const radioButtonsData: RadioButtonProps[] = [
  {
    id: 'new', //string이어야 함
    label: '새 컬렉션 만들기',
    value: 'newCollection',
    selected: false,
    color: '#F9C12E'
  }
]

function ChooseCollectionModal() {
  const dispatch = useAppDispatch()
  const {collections} = useAppSelector(state => state.user)
  const {itemId} = useAppSelector(state => state.item)
  
  const [radioButtons, setRadioButtons] = useState<RadioButtonProps[]>(radioButtonsData)
  const [selectedValue, setSelectedValue] = useState<string>('')
  const [openCreationForm, setOpenCreationForm] = useState<boolean>(false)

  useEffect(() => {
    dispatch(getUserCollectionList())
    .unwrap()
    .then(res => {
      const newButtonData = collections.map((collection: CollectionState) => ({
        id: collection._id,
        label: collection.title,
        value: collection._id,
        color: '#F9C12E'
      }))
      const ButtonData = radioButtonsData.concat(newButtonData)
      setRadioButtons(ButtonData)
    })
  }, [openCreationForm])

  const onPressRadioButton = (radioButtonsArray: RadioButtonProps[]) => {
    setRadioButtons(radioButtonsArray)
    const selected = radioButtonsArray.filter(button => button.selected === true)
    if (selected[0].id === 'new') {
      setOpenCreationForm(true)
    } else {
      setSelectedValue(selected[0].id)
    }
  }

  const submitItemToCollection = () => {
    const data = {
      itemId,
      collectionId: selectedValue
    }
    dispatch(itemToCollection(data))
    dispatch(setSaveCollection('done'))
  }

  return (
    <CenteredView>
      <ModalView>
        {openCreationForm ? <CreateCollection isModal setOpenCreationForm={setOpenCreationForm}></CreateCollection> :
        <>
          <NormalText>아이템을 저장할 컬렉션을 선택해주세요.</NormalText>
          <RadioContainer>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={onPressRadioButton}
            ></RadioGroup>
          </RadioContainer>
          <BaseButton
            text={'선택된 컬렉션에 아이템 추가하기'}
            onPress={() => submitItemToCollection()}
            borderRadius={25}
            marginVertical={10}
            paddingVertical={15}
          />
        </>
        }
      </ModalView>
    </CenteredView>
  )
}

export default memo(ChooseCollectionModal)