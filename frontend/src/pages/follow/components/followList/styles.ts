import styled from 'styled-components/native'

export const CustomFlatList = styled.FlatList`
  padding-horizontal: 10px;
  margin-bottom: 20px;
`

export const HorizontalContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: 10px;
  margin-horizontal: 20px;
`

export const ProfileImage = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 100px;
  resize-mode: contain;
  background-color: black;
`

export const ButtonContainer = styled.View`
  position: absolute;
  right: 0;
`

export const Nickname = styled.Text`
  font-weight: 600;
  color: #000000;
`

export const Description = styled.Text`
  font-size: 12px;
  color: #000000;
`