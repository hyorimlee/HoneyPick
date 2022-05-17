import * as React from 'react'
import {memo, useCallback} from 'react'
import {useAppDispatch, useAppSelector} from '../../store/types'
import BaseButton from '../button/base'
import {saveItem} from '../../store/slices/item/asyncThunk'
import {Container} from './styles'
import {IComponentProps} from './types'
import {TouchableWithoutFeedback} from 'react-native'
import uiSlice from '~/store/slices/ui'

function saveItemBtn({copiedUrl, btnShowHandler}: IComponentProps) {
  const dispatch = useAppDispatch()

  const submitItem = useCallback(() => {
    dispatch(saveItem(copiedUrl))
    dispatch(uiSlice.actions.setIsModal('clipboard'))
    btnShowHandler()
  }, [copiedUrl])

  return (
    <TouchableWithoutFeedback onPress={btnShowHandler}>
      <Container>
        <BaseButton
          text={'링크 복사된 아이템 추가하기'}
          onPress={submitItem}
          borderRadius={25}
          marginVertical={10}
          marginHorizontal={30}
          paddingVertical={15}
          position="absolute"
          width="100%"
          bottom="8%"
        />
      </Container>
    </TouchableWithoutFeedback>
  )
}

export default memo(saveItemBtn)
