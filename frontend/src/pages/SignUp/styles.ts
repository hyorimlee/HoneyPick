import {StyleSheet} from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const CustomTextInput = styled.TextInput`
  width: 200;
  border-bottom-width: ${StyleSheet.hairlineWidth};
`

export {Container, CustomTextInput}
