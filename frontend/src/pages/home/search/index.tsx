import * as React from 'react'
import {memo, useCallback, useState} from 'react'
import {
  SafeAreaView,
  StatusBar,
  TouchableOpacity
} from 'react-native'

import BaseTextInput from '~/components/textInput/base/index'
import {useAppSelector, useAppDispatch} from '~/store/types'

import {IconProp} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import {
  Container,
  SearchBarContainer,
  BoldText
} from './styles'
import SearchResult from './components/searchResult'

import { search } from '~/store/slices/search/asyncThunk'

function SearchStack() {

  const dispatch = useAppDispatch()
  const getSearchList = () => {
    dispatch(search({keyword}))
  }
  const {collections, items} = useAppSelector(state => state.search)

  const [keyword, setKeyword] = useState('')
  const [keywordEntered, setkeywordEntered] = useState('')

  const keywordChanged = useCallback(
    (text: string) => {
      setKeyword(text)
    },
    [keyword],
  )

  const searchRecommend = () => {
    setkeywordEntered(keyword)
    getSearchList()
  }

  return (
    <SafeAreaView style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
      <Container>
        <>
          <SearchBarContainer>
            <BaseTextInput
              placeholderTextColor="white"
              color={'white'}
              flex={5}
              value={keyword}
              onChangeText={keywordChanged}
              onSubmitEditing={searchRecommend}
              placeholder={'검색어를 입력해주세요'}
              importantForAutofill={'auto'} // Android
              returnKeyType={'next'}
              maxLength={100}
              marginVertical={10}
            />
            <TouchableOpacity
              style={{flex: 1, paddingLeft: 15, paddingRight: 0}}
              onPress={searchRecommend}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass as IconProp}
                color="#FFFFFF"
                size={24}
              />
            </TouchableOpacity>
          </SearchBarContainer>
        </>

        { keywordEntered ?
        <SearchResult keywordEntered={keywordEntered} collections={collections} items={items}></SearchResult> :
          <BoldText style={{textAlign:'center'}}>
            찾고싶은 아이템, 컬렉션을 검색해주세요.
          </BoldText>
        }
        
        {/* 검색결과 */}
      </Container>
    </SafeAreaView>
  )
}

export default memo(SearchStack)
