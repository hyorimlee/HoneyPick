import styled from 'styled-components/native'

export const Container = styled.ScrollView`
  padding: 30px;
`

export const MainEvent = styled.TouchableOpacity`
  width: 100%;
  padding: 20px;
  margin-bottom: 30px;
  border-radius: 20px;
  background-color: #f7f7f7;
  elevation: 3;
  shadow-opacity: 0.75;
  shadow-radius: 5px;
  shadow-color: 'black';
  // shadow-offset: { height: 0, width: 0 };
  shadow-offset-height: 0;
  shadow-offset-width: 0;
`
// shadowOpacity부터 ios라서 확인 필요

export const SubEvent = styled(MainEvent)`
  width: 95%;
  margin-bottom: 15px;
  align-self: center;
`

export const EventImage = styled.Image`
  width: 100px;
  height: 100px;
  resize-mode: contain;
  border-radius: 15px;
`

export const SubEventImage = styled(EventImage)`
  opacity: 0.7;
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
  color: #000000;
  font-weight: 600;
  font-size: 18px;
`

export const NormalText = styled.Text`
  color: #000000;
  font-size: 16px;
`
