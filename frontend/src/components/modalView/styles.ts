import styled from 'styled-components/native'

export const Screen = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`

export const Background = styled.Pressable`
  width: 100%;
  height: 100%;
  position: absolute;
`

export const Modal = styled.View`
  width: 80%;
  max-height: 70%;
  border-radius: 20px;
  background-color: white;
  padding-vertical: 15px;
  padding-horizontal: 20px;
  justify-content: space-between;
  overflow: scroll;
`
