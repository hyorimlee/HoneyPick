import * as React from 'react'
import {memo} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
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
  const isValidItem = item.title || item.priceBefore

  return (
    <InfoContainer>
      <TextContainer>
        <NormalText>{item.brand}</NormalText>
        <BoldText>
          {item.title ? item.title : '유효하지 않은 상품입니다.'}
        </BoldText>
        {!item.priceAfter ? (
          <RowTextContainer>
            {item.priceBefore ? (
              <>
                <PriceText>￦</PriceText>
                <PriceText>{moneyComma(item.priceBefore!)}</PriceText>
              </>
            ) : (
              <BoldText>가격 정보가 없습니다.</BoldText>
            )}
          </RowTextContainer>
        ) : (
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <RowTextContainer>
              <PriceText>￦</PriceText>
              <PriceTextGray>{moneyComma(item.priceBefore!)}</PriceTextGray>
              <PriceText>{moneyComma(item.priceAfter!)}</PriceText>
            </RowTextContainer>
            <Text style={{color: '#f9c12e', fontWeight: '700', fontSize: 20}}>
              {item.discountRate}%
            </Text>
          </View>
        )}
        <NormalText>
          {isValidItem
            ? currentCollection!.title
            : '우측 버튼을 눌러 상품을 삭제할 수 있습니다.'}
        </NormalText>
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
