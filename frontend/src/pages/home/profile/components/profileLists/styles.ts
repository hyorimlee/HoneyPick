import styled from 'styled-components/native'

export const CollectionHorizontalView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
export const DivisionContainer = styled.View`
  padding-horizontal: 30px;
  margin-vertical: 10px;
`

export const DivisionText = styled.Text`
  color: #000000;
  font-size: 20px;
  font-weight: 600;
`

export const CustomActivityIndicator = styled.ActivityIndicator.attrs(() => ({
  size: 'large',
  color: '#FFD669',
}))`
  margin-vertical: 10px;
`
