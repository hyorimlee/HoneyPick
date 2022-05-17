import * as React from 'react'
import {memo} from 'react'
import {ActivityIndicator, View} from 'react-native'
import HorizontalList from '~/components/flatList/horizontalList'
import BaseButton from '~/components/button/base'
import {useAppSelector} from '~/store/types'
import {useNavigation} from '@react-navigation/native'
import {
  CollectionHorizontalView,
  DivisionContainer,
  DivisionText,
} from './styles'
import {RootStackNavigationProp} from '~/../types/navigation'

function ProfileLists() {
  const {collections, likes, votes} = useAppSelector(state => state.profile)
  const navigation = useNavigation<RootStackNavigationProp>()

  const addCollection = () => {
    navigation.navigate('CreateCollection')
  }

  return (
    <View>
      {collections && votes && likes ? (
        <>
          <DivisionContainer>
            <CollectionHorizontalView>
              <DivisionText>컬렉션</DivisionText>
              <BaseButton
                text="추가하기"
                onPress={addCollection}
                paddingVertical={5}
                paddingHorizontal={20}
                fontSize={16}
              />
            </CollectionHorizontalView>
          </DivisionContainer>
          <HorizontalList data={collections} title={'컬렉션'}></HorizontalList>
          <DivisionContainer>
            <DivisionText>진행한 투표</DivisionText>
            <HorizontalList data={votes} title={'진행한 투표'}></HorizontalList>
          </DivisionContainer>
          <DivisionContainer>
            <DivisionText>찜한 컬렉션</DivisionText>
            <HorizontalList data={likes} title={'찜한 컬렉션'}></HorizontalList>
          </DivisionContainer>
        </>
      ) : (
        <ActivityIndicator
          size="large"
          color="#FFD669"
          style={{marginVertical: 20}}></ActivityIndicator>
      )}
    </View>
  )
}

export default memo(ProfileLists)
