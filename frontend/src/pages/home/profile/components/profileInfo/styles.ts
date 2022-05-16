import styled from 'styled-components/native'

export const Container = styled.View`
  height: 200px;
  flex-direction: row;
  margin-bottom: 50px;
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
  font-size: 22px;
  font-weight: 500;
  margin-top: 5px;
`

export const NormalText = styled.Text`
  font-size: 14px;
  color: #000000;
  margin-top: 3px;
  margin-right: 10px;
`
