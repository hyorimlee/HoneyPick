import * as React from 'react'
import {memo, useState, useCallback, useEffect} from 'react'
import {Text} from 'react-native'
import {IProps} from './types'
import {CustomButton, CustomText} from './styles'

function SelectButton({text, onPress, selected}: IProps) {
  // const [isSelect, setIsSelect] = useState(false)

  // useEffect(() => {
  //   if (!selected) {
  //     setIsSelect(false)
  //   }
  // }, [selected])

  const press = useCallback(() => {
    // setIsSelect(!isSelect)
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
      backgroundColor={selected ? '#F9C12E' : 'white'}
      borderColor={selected ? '' : '#F9C12E'}
      borderWidth={1.5}>
      <CustomText color={selected}>{text}</CustomText>
    </CustomButton>
  )
}

export default memo(SelectButton)
