import styled from 'styled-components/native'

const Container = styled.ScrollView`
  padding: 30px;
`

const ImageContainer = styled.ImageBackground`
  width: 100%;
  aspect-ratio: 1;
`;

const PriceText = styled.Text`
  color: #F9C12E;
  font-size: 18px;
  font-weight: bold;
`

const DashedBorder = styled.View`
  border-bottom-width: 1px;
  border-style: dashed;
`

export {Container, ImageContainer, PriceText, DashedBorder}