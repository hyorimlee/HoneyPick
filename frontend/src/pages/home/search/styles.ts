import styled from 'styled-components/native'

const Container = styled.ScrollView`
  padding-bottom: 50px;
  padding-horizontal: 30px;
`

const SearchBarImage = styled.ImageBackground`
  margin-vertical: 20px;
  width: 100%;
  height: 100%;
  flex: 1;
`

const SearchBarContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const BoldText = styled.Text`
  color: #000000;
  margin-top: 5px;
  font-size: 16px;
  font-weight: bold;
`

export {Container, SearchBarImage, SearchBarContainer, BoldText}
