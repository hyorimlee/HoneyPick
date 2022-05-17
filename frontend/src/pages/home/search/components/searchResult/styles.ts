import styled from 'styled-components/native'

const ItemContainer = styled.View`
  width: 100%;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justifyContent: flex-start;
`

const ItemBox = styled.TouchableOpacity`
  flex: 0 0 30%;
  margin-right: 10px;
  box-sizing: border-box;
`

const NormalText = styled.Text`
  color: #000000;
  font-size: 14px;
  margin-top: 5px;
`

const ImageContainer = styled.ImageBackground`
  width: 100%;
  aspect-ratio: 1;
`

export {ItemContainer, NormalText, ImageContainer, ItemBox}
