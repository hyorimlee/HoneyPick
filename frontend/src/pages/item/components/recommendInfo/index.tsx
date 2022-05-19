import * as React from 'react'
import {memo, useEffect, useState} from 'react'
import {STICKERS} from '~/modules/stickers'
import {filteredStickers} from '~/store/slices/item'
import {useAppSelector} from '~/store/types'
import {
  EmojiText,
  NormalText,
  RowTextContainer,
  Stamp,
  StickerContainer,
  TextContainer,
} from '../../styles'
import RecommendBar from './recommendBar'

function RecommendInfo() {
  const stickers = useAppSelector(filteredStickers)
  const {review} = useAppSelector(state => state.item)
  const {item} = useAppSelector(state => state)

  const itemSticker = STICKERS.map(sticker => {
    if (review?.stickers.includes(sticker.id)) {
      return <EmojiText key={sticker.id}>{sticker.emoji}</EmojiText>
    }
  })

  return (
    <>
      {review ? (
        <TextContainer>
          <RowTextContainer>
            <NormalText>이 아이템을 추천하는 이유</NormalText>
            <Stamp
              source={
                review.isRecommend === 2
                  ? require('~/assets/images/honeystamp.png')
                  : require('~/assets/images/goodstamp.png')
              }
              style={{resizeMode: 'contain'}}></Stamp>
          </RowTextContainer>
          <StickerContainer>{itemSticker}</StickerContainer>
        </TextContainer>
      ) : null}

      {stickers.length > 0 ? (
        <TextContainer>
          <NormalText>다른 허니비들이 이 아이템을 추천하는 이유</NormalText>
          <RecommendBar stickers={stickers}></RecommendBar>
        </TextContainer>
      ) : null}
    </>
  )
}

export default memo(RecommendInfo)
