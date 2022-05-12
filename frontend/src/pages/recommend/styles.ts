import styled from 'styled-components/native'

const Container = styled.ScrollView`
  padding-top: 5px;
  padding-bottom: 50px;
  padding-horizontal: 30px;
`

const CollectionContainer = styled.TouchableOpacity`
  width: 90%;
  margin-horizontal: 5px;
  margin-vertical: 10px;
  padding: 5px;
  display: flex;
  flex-direction: row;
  justifyContent: center;
  alignItems: center;
  background-color: #F7F7F7;
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
  background-color: #F9C12E;
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

const ItemContainer = styled.View`
  width: 90%;
  margin-horizontal: 5px;
  margin-vertical: 5px;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justifyContent: center;

`

const ItemBox = styled.TouchableOpacity`
  flex: 40%;
  margin: 10px;
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

const ItemPageContainer = styled.View`
  width: 100%;
  background-color: #F7F7F7;
  padding-top: 30px;
  margin-bottom: 20px;
`

export {Container, CollectionContainer, SearchBarContainer, SlideContainer, ItemContainer, NormalText, BoldText, InfoContainer, ImageContainer, ItemBox, ItemPageContainer}
