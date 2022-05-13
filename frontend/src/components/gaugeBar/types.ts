import {ColorValue, ViewProps} from 'react-native'

export interface IComponentProps {
  emoji: string
  text: string
  votes: number
  sum: number
  backgroundColor?: ColorValue
}

export interface IBarStyleProps extends ViewProps {
  backgroundColor?: ColorValue
  position?: 'relative' | 'absolute'
  width?: string
}
