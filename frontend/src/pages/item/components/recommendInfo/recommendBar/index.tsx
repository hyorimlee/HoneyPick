import * as React from 'react'
import {memo, useState, useEffect} from 'react'

import {STICKERS} from '~/modules/stickers'
import {IStickersProp} from './types'
import GaugeBar from '../gaugeBar'

import {Container} from './styles'

function RecommendBar({stickers}: IStickersProp) {
  const voteSum = stickers.reduce((prev, cur) => prev + cur[1], 0)

  const bars = stickers.map(sticker => {
    const bar = STICKERS.map(s => {
      if (s.id === sticker[0]) {
        return (
          <GaugeBar
            key={s.id}
            emoji={s.emoji}
            text={s.label}
            votes={sticker[1]}
            sum={voteSum}></GaugeBar>
        )
      }
    })
    return bar
  })

  return <Container>{bars}</Container>
}

export default memo(RecommendBar)
