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
  FlatList,
} from 'react-native'

import BaseTextInput from '~/components/textInput/base/index'
import {getItemRecommend, getCollectionRecommend} from '~/store/slices/recommend/asyncThunk'
import {useAppSelector, useAppDispatch} from '~/store/types'

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

import {useNavigation} from '@react-navigation/native'
import { RootStackNavigationProp } from '~/../types/navigation'


const {width, height} = Dimensions.get('window')

function RecommendStack() {
  const navigation = useNavigation<RootStackNavigationProp>()

  const {userId} = useAppSelector(state => state.profile)

  const pressedCollection = useCallback(
    (id: string) => () => {
      navigation.navigate('Collection', {accountId: userId, collectionId: id})
    },
    [userId],
  )

  const pressedItem = useCallback(
    (itemId: string) => () => {
      navigation.navigate('Item', {itemId: itemId, collectionId: ''})
    },
    [userId],
  )

  const dispatch = useAppDispatch()

  const getCollectionRecommendList = () => {
    // 추가 데이터 요청 시 query 받기
    dispatch(getCollectionRecommend({}))
  }
  const getItemRecommendList = () => {
    dispatch(getItemRecommend({}))
  }
  const {collections, items} = useAppSelector(state => state.recommend )

  useEffect(() => getCollectionRecommendList(), [])
  useEffect(() => getItemRecommendList(), [])

  const collectionRenderItem = ({item}: {item: any}) => {
    return (
      <View key={item.collection._id} style={styles.collectionViewBox}>
        <CollectionContainer
          onPress={pressedCollection(item.collection._id)}>
          <ImageContainer
            style={{flex: 1}}
            // collection thumbnail
            source={require('../../../assets/images/sampleimage1.jpg')}
            imageStyle={{
              resizeMode: 'contain',
              borderRadius: 10,
            }}
          />
          <InfoContainer style={{flex: 1}}>
            <NormalText>{item.title}</NormalText>
            <BoldText>{item.collection.title}</BoldText>
          </InfoContainer>
        </CollectionContainer>
      </View>
    )
  }

  const getAdditionalCollection = () => {
    if(collections.length < 5){
      return
    }
    console.log('컬렉션 더 가져오기')
  }

  const getAdditionalItem = (index: number) => {
    console.log(index, '아이템 더 가져오기')
    // 데이터 추가하기

  }

  const itemRenderItem = ({item}: {item: any}) => {
    return (
      <ItemBox key={item._id} onPress={pressedItem(item._id)}>
        <ImageContainer
          source={
            item.thumbnail
              ? {
                  uri: `${Config.IMAGE_BASE_URL}/w128/${item.thumbnail}`,
                }
              : require('~/assets/images/sampleimage1.jpg')
          }
          imageStyle={{
            resizeMode: 'contain',
            borderRadius: 10,
          }}
        />
        <NormalText>
          {item.priceAfter
            ? item.priceAfter
            : item.priceBefore
            ? item.priceBefore
            : '가격정보 없음'}
        </NormalText>
        <NormalText>
          {item.title ? item.title : 'No Title'}
        </NormalText>
      </ItemBox>
    )}
  return (
    <SafeAreaView style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
      <Container>
        <FlatList
          style={{width: '100%'}}
          renderItem={collectionRenderItem}
          data={collections}
          horizontal={true}
          // onScroll={scrollEvent}
          onEndReached={getAdditionalCollection}
        >
        </FlatList>

        {items.map(({title, itemList}, index) => {
          return (
          <View key={index} style={styles.viewBox}>
          <BoldText style={{width: '100%', textAlign: 'left'}}>{title}</BoldText>

          <ItemContainer>
            <FlatList
              renderItem={itemRenderItem}
              data={itemList}
              horizontal={true}
              >
            </FlatList>
          </ItemContainer>
        </View>)
        })}
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
    marginRight: 10,
    marginVertical: 10,
    // height: 200,
  },
  collectionViewBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.8,
    borderRadius: 20,
    marginRight: 10,
    height: 140
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

export default memo(RecommendStack)
