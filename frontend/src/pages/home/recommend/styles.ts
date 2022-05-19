import styled from 'styled-components/native'

const Container = styled.ScrollView`
  padding-vertical: 30px;
`

const CollectionContainer = styled.TouchableOpacity`
  border-radius: 10px;
  background-color: #c4c4c4;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 30px;
`

const ImageContainer = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 10px;
  border-radius: 10px;
  border-color: #c4c4c4;
  border-width: 1px;
`

const ItemBox = styled.View`
  width: 100px;
  margin-right: 40px;
  margin-bottom: 40px;
`

const SearchBarContainer = styled.View``

const SlideContainer = styled.ScrollView``

const InfoContainer = styled.View``

const ItemContainer = styled.View``

const ItemPageContainer = styled.ImageBackground``

const NormalText = styled.Text`
  font-size: 14px;
  color: black;
`

const BoldText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: black;
`

export {
  Container,
  CollectionContainer,
  SearchBarContainer,
  SlideContainer,
  ItemContainer,
  NormalText,
  BoldText,
  InfoContainer,
  ImageContainer,
  ItemBox,
  ItemPageContainer,
}
