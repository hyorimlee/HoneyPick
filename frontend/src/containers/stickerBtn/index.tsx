import { faFilterCircleXmark } from '@fortawesome/free-solid-svg-icons'
import * as React from 'react'
import {memo} from 'react'

import BaseButton from '../../components/button/base'

import {Container} from './styles'

const STICKERS = [
  {id: '1', label: '🎁 선물하기 좋아요'},
  {id: '2', label: '🔨 튼튼해요'},
  {id: '3', label: '💰 가격이 합리적이에요'},
  {id: '4', label: '😋 맛있어요'},
  {id: '5', label: '🧶 부드러워요'},
  {id: '6', label: '🎨 디자인이 예뻐요'},
]


function StickerBtn({stickers, setStickers}: {stickers: string[], setStickers: React.Dispatch<React.SetStateAction<string[]>>}) {
  const clickHandler = (id: string) => {
    const newStickers = stickers.filter(s => s !== id)
    if (stickers.length === newStickers.length) {
      newStickers.push(id)
    }
    setStickers(newStickers)
  }

  const ButtonList = STICKERS.map(sticker => {
    return (
      <BaseButton
        text={sticker.label}
        onPress={() => clickHandler(sticker.id)}
        borderRadius={25}
        paddingVertical={5}
        paddingHorizontal={15}
        marginLeft={5}
        marginVertical={3}
        key={sticker.id}
      ></BaseButton>
    )
  })
  
  return (
    <Container>
      {ButtonList}
    </Container>
  )
}

export default memo(StickerBtn)