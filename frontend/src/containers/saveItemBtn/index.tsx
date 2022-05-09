import * as React from 'react'
import {memo} from 'react'
import {useAppDispatch} from '../../store/types'

import BaseButton from '../../components/button/base'
import {saveItem} from '../../store/slices/item/asyncThunk'
import {setSaveCollection} from '../../store/slices/item'

import {Container} from './styles'
import {IComponentProps} from './types'
import {TouchableWithoutFeedback} from 'react-native'

function saveItemBtn({copiedUrl, setCopiedUrl, btnShowHandler}: IComponentProps) {
  const dispatch = useAppDispatch()

  const submitItem = (text: string) => {
    dispatch(saveItem(text))
    // dispatch(setSaveCollection('yet'))
    console.log('아이템 등록')
    setCopiedUrl('')
  }

  return (
    <TouchableWithoutFeedback onPress={btnShowHandler}>
        <Container>
          <BaseButton
            text={'링크 복사된 아이템 추가하기'}
            onPress={() => submitItem(copiedUrl)}
            borderRadius={25}
            marginVertical={10}
            marginHorizontal={30}
            paddingVertical={15}
            position='absolute'
            width='100%'
            bottom='8%'
          />
        </Container>
    </TouchableWithoutFeedback>
  )
}

export default memo(saveItemBtn)