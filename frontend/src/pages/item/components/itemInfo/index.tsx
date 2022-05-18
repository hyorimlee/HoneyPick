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
import {moneyComma} from '~/modules/convert'

function ItemInfo({openSheet, collectionId}: IProps) {
  const {item} = useAppSelector(state => state.item)
  const {userId} = useAppSelector(state => state.user)
  const {currentCollection} = useAppSelector(state => state.collection)

  console.log(item)

  return (
    <InfoContainer>
      <TextContainer>
        <NormalText>{item.brand}</NormalText>
        <BoldText>{item.title}</BoldText>
        {!item.priceAfter ? (
          <RowTextContainer>
            <PriceText>￦</PriceText>
            <PriceText>{moneyComma(item.priceBefore!)}</PriceText>
          </RowTextContainer>
        ) : (
          <RowTextContainer>
            <PriceText>￦</PriceText>
            <PriceTextGray>{moneyComma(item.priceBefore!)}</PriceTextGray>
            <PriceText>{moneyComma(item.priceAfter!)}</PriceText>
          </RowTextContainer>
        )}
        <NormalText>{currentCollection!.title}</NormalText>
      </TextContainer>
      {userId === currentCollection!.user._id ? (
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
