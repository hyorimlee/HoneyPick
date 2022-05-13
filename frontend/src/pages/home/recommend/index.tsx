import * as React from 'react'
import Config from 'react-native-config'
import {memo, createRef, useCallback, useState, useEffect} from 'react'
import {
  Alert,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native'

import BaseTextInput from '../../../components/textInput/base/index'
import {getRecommend} from '../../../store/slices/recommend/asyncThunk'
import {useAppSelector, useAppDispatch} from '../../../store/types'

import {IconProp} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import {
  Container,
  CollectionContainer,
  SearchBarContainer,
  ItemPageContainer,
  ItemContainer,
  NormalText,
  BoldText,
  InfoContainer,
  ImageContainer,
  ItemBox,
} from './styles'

import ViewSlider from 'react-native-view-slider'

import {useNavigation} from '@react-navigation/native'
import {RecommendNavigationProps} from './types'

const {width, height} = Dimensions.get('window')

function RecommendStack() {
  const navigation = useNavigation<RecommendNavigationProps>()

  const {userId} = useAppSelector(state => state.profile)

  const pressedCollection = useCallback(
    (id: String) => () => {
      navigation.navigate('Collection', {accountId: userId, collectionId: id})
    },
    [userId],
  )

  const dispatch = useAppDispatch()
  const getRecommendList = () => {
    console.log('추천 리스트 가져오기')
    dispatch(getRecommend({}))
  }
  const {collections, items} = useAppSelector(state => state.recommend)

  useEffect(() => getRecommendList(), [])

  const [keyword, setKeyword] = useState('')

  const keywordChanged = useCallback(
    (text: string) => {
      setKeyword(text)
    },
    [keyword],
  )

  const goToCollection = (collectionId: String) => {
    // Alert.alert(`${collectionId} 컬렉션으로 이동하기`)
    pressedCollection(collectionId)
  }
  const goToItem = (itemId: String) => {
    Alert.alert(`${itemId} 아이템으로 이동하기`)
  }
  const searchRecommend = () => {
    Alert.alert('검색 !')
  }

  return (
    <SafeAreaView style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
      <Container>
        <>
          <ViewSlider
            renderSlides={
              <>
                {collections.map(({title, collection}, index) => {
                  return (
                    <View key={index} style={styles.collectionViewBox}>
                      <CollectionContainer
                        onPress={() => goToCollection(collection._id)}>
                        <ImageContainer
                          style={{flex: 1}}
                          // collection thumbnail
                          source={require('../../assets/images/sampleimage1.jpg')}
                          imageStyle={{
                            resizeMode: 'contain',
                            borderRadius: 10,
                          }}
                        />
                        <InfoContainer style={{flex: 1}}>
                          <NormalText>{title}</NormalText>
                          <BoldText>{collection.title}</BoldText>
                        </InfoContainer>
                      </CollectionContainer>
                    </View>
                  )
                })}
              </>
            }
            style={styles.slider} //Main slider container style
            height={140} //Height of your slider
            slideCount={collections.length} //How many views you are adding to slide
            autoSlide={false} //The views will slide automatically
          />
        </>

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

        <ItemPageContainer
          source={require('../../assets/images/receipt_long.png')}
          resizeMode="stretch">
          <ViewSlider
            renderSlides={
              <>
                {items.map(({title, itemList}, index) => {
                  return (
                    <View key={index} style={styles.viewBox}>
                      <BoldText style={{textAlign: 'center'}}>{title}</BoldText>

                      <ItemContainer>
                        {itemList.map(
                          (
                            {_id, thumbnail, priceAfter, priceBefore, title},
                            index,
                          ) => {
                            return (
                              <ItemBox onPress={() => goToItem(_id)}>
                                <ImageContainer
                                  source={
                                    thumbnail
                                      ? {
                                          uri: `${Config.IMAGE_BASE_URL}/w128/${thumbnail}`,
                                        }
                                      : require('../../assets/images/sampleimage1.jpg')
                                  }
                                  imageStyle={{
                                    resizeMode: 'contain',
                                    borderRadius: 10,
                                  }}
                                />
                                <NormalText>
                                  {priceAfter
                                    ? priceAfter
                                    : priceBefore
                                    ? priceBefore
                                    : '가격정보 없음'}
                                </NormalText>
                                <NormalText>
                                  {title ? title : 'No Title'}
                                </NormalText>
                              </ItemBox>
                            )
                          },
                        )}
                      </ItemContainer>
                    </View>
                  )
                })}
              </>
            }
            style={styles.slider} //Main slider container style
            // height = {auto}    //Height of your slider
            slideCount={items.length} //How many views you are adding to slide
            autoSlide={false} //The views will slide automatically
          />
        </ItemPageContainer>
      </Container>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  viewBox: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: width * 0.9,
    borderRadius: 20,
  },
  collectionViewBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.9,
    borderRadius: 20,
  },
  slider: {
    width: width * 0.9,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  dotContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 15,
  },
})

export default RecommendStack
