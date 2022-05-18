import * as React from 'react'
import {memo, useState, useEffect} from 'react'
import {Alert} from 'react-native'
import BaseButton from '~/components/button/base'
import SelectButton from './selectButton'
import {saveReview, editReview} from '~/store/slices/item/asyncThunk'
import {useAppDispatch, useAppSelector} from '~/store/types'
import {NormalText, TextContainer} from '../../styles'
import StickerBtn from './stickerBtn'
import {ButtonContainer} from './styles'
import {IProps} from './types'

function RecommendSettings({toggleIsRecommendMode}: IProps) {
  const dispatch = useAppDispatch()
  const {itemId, review} = useAppSelector(state => state.item)

  const [recommend, setRecommend] = useState<0 | 1 | 2>(0)
  const [stickers, setStickers] = useState<string[]>([])

  useEffect(() => {
    if (review) {
      setRecommend(review.isRecommend)
      setStickers(review.stickers)
    }
  }, [])

  const cancelRecommend = () => {
    toggleIsRecommendMode()
  }

  const recommendHandler = (num: 0 | 1 | 2) => () => {
    if (recommend === num) {
      setRecommend(0)
    } else {
      setRecommend(num)
    }
  }

  const saveHoneyItem = async () => {
    if (recommend !== 0 && stickers) {
      let response
      if (review) {
        const reviewId = review._id
        const data = {
          itemId,
          reviewId,
          isRecommend: recommend,
          stickers: stickers,
        }
        response = await dispatch(editReview(data))
      } else {
        const data = {
          itemId,
          isRecommend: recommend,
          stickers: stickers,
        }
        response = await dispatch(saveReview(data))
      }

      if (response) {
        toggleIsRecommendMode()
      }
    } else {
      Alert.alert('추천 정도와 스티커를 선택해주세요!')
    }
  }

  return (
    <TextContainer>
      <NormalText>추천 정도</NormalText>
      <ButtonContainer>
        <SelectButton
          text="꿀템"
          onPress={recommendHandler(2)}
          selected={recommend === 2}></SelectButton>
        <SelectButton
          text="굿템"
          onPress={recommendHandler(1)}
          selected={recommend === 1}></SelectButton>
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
