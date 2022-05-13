import * as React from 'react'
import {memo} from 'react'
import {TouchableOpacity} from 'react-native'
import {useAppSelector} from '~/store/types'
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {
  BoldText,
  NormalText,
  RowTextContainer,
  TextContainer,
} from '../../styles'
import {InfoContainer, PriceText, PriceTextGray} from './styles'
import {IProps} from './types'

function ItemInfo({openSheet}: IProps) {
  const {item, review} = useAppSelector(state => state.item)
  const {userId} = useAppSelector(state => state.user)

  return (
    <InfoContainer>
      <TextContainer>
        <NormalText>{item.brand}</NormalText>
        <BoldText>{item.title}</BoldText>
        {item.priceAfter !== 0 ? (
          <RowTextContainer>
            <PriceText>￦</PriceText>
            <PriceText>{item.priceBefore}</PriceText>
          </RowTextContainer>
        ) : (
          <RowTextContainer>
            <PriceText>￦</PriceText>
            <PriceTextGray>{item.priceBefore}</PriceTextGray>
            <PriceText>{item.priceAfter}</PriceText>
          </RowTextContainer>
        )}
        <NormalText>컬렉션 이름</NormalText>
      </TextContainer>
      {userId !== review?.user ? (
        <TouchableOpacity onPress={openSheet}>
          <FontAwesomeIcon
            icon={faEllipsisVertical as IconProp}
            color="#C4C4C4"
            size={24}
            style={{marginTop: 15}}
          />
        </TouchableOpacity>
      ) : null}
    </InfoContainer>
  )
}

export default memo(ItemInfo)
