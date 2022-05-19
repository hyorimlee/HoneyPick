import styled from 'styled-components/native'

const ItemContainer = styled.View`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
`

const ItemBox = styled.TouchableOpacity`
  flex: 0 0 30%;
  margin-right: 10px;
  box-sizing: border-box;
  margin-bottom: 30px;
`

const NormalText = styled.Text`
  color: #000000;
  font-size: 14px;
  margin-top: 5px;
`

const ImageContainer = styled.Image`
  width: 110px;
  height: 110px;
  border-width: 1px;
  border-color: #c4c4c4;
  border-radius: 10px;
`

export {ItemContainer, NormalText, ImageContainer, ItemBox}
