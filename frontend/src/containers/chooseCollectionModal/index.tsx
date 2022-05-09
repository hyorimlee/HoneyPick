import * as React from 'react'
import {memo} from 'react'
import {View} from 'react-native'

import BaseButton from '../../components/button/base'
import {itemToCollection} from '../../store/slices/item/asyncThunk'
import { useAppSelector } from '../../store/types'

import RadioGroup from 'react-native-radio-buttons-group'

import {CenteredView, ModalView, NormalText, BoldText, PriceText} from './styles'

function ChooseCollectionModal() {
  const {itemId} = useAppSelector(state => state.item)

  return (
    <CenteredView>
      <ModalView>
        {/* 여기 정보 얼마나 받아올 건지 다시 의논해보기 */}
        <NormalText>컬렉션~~~ 추가~~~</NormalText>
        <BaseButton
          text={'선택된 컬렉션에 아이템 추가하기'}
          onPress={() => itemToCollection({itemId})}
          borderRadius={25}
          marginVertical={10}
          paddingVertical={15}
        />
      </ModalView>
    </CenteredView>
  )
}

export default memo(ChooseCollectionModal)