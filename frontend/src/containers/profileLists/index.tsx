import * as React from 'react'
import {memo} from 'react'
import {View, Text} from 'react-native'
import HorizontalList from '../../components/flatList/horizontalList'
import BaseButton from '../../components/button/base'
import {useAppSelector} from '../../store/types'
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native'
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'
import {
  BottomTabParamList,
  ProfileStackParamList,
} from '../../../types/navigation'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {CollectionHorizontalView} from './styles'

function ProfileLists() {
  const {collections, likes, votes} = useAppSelector(state => state.profile)
  const navigation =
    useNavigation<
      CompositeNavigationProp<
        BottomTabNavigationProp<BottomTabParamList, 'Profile'>,
        NativeStackNavigationProp<ProfileStackParamList, 'CreateCollection'>
      >
    >()

  const addCollection = () => {
    navigation.navigate('CreateCollection')
  }

  return (
    <View>
      <View>
        <CollectionHorizontalView>
          <Text>나의 컬렉션</Text>
          <BaseButton
            text="추가하기"
            onPress={addCollection}
            paddingHorizontal={10}
          />
        </CollectionHorizontalView>
        <HorizontalList data={collections}></HorizontalList>
      </View>
      <View>
        <Text>진행한 투표</Text>
        <HorizontalList data={votes}></HorizontalList>
      </View>
      <View>
        <Text>찜한 컬렉션</Text>
        <HorizontalList data={likes}></HorizontalList>
      </View>
    </View>
  )
}

export default memo(ProfileLists)
