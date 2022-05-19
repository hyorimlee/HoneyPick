import * as React from 'react'
import {memo, useCallback, useState, useEffect} from 'react'
import {SafeAreaView, StatusBar, TouchableOpacity, View} from 'react-native'

import BaseTextInput from '~/components/textInput/base/index'
import {useAppSelector, useAppDispatch} from '~/store/types'

import {IconProp} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import {Container, SearchBarImage, SearchBarContainer, BoldText} from './styles'
import SearchResult from './components/searchResult'

import {search} from '~/store/slices/search/asyncThunk'
import {scrollProps} from './types'
import collectionSlice from '~/store/slices/collection'
import {useIsFocused} from '@react-navigation/native'

function SearchStack() {
  const dispatch = useAppDispatch()
  const {collections, items, page} = useAppSelector(state => state.search)

  const [keyword, setKeyword] = useState('')
  const [keywordEntered, setKeywordEntered] = useState('')
  const [loading, setLoading] = useState(false)
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      dispatch(collectionSlice.actions.collectionUserReset())
    }
  }, [isFocused])

  const getSearchList = (keyword: string, page: number) => {
    dispatch(search({keyword, page})).then(() => setLoading(false))
  }

  const keywordChanged = useCallback(
    (text: string) => {
      setKeyword(text)
    },
    [keyword],
  )

  const searchRecommend = () => {
    setKeywordEntered(keyword)
    getSearchList(keyword, 1)
  }
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: scrollProps) => {
    const paddingToBottom = 20
    return (
      layoutMeasurement!.height + contentOffset!.y >=
      contentSize!.height - paddingToBottom
    )
  }

  return (
    <SafeAreaView style={{flex: 1, paddingTop: 20}}>
      <Container
        onScroll={({nativeEvent}) => {
          if (
            !(items.length % 18) &&
            !loading &&
            isCloseToBottom(nativeEvent)
          ) {
            setLoading(true)
            getSearchList(keywordEntered, page + 1)
          }
        }}
        scrollEventThrottle={0}>
        <View style={{paddingHorizontal: 30}}>
          <SearchBarImage
            source={require('../../../assets/images/search.png')}
            imageStyle={{resizeMode: 'stretch'}}>
            <SearchBarContainer>
              <BaseTextInput
                placeholderTextColor="white"
                color="white"
                value={keyword}
                onChangeText={keywordChanged}
                onSubmitEditing={searchRecommend}
                placeholder={'검색어를 입력해주세요'}
                importantForAutofill={'auto'} // Android
                returnKeyType={'next'}
                maxLength={15}
                borderBottomColor={'transparent'}
                fontSize={16}
              />
              <TouchableOpacity
                style={{position: 'absolute', right: 30}}
                onPress={searchRecommend}>
                <FontAwesomeIcon
                  icon={faMagnifyingGlass as IconProp}
                  color="#FFFFFF"
                  size={20}
                />
              </TouchableOpacity>
            </SearchBarContainer>
          </SearchBarImage>
        </View>

        {keywordEntered ? (
          <SearchResult
            keywordEntered={keywordEntered}
            collections={collections}
            items={items}></SearchResult>
        ) : (
          <BoldText style={{textAlign: 'center'}}>
            찾고싶은 아이템, 컬렉션을 검색해주세요.
          </BoldText>
        )}
      </Container>
    </SafeAreaView>
  )
}

export default memo(SearchStack)
