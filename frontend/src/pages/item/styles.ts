import styled from 'styled-components/native'

const Container = styled.ScrollView`
  padding-top: 5px;
  padding-bottom: 50px;
  padding-horizontal: 30px;
`

const ImageContainer = styled.ImageBackground`
  width: 100%;
  aspect-ratio: 1;
`;

const InfoContainer = styled.View`
  flex-direction: row;
  justify-contents: space-between;
`

const TextContainer = styled.View`
  flex: 1;
  margin-top: 10px;
  margin-bottom: 15px;
`

const MenuContainer = styled.View`
  padding-vertical: 30px;
  padding-horizontal: 30px;
`

const NormalText = styled.Text`
  color: #000000;
  margin-top: 5px;
`

const BoldText = styled.Text`
  color: #000000;
  margin-top: 5px;
  font-weight: bold;
`

const PriceText = styled.Text`
  color: #F9C12E;
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
`

const DashedBorder = styled.View`
  border-style: dashed;
  border-bottom-width: 1px;
`

export {Container, ImageContainer, InfoContainer, TextContainer, MenuContainer, NormalText, BoldText, PriceText, DashedBorder}