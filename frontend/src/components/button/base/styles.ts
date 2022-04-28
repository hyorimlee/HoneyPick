import styled from 'styled-components/native'
import {CustomBaseTextInput} from '../../TextInput/Base/styles'
import {IStyleProps} from './types'

const CustomBaseButtonPressable = styled.Pressable.attrs(
  (props: IStyleProps) => {},
)`
  justify-content: center;
`

export {CustomBaseButtonPressable}
