import * as React from 'react'
import {memo, useCallback, useState} from 'react'
import {Text, Image} from 'react-native'
import {IComponentProps} from './types'
import {ItemComponentContainer} from './styles'
import Config from 'react-native-config'
import {moneyComma, stringSlice} from '~/modules/convert'

function ItemComponent({
  text,
  price,
  uri,
  onPress,
  marginHorizontal,
  marginVertical,
  paddingHorizontal,
  paddingVertical,
  color = '#000000',
  textAlign = 'left',
  backgroundColor = '#123456',
  borderRadius = 20,
  borderWidth = 4,
  borderColor,
}: IComponentProps) {
  const press = useCallback(() => {
    onPress()
  }, [onPress])

  return (
    <ItemComponentContainer
      onPress={press}
      marginHorizontal={marginHorizontal}
      marginVertical={marginVertical}
      paddingHorizontal={paddingHorizontal}
      paddingVertical={paddingVertical}
      color={color}>
      <Image
        style={{
          width: 120,
          height: 120,
          borderRadius,
          backgroundColor,
          borderColor,
          borderWidth,
        }}
        source={{uri: `${Config.IMAGE_BASE_URL}/raw/${uri}`}}
      />
      <Text style={{fontSize: 14, fontWeight: '600', textAlign, color}}>
        {moneyComma(price)}
      </Text>
      <Text style={{fontSize: 12, textAlign, color}}>
        {stringSlice(text, 22)}
      </Text>
    </ItemComponentContainer>
  )
}

export default memo(ItemComponent)
