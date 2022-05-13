import styled from 'styled-components/native'
import { IBarStyleProps } from './types'

const Container = styled.View`
  margin-vertical: 3px;
`

const Bar = styled.View.attrs((props: IBarStyleProps) => {})`
  height: 30px;
  border-radius: 5px;
`

const TextContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 10px;
`

const DescConatiner = styled.View`
  flex-direction: row;
  align-items: center;
`

const Emoji = styled.Text`
  font-size: 16px;
`

const Description = styled.Text`
  color: #000000;
  font-size: 12px;
  font-weight: bold;
  padding-left: 10px;
`

const Count = styled.Text`
  color: #000000;
  font-size: 12px;
  font-weight: bold;
`

export {Container, Bar, TextContainer, DescConatiner, Emoji, Description, Count}