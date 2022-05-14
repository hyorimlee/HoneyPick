import * as React from 'react'
import {memo, useCallback, useState} from 'react'
import {Text, Image} from 'react-native'
import {IComponentProps} from './types'
import {ItemComponentContainer} from './styles'
import Config from 'react-native-config'

function ItemComponent({
  text,
  price,
  uri,
  onPress,
  onPressIn,
  onPressOut,
  marginHorizontal=5,
  marginVertical=5,
  paddingHorizontal,
  paddingVertical,
  color = '#000000',
  fontSize = 10,
  fontWeight = '500',
  textAlign = 'left',
  backgroundColor='#123456',
  borderRadius = 20,
  borderWidth,
  borderColor,
  flex,
  disabled,
}: IComponentProps) {
  const [isPressing, setIsPressing] = useState(false)

  const pressIn = useCallback(() => {
    setIsPressing(true)
    if (onPressIn) {
      onPressIn()
    }
  }, [onPressIn])

  const pressOut = useCallback(() => {
    setIsPressing(false)
    if (onPressOut) {
      onPressOut()
    }
  }, [onPressOut])

  const press = useCallback(() => {
    setIsPressing(false)
    onPress()
  }, [onPress])

  return (
    <ItemComponentContainer
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      marginHorizontal={marginHorizontal}
      marginVertical={marginVertical}
      paddingHorizontal={paddingHorizontal}
      paddingVertical={paddingVertical}
      color={color}
    >
      <Image
        style={{width: 90, height:90, borderRadius, backgroundColor}}
        source={{uri: `${Config.IMAGE_BASE_URL}/raw/${uri}`}}
        />
      <Text style={{fontSize, textAlign, color, fontWeight}}>{price}</Text>
      <Text style={{fontSize, textAlign, color, fontWeight}}>{text}</Text>
    </ItemComponentContainer>
  )
}

export default memo(ItemComponent)
