import {ColorValue} from 'react-native'

export interface IProps {
  text: string
  onPress: () => void
}

export interface IStylePressableProps {
  borderRadius: number
  paddingVertical: string
  paddingHorizontal: string
  marginLeft: string
  marginVertical: string
  backgroundColor: ColorValue
  borderColor: ColorValue
  borderWidth: number
}

export interface IStyleTextProps {
  color: string
}
