import {ListRenderItem} from 'react-native'

export interface IProps {
  data: Array<object>
  renderItem: ListRenderItem<object> | null | undefined
}
