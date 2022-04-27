import * as React from 'react'
import {memo} from 'react'
import {Text, View} from 'react-native'
import {IComponentProps} from './types'
import {CustomBaseButtonPressable} from './styles'

function BaseButton({
  text,
  onPress,
  onPressIn,
  onPressOut,
  marginHorizontal,
  marginVertical,
  paddingHorizontal,
  paddingVertical,
  color = '#ffffff',
  fontSize,
  textAlign = 'center',
  backgroundColor = '#F9C12E',
  borderRadius = 20,
  borderWidth,
  borderColor,
  flex,
  disabled,
}: IComponentProps) {
  return (
    <CustomBaseButtonPressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      hitSlop={5}
      pressRetentionOffset={0}
      marginHorizontal={marginHorizontal}
      marginVertical={marginVertical}
      paddingHorizontal={paddingHorizontal}
      paddingVertical={paddingVertical}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      borderWidth={borderWidth}
      borderColor={borderColor}
      flex={flex}
      disabled={disabled}>
      <Text style={{textAlign, color, fontSize}}>{text}</Text>
    </CustomBaseButtonPressable>
  )
}

export default memo(BaseButton)
