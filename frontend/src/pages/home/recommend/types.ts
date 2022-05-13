import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'
import {CompositeNavigationProp} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {
  BottomTabParamList,
  RecommendStackParamList,
} from '../../../../types/navigation'

export type RecommendNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Recommend'>,
  NativeStackNavigationProp<RecommendStackParamList, 'Default'>
>
