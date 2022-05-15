import * as React from 'react'
import {memo, useState, useCallback} from 'react'
import {Text} from 'react-native'
import {IProps} from './types'
import {CustomButton, CustomText} from './styles'

function SelectButton({text, onPress}: IProps) {
  const [isSelect, setIsSelect] = useState(false)

  const press = useCallback(() => {
    setIsSelect(!isSelect)
    onPress()
  }, [onPress])

  return (
    <CustomButton
      onPress={press}
      borderRadius={25}
      paddingVertical={5}
      paddingHorizontal={15}
      marginLeft={5}
      marginVertical={3}
      backgroundColor={isSelect ? '#F9C12E' : 'white'}
      borderColor={isSelect ? '' : '#F9C12E'}
      borderWidth={1.5}>
      <CustomText color={isSelect}>{text}</CustomText>
    </CustomButton>
  )
}

export default memo(SelectButton)
