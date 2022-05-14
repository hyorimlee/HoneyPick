import styled from 'styled-components/native'
import {ICustomTextProps} from './types'

export const Container = styled.View`
  padding: 30px;
`

export const Background = styled.ImageBackground`
  width: 100%;
  height: 100%;
`

export const HorizontalContainer = styled.View`
  margin-top: 40px;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: space-evenly;
`
export const TotalView = styled.View`
  align-items: flex-end;
  margin-horizontal: 35px;
`

export const CustomText = styled.Text`
  font-weight: 600;
  color: ${(props: ICustomTextProps) => (props.selected ? '#F9C12E' : 'black')};
`
