import * as React from 'react'
import {memo} from 'react'
import {ActivityIndicator, View} from 'react-native'
import HorizontalList from '~/components/flatList/horizontalList'
import BaseButton from '~/components/button/base'
import {useAppSelector} from '~/store/types'
import {useNavigation} from '@react-navigation/native'
import {
  CollectionHorizontalView,
  CustomActivityIndicator,
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
      {collections ? (
        <HorizontalList data={collections} title={'컬렉션'} />
      ) : (
        <CustomActivityIndicator />
      )}
      <DivisionContainer>
        <DivisionText>진행한 투표</DivisionText>
      </DivisionContainer>
      {votes ? (
        <HorizontalList data={votes} title={'진행한 투표'} />
      ) : (
        <CustomActivityIndicator />
      )}
      <DivisionContainer>
        <DivisionText>찜한 컬렉션</DivisionText>
      </DivisionContainer>
      {likes ? (
        <HorizontalList data={likes} title={'찜한 컬렉션'} />
      ) : (
        <CustomActivityIndicator />
      )}
    </View>
  )
}

export default memo(ProfileLists)
