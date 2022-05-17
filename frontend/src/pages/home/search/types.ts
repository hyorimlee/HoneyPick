// import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'
// import {CompositeNavigationProp} from '@react-navigation/native'
// import {NativeStackNavigationProp} from '@react-navigation/native-stack'
// import {BottomTabParamList} from '../types'
// import {RootStackParamList} from '../../../../types/navigation'

// export type RecommendNavigationProps = CompositeNavigationProp<
//   BottomTabNavigationProp<BottomTabParamList, 'Search'>,
//   NativeStackNavigationProp<RootStackParamList, 'Home'>
// >
export interface scrollProps {
  layoutMeasurement: { height: number } | undefined
  contentOffset: { y: number } | undefined
  contentSize: { height: number } | undefined

}
