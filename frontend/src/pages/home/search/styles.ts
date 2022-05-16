import styled from 'styled-components/native'

const Container = styled.ScrollView`
  padding-top: 5px;
  padding-bottom: 50px;
  padding-horizontal: 30px;
`

const SearchBarContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: #F9C12E;
  padding-horizontal: 30px;
  margin-vertical: 20px;
  border-radius: 100px;
`

const BoldText = styled.Text`
  color: #000000;
  margin-top: 5px;
  font-size: 14px;
  font-weight: bold;
`

export {Container, SearchBarContainer, BoldText}
