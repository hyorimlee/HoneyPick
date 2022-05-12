import styled from 'styled-components/native'

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 30px;
`
export const InfoContainer = styled.View`
  flex: 2;
`
export const EditContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`

export const FollowContainer = styled.View`
  flex-direction: row
`

export const ProfileImage = styled.Image`
  width: 64px;
  height: 64px;
  resizeMode: contain;
  borderRadius: 100px;
  background-color: black;
`

export const Nickname = styled.Text`
  color: #000000;
  font-size: 18px;
  font-weight: 500;
  margin-top: 5px;
`

export const NormalText = styled.Text`
  font-size: 12px;
  color: #000000;
  margin-top: 3px;
  margin-right: 10px;
  
`