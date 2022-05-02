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

const MenuContainer = styled.View`
  flex-direction: row;
  justify-contents: space-between;
`

const TextContainer = styled.View`
  flex: 1;
  margin-top: 10px;
  margin-bottom: 15px;
`

const NormalText = styled.Text`
  margin-top: 5px;
`

const BoldText = styled.Text`
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

export {Container, ImageContainer, MenuContainer, TextContainer, NormalText, BoldText, PriceText, DashedBorder}