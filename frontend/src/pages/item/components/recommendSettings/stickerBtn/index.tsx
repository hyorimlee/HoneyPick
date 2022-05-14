import {faFilterCircleXmark} from '@fortawesome/free-solid-svg-icons'
import * as React from 'react'
import {memo} from 'react'

import {STICKERS} from '~/modules/stickers'
import BaseButton from '~/components/button/base'

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
      <BaseButton
        text={sticker.emoji + ' ' + sticker.label}
        onPress={() => clickHandler(sticker.id)}
        borderRadius={25}
        paddingVertical={5}
        paddingHorizontal={15}
        marginLeft={5}
        marginVertical={3}
        key={sticker.id}></BaseButton>
    )
  })

  return <Container>{ButtonList}</Container>
}

export default memo(StickerBtn)
