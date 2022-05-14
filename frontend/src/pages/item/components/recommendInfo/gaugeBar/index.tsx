import * as React from 'react'
import {memo} from 'react'
import {
  Container,
  Bar,
  TextContainer,
  DescConatiner,
  Emoji,
  Description,
  Count,
} from './styles'
import {IComponentProps} from './types'

function GaugeBar({
  emoji,
  text,
  backgroundColor = '#E5E5E5',
  votes,
  sum,
}: IComponentProps) {
  const proportion = (votes / sum) * 100 + '%'

  return (
    <Container>
      <Bar backgroundColor={backgroundColor} width="100%" position="relative">
        <Bar
          backgroundColor="#FFD669"
          width={proportion}
          position="absolute"></Bar>
        <TextContainer>
          <DescConatiner>
            <Emoji>{emoji}</Emoji>
            <Description>{text}</Description>
          </DescConatiner>
          <Count>{votes}</Count>
        </TextContainer>
      </Bar>
    </Container>
  )
}

export default memo(GaugeBar)
