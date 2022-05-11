import styled from 'styled-components/native'

export const CenteredView = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,0.5);
`

export const Background = styled.Pressable`
  width: 100%;  
  height: 100%;
  position: absolute;
`

export const ModalView = styled.View`
  width: 80%;
  height: 70%;
  border-radius: 20px;
  background-color: white;
  padding-vertical: 15px;
  padding-horizontal: 20px;
  justify-content: space-between;
`

export const RadioContainer = styled.View`
  height: 70%;
  align-items: flex-start;
  margin-vertical: 10px;
  background-color: palegreen;
`

export const NormalText = styled.Text`
  color: #000000;
  margin-top: 5px;
`