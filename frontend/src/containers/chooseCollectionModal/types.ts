import { BottomTabParamList, ChooseCollectionParamList } from './../../../types/navigation';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

export type ChooseCollectionNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Profile'>,
  NativeStackNavigationProp<ChooseCollectionParamList, 'CreateCollection'>
>