import {ColorValue} from 'react-native'

export interface IComponentProps {
  text: string
  onPress: () => void
  onPressIn?: () => void
  onPressOut?: () => void
  marginHorizontal?: string | number
  marginVertical?: string | number
  paddingHorizontal?: string | number
  paddingVertical?: string | number
  color?: ColorValue
  fontSize?: number
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify'
  backgroundColor?: ColorValue
  borderRadius?: number
  borderWidth?: number
  borderColor?: ColorValue
  flex?: number
  disabled?: boolean
}

export interface IStyleProps {
  marginHorizontal?: string | number
  marginVertical?: string | number
  paddingHorizontal?: string | number
  paddingVertical?: string | number
  color?: ColorValue
  fontSize?: number
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify'
  backgroundColor?: ColorValue
  borderRadius?: number
  borderWidth?: number
  borderColor?: ColorValue
  flex?: number
  disabled?: boolean
}