import * as React from 'react'
import {memo, useCallback, useState} from 'react'
import {Text} from 'react-native'
import {IComponentProps} from './types'
import {CustomBaseButtonPressable} from './styles'

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
  fontSize = 16,
  textAlign = 'center',
  backgroundColor = 'default',
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
        disabled || backgroundColor === '#C4C4C4'
          ? '#C4C4C4' // 비활성화
          : backgroundColor === 'default'
          ? isPressing
            ? '#FFD669' // 활성화 기본 색상 누르는 중
            : '#F9C12E' // 활성화 기본 색상
          : isPressing
          ? '#FFF9E9' // 활성화 흰색 누르는 중
          : 'white' // 활성화 흰색
      }
      borderRadius={borderRadius}
      borderWidth={borderWidth}
      borderColor={borderColor}
      flex={flex}
      disabled={disabled}
      position={position}
      bottom={bottom}
      width={width}>
      <Text style={{textAlign, color, fontSize}}>{text}</Text>
    </CustomBaseButtonPressable>
  )
}

export default memo(BaseButton)

// 배경색 흰색
