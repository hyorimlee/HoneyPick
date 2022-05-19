import * as React from 'react'
import {memo, useCallback, useState} from 'react'
import {Text, Image, Dimensions} from 'react-native'
import {IComponentProps} from './types'
import {ItemComponentContainer, ItemInfoContainer} from './styles'
import Config from 'react-native-config'
import {moneyComma, stringSlice} from '~/modules/convert'

const {width} = Dimensions.get('window')

function ItemComponent({
  text,
  price,
  uri,
  isRecommend,
  onPress,
  marginHorizontal,
  marginVertical,
  paddingHorizontal,
  paddingVertical,
  borderColor,
  borderWidth,
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
          width: width * 0.25,
          height: width * 0.25,
          borderRadius: 10,
          borderColor: borderColor ? borderColor : '#C4C4C4',
          borderWidth: borderWidth ? borderWidth : 1,
        }}
        source={{uri: `${Config.IMAGE_BASE_URL}/w128/${uri}`}}
      />
      <ItemInfoContainer>
        <Text style={{fontSize: 14, fontWeight: '600', textAlign, color, flex: 1}}>
          {moneyComma(price)}
        </Text>
        {isRecommend === 1 ?
          <Image
          style={{
            flex: 0,
            width: '20%',
            height: '100%',
          }}
          source={require('../../../../assets/images/goodstamp.png')}
          /> : null
        }
        {isRecommend === 2 ?
          <Image
          style={{
            flex: 0,
            width: '20%',
            height: '100%',
          }}
          source={require('../../../../assets/images/honeystamp.png')}
          /> : null
        }
      </ItemInfoContainer>
      <Text style={{fontSize: 12, textAlign, color}}>
        {stringSlice(text, 18)}
      </Text>
    </ItemComponentContainer>
  )
}

export default memo(ItemComponent)
