import styled from 'styled-components/native'

export const Container = styled.View`
  margin-vertical: 30px;
  margin-horizontal: 30px;
  height: 200px;
  flex-direction: row;
`
export const InfoContainer = styled.View`
  flex: 2;
  justify-content: space-between;
`
export const EditContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`

export const FollowContainer = styled.View`
  flex-direction: row;
`

export const ProfileImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 100px;
`

export const Nickname = styled.Text`
  color: #000000;
  font-size: 20px;
  font-weight: 600;
  margin-top: 5px;
`

export const NormalText = styled.Text`
  font-size: 16px;
  color: #000000;
  margin-top: 3px;
  margin-right: 10px;
`
