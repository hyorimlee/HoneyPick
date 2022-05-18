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
  marginHorizontal = 5,
  marginVertical = 5,
  paddingHorizontal,
  paddingVertical,
  color = '#000000',
  textAlign = 'left',
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
          width: 90,
          height: 90,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#C4C4C4',
        }}
        source={{uri: `${Config.IMAGE_BASE_URL}/raw/${uri}`}}
      />
      <Text style={{fontSize: 14, fontWeight: '600', textAlign, color}}>
        {moneyComma(price)}
      </Text>
      <Text style={{fontSize: 12, textAlign, color}}>
        {stringSlice(text, 18)}
      </Text>
    </ItemComponentContainer>
  )
}

export default memo(ItemComponent)
