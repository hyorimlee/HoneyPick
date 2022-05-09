import styled from 'styled-components/native'

export const CenteredView = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,0.5);
`

export const ModalView = styled.View`
  width: 80%;
  height: 70%;
  border-radius: 20px;
  background-color: white;
  padding-vertical: 15px;
  padding-horizontal: 15px;
  justify-content: space-between;
`

export const RadioContainer = styled.View`
  align-items: flex-start;
`

export const NormalText = styled.Text`
  color: #000000;
  margin-top: 5px;
`

export const BoldText = styled.Text`
  color: #000000;
  margin-top: 5px;
  font-weight: bold;
`

export const PriceText = styled.Text`
  color: #F9C12E;
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
`