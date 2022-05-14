import styled from 'styled-components/native'

export const Container = styled.ScrollView`
  padding: 30px;
`

export const MainEvent = styled.TouchableOpacity`
  width: 100%;
  padding: 20px;
  margin-bottom: 30px;
  border-radius: 20px;
  background-color: green;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`

export const SubEvent = styled(MainEvent)`
  width: 95%;
  margin-bottom: 15px;
  align-self: center;
`

export const EventImage = styled.Image`
  width: 100px;
  height: 100px;
  resizeMode: contain;
  border-radius: 15px;
`
export const InfoTop = styled.View`
  width: 100%;
  flex-direction: row;
  margin-bottom: 10px;
  align-items: flex-end;
`

export const InfoContainer = styled.View`
  flex: 2;
  margin-left: 15px;
  margin-vertical: 10px;
`

export const TitleText = styled.Text`
  font-weight: 600;
`

export const NormalText = styled.Text`
  font-size: 12px;
`