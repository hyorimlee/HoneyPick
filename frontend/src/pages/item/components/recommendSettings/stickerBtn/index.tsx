import * as React from 'react'
import {memo} from 'react'

import {STICKERS} from '~/modules/stickers'
import SelectedButton from '../selectButton'

import {Container} from './styles'

function StickerBtn({
  stickers,
  setStickers,
}: {
  stickers: string[]
  setStickers: React.Dispatch<React.SetStateAction<string[]>>
}) {
  const clickHandler = (id: string) => {
    const newStickers = stickers.filter(s => s !== id)
    if (stickers.length === newStickers.length) {
      newStickers.push(id)
    }
    setStickers(newStickers)
  }

  const ButtonList = STICKERS.map(sticker => {
    return (
      <SelectedButton
        text={sticker.emoji + ' ' + sticker.label}
        onPress={() => clickHandler(sticker.id)}
        key={sticker.id}
        selected={stickers.includes(sticker.id)}
      ></SelectedButton>
    )
  })

  return <Container>{ButtonList}</Container>
}

export default memo(StickerBtn)
