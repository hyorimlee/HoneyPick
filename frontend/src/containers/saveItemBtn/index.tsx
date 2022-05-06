import * as React from 'react'
import {memo} from 'react'
import {useAppSelector, useAppDispatch} from '../../store/types'

import BaseButton from '../../components/button/base'
import {saveItem} from '../../store/slices/item'

import {Container} from './styles'

function saveItemBtn() {
  const dispatch = useAppDispatch()
  const {copiedUrl} = useAppSelector(state => state.item)

  const submitItem = (text: string) => {
    dispatch(saveItem(text))
    console.log('아이템 등록')
  }

  return (
    <Container>
      <BaseButton
        text={'링크 복사된 아이템 추가하기'}
        onPress={() => submitItem(copiedUrl)}
        borderRadius={25}
        marginVertical={10}
        marginHorizontal={30}
        paddingVertical={15}
      />
    </Container>
  )
}

export default memo(saveItemBtn)