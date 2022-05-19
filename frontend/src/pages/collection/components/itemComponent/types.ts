import {ColorValue} from 'react-native'

export interface IComponentProps {
  text: string
  price: string | number
  uri: string | undefined
  isRecommend: number
  onPress: () => void
  marginHorizontal?: string | number
  marginVertical?: string | number
  paddingHorizontal?: string | number
  paddingVertical?: string | number
  color?: ColorValue
  fontSize?: number
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify'
  backgroundColor?: ColorValue
  borderRadius?: number
  borderWidth?: number
  borderColor?: ColorValue
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
