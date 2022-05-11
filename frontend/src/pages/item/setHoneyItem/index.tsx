import * as React from 'react'
import Config from 'react-native-config'
import {memo, useState} from 'react'
import {Alert, SafeAreaView, StatusBar} from 'react-native'

import BaseButton from '../../../components/button/base'
import StickerBtn from '../../../containers/stickerBtn'
import {saveReview} from '../../../store/slices/item/asyncThunk'
import {useAppSelector, useAppDispatch} from '../../../store/types'

import {Container, ImageContainer, InfoContainer, TextContainer, NormalText, BoldText, PriceText, DashedBorder} from '../default/styles'
import {ButtonContainer} from './styles'

function SetHoneyItem() {
  const dispatch = useAppDispatch()
  const {itemId, item} = useAppSelector(state => state.item)

  const [recommend, setRecommend] = useState<0 | 1 | 2>(0)
  const [stickers, setStickers] = useState<string[]>([])

  const saveHoneyItem = () => {
    if (recommend !== 0 && stickers) {
      const data = {
        itemId,
        isRecommend: recommend,
        stickers: stickers,
      }
      dispatch(saveReview(data))
    } else {
      Alert.alert('추천 정도와 스티커를 선택해주세요!')
    }
  }

  const recommendHandler = (num: 0 | 1 | 2) => {
    setRecommend(num)
  }

  return (
    <SafeAreaView style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
      <Container>
        <ImageContainer
          source={item.thumbnail ? {uri: `${Config.IMAGE_BASE_URL}/w510/${item.thumbnail}`} : require('../../../assets/images/sampleimage1.jpg')}
          imageStyle={{
            resizeMode: 'contain',
            borderRadius: 20,
          }}
        />
        <InfoContainer>
          <TextContainer>
            <NormalText>{item.brand}</NormalText>
            <BoldText>{item.title}</BoldText>
            <PriceText>{item.priceBefore}</PriceText>
            <NormalText>컬렉션 이름</NormalText>
          </TextContainer>
        </InfoContainer>
        <DashedBorder />
        <TextContainer>
          <NormalText>추천 정도</NormalText>
          <ButtonContainer>
            <BaseButton
              text='꿀템'
              onPress={() => recommendHandler(2)}
              borderRadius={25}
              paddingVertical={5}
              paddingHorizontal={25}
            ></BaseButton>
            <BaseButton
              text='굿템'
              onPress={() => recommendHandler(1)}
              borderRadius={25}
              paddingVertical={5}
              paddingHorizontal={25}
              marginLeft={5}
            ></BaseButton>
          </ButtonContainer>
          <NormalText>스티커</NormalText>
          <ButtonContainer>
            <StickerBtn stickers={stickers} setStickers={setStickers}/>
          </ButtonContainer>
        </TextContainer>
        <BaseButton
          text={'저장하기'}
          onPress={saveHoneyItem}
          borderRadius={25}
          marginVertical={10}
          paddingVertical={15}
        />
      </Container>
    </SafeAreaView>
  )
}

export default memo(SetHoneyItem)
