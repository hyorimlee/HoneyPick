import styled from 'styled-components/native'
import {IStyleProps} from './types'

const ItemComponentContainer = styled.Pressable.attrs(
  (props: IStyleProps) => {},
)`
  justify-content: center;
  width: 30%;
`

export {ItemComponentContainer}
