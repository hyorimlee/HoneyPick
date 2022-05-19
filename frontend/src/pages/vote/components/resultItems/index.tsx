import * as React from 'react'
import {memo, useCallback, useState} from 'react'
import {useNavigation} from '@react-navigation/native'
import {
  Container,
  LargeItem,
  MediumItem,
  SmallItem,
  LargeItemFlex,
  LargeItemImage,
  LargeItemInfoContainer,
  MediumItemFlex,
  MediumItemImage,
  MediumItemInfoContainer,
  SmallItemFlex,
  TitleText,
  NormalText,
} from './styles'
import {IComponentProps} from './types'
import {RootStackNavigationProp} from '../../../../../types/navigation'
import Config from 'react-native-config'

function ResultItems({
  accountId,
  collectionId,
  eventId,
  voteId,
  result,
}: IComponentProps) {
  const itemNavigation = useNavigation<RootStackNavigationProp>()

  const pushToItemPage = useCallback((itemId: string) => {
    if (collectionId) {
      itemNavigation.push('Item', {itemId: itemId, collectionId: collectionId})
    } else {
      itemNavigation.push('Item', {itemId: itemId, collectionId: ''})
    }
  }, [])

  return (
    <Container>
      {result.map((item: any, index: number) => {
        if (index === 0) {
          return (
            <LargeItem key={index} onPress={() => pushToItemPage(item._id)}>
              <LargeItemFlex>
                <LargeItemImage
                  source={{
                    uri: `${Config.IMAGE_BASE_URL}/w128/${item.thumbnail}`,
                  }}></LargeItemImage>
                <LargeItemInfoContainer>
                  <TitleText numberOfLines={1}>{item.title}</TitleText>
                  <NormalText>{item.count} 표</NormalText>
                </LargeItemInfoContainer>
              </LargeItemFlex>
            </LargeItem>
          )
        } else if (index === 1 || index === 2) {
          return (
            <MediumItem key={index} onPress={() => pushToItemPage(item._id)}>
              <MediumItemFlex>
                <MediumItemImage
                  source={{
                    uri: `${Config.IMAGE_BASE_URL}/w128/${item.thumbnail}`,
                  }}></MediumItemImage>
                <MediumItemInfoContainer>
                  <TitleText numberOfLines={1}>{item.title}</TitleText>
                  <NormalText>{item.count} 표</NormalText>
                </MediumItemInfoContainer>
              </MediumItemFlex>
            </MediumItem>
          )
        } else {
          return (
            <SmallItem key={index} onPress={() => pushToItemPage(item._id)}>
              <SmallItemFlex>
                <TitleText>
                  {item.title.length < 20
                    ? `${item.title}`
                    : `${item.title.substring(0, 20)}...`}
                </TitleText>
                <NormalText>{item.count} 표</NormalText>
              </SmallItemFlex>
            </SmallItem>
          )
        }
      })}
    </Container>
  )
}

export default memo(ResultItems)
