import styled from 'styled-components/native'
import {IStylePressableProps, IStyleTextProps} from './types'

export const CustomButton = styled.Pressable.attrs(
  (props: IStylePressableProps) => {},
)``

export const CustomText = styled.Text.attrs((props: IStyleTextProps) => {})`
  color: ${props => (props.color ? 'white' : '#F9C12E')};
`
