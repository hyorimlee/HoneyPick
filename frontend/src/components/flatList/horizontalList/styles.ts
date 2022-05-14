import styles from 'styled-components/native'

export const CustomFlatList = styles.FlatList`
  margin-vertical: 10px;
`

export const ItemContainer = styles.Pressable`
  width: 75px;
  margin-right: 10px;
`

export const ListItem = styles.View`
  width: 75px;
  height: 75px;
  border-radius: 10px;
  background-color: green;
`
export const Title = styles.Text`
  color: #000000;
  font-size: 12px;
  padding-vertical: 5px;
`