import styled from 'styled-components/native'
import {IStyleProps} from './types'

const ItemComponentContainer = styled.Pressable.attrs(
  (props: IStyleProps) => {},
)`
  justify-content: flex-start;
  margin-bottom: 20px;
  margin-horizontal: 2%;
  width: 29%;
`

const ItemInfoContainer = styled.View`
  flex-direction: row;
  justify-contents: flex-end;
`

export {ItemComponentContainer, ItemInfoContainer}
