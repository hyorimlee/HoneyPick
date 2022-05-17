import styles from 'styled-components/native'

export const CustomFlatList = styles.FlatList`
  margin-vertical: 10px;
`

export const ItemContainer = styles.Pressable`
  margin-right: 30px;
`

export const ListItem = styles.View`
  width: 75px;
  height: 75px;
  border-radius: 10px;
  background-color: green;
`
export const Title = styles.Text`
  color: #000000;
  font-size: 16px;
  padding-vertical: 5px;
  align-self: center;
`
export const NoneView = styles.View`
  height: 100px;
  widht: 100%;
  justify-content: center;
`
