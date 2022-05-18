import styled from 'styled-components/native'

const Container = styled.ScrollView`
  padding-top: 5px;
  padding-bottom: 50px;
  padding-horizontal: 30px;
`

// padding: 5px;
// margin-right: 5px;
const CollectionContainer = styled.TouchableOpacity`
  width: 100%;

  margin-vertical: 10px;

  display: flex;
  flex-direction: row;
  justifycontent: center;
  alignitems: center;
  background-color: #f7f7f7;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  border-radius: 10px;
`

const SearchBarContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: #f9c12e;
  padding-horizontal: 30px;
  margin-vertical: 20px;
  border-radius: 100px;
`

const SlideContainer = styled.ScrollView`
  background-color: #eeffff;
  border-radius: 20px;
  padding: 10px;
  margin-vertical: 10px;
`

const InfoContainer = styled.View`
  margin: 0;
  padding: 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`
//   margin-horizontal: 5px;
// margin-vertical: 5px;

const ItemContainer = styled.View`
  width: 100%;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justifycontent: center;
`

// flex: 40%;
const ItemBox = styled.TouchableOpacity`
  width: 120px;
  margin-right: 10px;
`

const NormalText = styled.Text`
  color: #000000;
  font-size: 12px;
  margin-top: 5px;
`

const BoldText = styled.Text`
  color: #000000;
  margin-top: 5px;
  font-size: 14px;
  font-weight: bold;
`

const ImageContainer = styled.ImageBackground`
  width: 100%;
  aspect-ratio: 1;
`

const ItemPageContainer = styled.ImageBackground`
  width: 100%;
  padding-top: 50px;
  margin-vertical: 30px;
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
