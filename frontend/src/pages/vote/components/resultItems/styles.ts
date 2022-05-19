import styled from 'styled-components/native'

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding: 15px
`

export const LargeItem = styled.TouchableOpacity`
  width: 92%;
  margin-vertical: 2%;
  border-radius: 20px;
  background-color: #F7F7F7;
  elevation: 3;
`
export const LargeItemFlex = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  padding: 6%;
`

export const LargeItemImage = styled.Image`
  width: 100px;
  height: 100px;
  resizeMode: contain;
  border-radius: 15px;
`

export const LargeItemInfoContainer = styled.View`
  width: 75%;
  flex-direction: column;
  justify-content: center;
  padding-horizontal: 20px;
`

export const MediumItem = styled.TouchableOpacity`
  width: 44%;
  justify-content: center;
  margin-vertical: 2%;
  margin-horizontal: 2%;
  border-radius: 20px;
  background-color: #F7F7F7;
  elevation: 3;
`
export const MediumItemFlex = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10%;
`

export const MediumItemImage = styled.Image`
  width: 100px;
  height: 100px;
  resizeMode: contain;
  border-radius: 15px;
`

export const MediumItemInfoContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 10px;
`

export const SmallItem = styled.TouchableOpacity`
  width: 92%;
  margin-vertical: 2%;
  border-radius: 10px;
  background-color: #F7F7F7;
  elevation: 3;
`

export const SmallItemFlex = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 4%;
`

export const TitleText = styled.Text`
  color: #000000;
  font-size: 18px;
  font-weight: 600;
  margin-vertical: 1%;
`

export const NormalText = styled.Text`
  color: #000000;
  font-size: 14px;
  margin-vertical: 1%;
`