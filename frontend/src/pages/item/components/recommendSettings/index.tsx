import * as React from 'react'
import {memo, useState} from 'react'
import {Alert} from 'react-native'
import BaseButton from '~/components/button/base'
import {saveReview} from '~/store/slices/item/asyncThunk'
import {useAppDispatch, useAppSelector} from '~/store/types'
import {NormalText, TextContainer} from '../../styles'
import StickerBtn from './stickerBtn'
import {ButtonContainer} from './styles'
import {IProps} from './types'

function RecommendSettings({toggleIsSet}: IProps) {
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
      toggleIsSet()
    } else {
      Alert.alert('추천 정도와 스티커를 선택해주세요!')
    }
  }

  const cancelRecommend = () => {
    toggleIsSet()
  }

  const recommendHandler = (num: 0 | 1 | 2) => {
    setRecommend(num)
  }

  return (
    <TextContainer>
      <NormalText>추천 정도</NormalText>
      <ButtonContainer>
        <BaseButton
          text="꿀템"
          onPress={() => recommendHandler(2)}
          borderRadius={25}
          paddingVertical={5}
          paddingHorizontal={25}></BaseButton>
        <BaseButton
          text="굿템"
          onPress={() => recommendHandler(1)}
          borderRadius={25}
          paddingVertical={5}
          paddingHorizontal={25}
          marginLeft={5}></BaseButton>
      </ButtonContainer>
      <NormalText>스티커</NormalText>
      <ButtonContainer>
        <StickerBtn stickers={stickers} setStickers={setStickers} />
      </ButtonContainer>
      <BaseButton
        text={'돌아가기'}
        onPress={cancelRecommend}
        borderRadius={25}
        marginVertical={10}
        paddingVertical={15}
      />
      <BaseButton
        text={'저장하기'}
        onPress={saveHoneyItem}
        borderRadius={25}
        marginVertical={10}
        paddingVertical={15}
      />
    </TextContainer>
  )
}

export default memo(RecommendSettings)
