import * as React from 'react'
import {memo, useCallback, useState} from 'react'
import {Text} from 'react-native'
import {IComponentProps} from './types'
import {CustomBaseButtonPressable} from './styles'
import {useAppDispatch, useAppSelector} from '../../../store/types'
import uiSlice from '../../../store/slices/ui'

function BaseButton({
  text,
  onPress,
  onPressIn,
  onPressOut,
  marginHorizontal,
  marginVertical,
  marginLeft,
  paddingHorizontal,
  paddingVertical,
  color = '#ffffff',
  fontSize,
  textAlign = 'center',
  backgroundColor,
  borderRadius = 20,
  borderWidth,
  borderColor,
  flex,
  disabled,
  position,
  bottom,
  width,
}: IComponentProps) {
  const [isPressing, setIsPressing] = useState(false)

  const pressIn = useCallback(() => {
    setIsPressing(true)
    if (onPressIn) {
      onPressIn()
    }
  }, [onPressIn])

  const pressOut = useCallback(() => {
    setIsPressing(false)
    if (onPressOut) {
      onPressOut()
    }
  }, [onPressOut])

  const press = useCallback(() => {
    setIsPressing(false)
    onPress()
  }, [onPress])

  return (
    <CustomBaseButtonPressable
      onPress={press}
      onPressIn={pressIn}
      onPressOut={pressOut}
      hitSlop={5}
      pressRetentionOffset={0}
      marginHorizontal={marginHorizontal}
      marginVertical={marginVertical}
      marginLeft={marginLeft}
      paddingHorizontal={paddingHorizontal}
      paddingVertical={paddingVertical}
      backgroundColor={
        backgroundColor || disabled
          ? '#C4C4C4'
          : isPressing
          ? '#FFD669'
          : '#F9C12E'
      }
      borderRadius={borderRadius}
      borderWidth={borderWidth}
      borderColor={borderColor}
      flex={flex}
      disabled={disabled}
      position={position}
      bottom={bottom}
      width={width}
      >
      <Text style={{textAlign, color, fontSize}}>{text}</Text>
    </CustomBaseButtonPressable>
  )
}

export default memo(BaseButton)
