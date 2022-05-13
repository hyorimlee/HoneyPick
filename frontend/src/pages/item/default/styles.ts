import styled from 'styled-components/native'

export const Container = styled.ScrollView`
  padding-top: 5px;
  padding-horizontal: 30px;
`

export const ImageContainer = styled.ImageBackground`
  width: 100%;
  aspect-ratio: 1;
`

export const InfoContainer = styled.View`
  flex-direction: row;
  justify-contents: space-between;
`

export const TextContainer = styled.View`
  flex: 1;
  margin-top: 10px;
  margin-bottom: 15px;
`

export const MenuContainer = styled.View`
  padding-vertical: 30px;
  padding-horizontal: 30px;
`

export const StickerContainer = styled.View`
  flex-wrap: wrap
  flex-direction: row;
  margin-top: 5px;
`

export const RowTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

export const NormalText = styled.Text`
  color: #000000;
  margin-top: 5px;
`

export const BoldText = styled.Text`
  color: #000000;
  margin-top: 5px;
  font-weight: bold;
`

export const PriceText = styled.Text`
  color: #f9c12e;
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
  margin-right: 3px;
`

export const PriceTextGray = styled.Text`
  color: #8c8c8c;
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
  margin-right: 3px;
  text-decoration: line-through;
`

export const DashedBorder = styled.View`
  border-style: dashed;
  border-bottom-width: 1px;
`

export const EmojiText = styled.Text`
  font-size: 30px;
  margin-right: 5px;
`

export const Stamp = styled.Image`
  width: 35px;
  height: 35px;
  margin-left: 3px;
`
