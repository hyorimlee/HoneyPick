import * as React from 'react'
import {memo} from 'react'
import {View, Text, Image} from 'react-native'
import RecommendBar from '../../containers/recommendBar'
import {Container, ImageContainer, PriceText, DashedBorder} from './styles'

function Item() {
  return (
    <Container>
      <ImageContainer
        source={require('../../assets/images/sampleimage1.jpg')}
        imageStyle={{
          resizeMode: 'contain',
          borderRadius: 20,
        }}
      />
      <Text>사이트명</Text>
      <Text>아이템 이름</Text>
      <PriceText>가격</PriceText>
      <Text>컬렉션 이름</Text>
      <View style={{
        borderStyle: 'dashed',
        borderBottomWidth: 1,
      }}>
      </View>
      {/* dashedborder 안먹는 중 */}
      <DashedBorder />
      <Text>다른 허니비들이 이 아이템을 추천하는 이유</Text>
      <RecommendBar></RecommendBar>
    </Container>
  )
}

export default memo(Item)