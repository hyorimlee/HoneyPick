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
import {CollectionHorizontalView, DivisionContainer, DivisionText} from './styles'

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
      <DivisionContainer>
        <CollectionHorizontalView>
          <DivisionText>컬렉션</DivisionText>
          <BaseButton
            text="추가하기"
            onPress={addCollection}
            paddingVertical={2}
            paddingHorizontal={20}
            fontSize={12}
          />
        </CollectionHorizontalView>
        <HorizontalList data={collections}></HorizontalList>
      </DivisionContainer>
      <DivisionContainer>
        <DivisionText>진행한 투표</DivisionText>
        <HorizontalList data={votes}></HorizontalList>
      </DivisionContainer>
      <DivisionContainer>
        <DivisionText>찜한 컬렉션</DivisionText>
        <HorizontalList data={likes}></HorizontalList>
      </DivisionContainer>
    </View>
  )
}

export default memo(ProfileLists)
