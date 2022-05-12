import styled from 'styled-components/native'
import {ICustomTextProps} from './types'

export const Container = styled.View``

export const HorizontalContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
`
export const TotalView = styled.View`
  align-items: flex-end;
`

export const CustomText = styled.Text`
  color: ${(props: ICustomTextProps) => (props.selected ? '#F9C12E' : 'black')};
`
