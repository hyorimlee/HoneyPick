import * as React from 'react'
import {memo, useCallback} from 'react'
import {useNavigation} from '@react-navigation/native'
import {Container, ItemsContainer} from './styles'
import {useAppDispatch, useAppSelector} from '../../../../store/types'
import ItemComponent from '../../../collection/components/itemComponent'
import {IComponentProps} from './types'
import {RootStackNavigationProp} from '../../../../../types/navigation'
import {setSelectedItems} from '../../../../store/slices/vote'

function VoteItems({
  onVote,
  accountId,
  collectionId,
  eventId,
  voteId,
}: IComponentProps) {
  const dispatch = useAppDispatch()
  const itemNavigation = useNavigation<RootStackNavigationProp>()
  const {selectedItems} = useAppSelector(state => state.vote)
  const {currentItems} = useAppSelector(state => state.collection)
  const currentEventItems = useAppSelector(state => state.event.event.items)

  const toggleVote = useCallback((item: any) => {
    dispatch(setSelectedItems(item))
  }, [])

  const pushToItemPage = useCallback((itemId: string) => {
    if (collectionId) {
      itemNavigation.push('Item', {itemId: itemId, collectionId: collectionId})
    } else {
      itemNavigation.push('Item', {itemId: itemId, collectionId: ''})
    }
  }, [])

  return (
    <Container>
      {!eventId ? (
        <ItemsContainer>
          {currentItems!.map((item: any, index: number) => {
            return (
              <ItemComponent
                key={index}
                text={item?.title ? item.title : '이름을 찾을 수 없어요.'}
                price={item?.priceBefore ? item.priceBefore : '가격정보 없음'}
                uri={item.thumbnail}
                borderColor={
                  selectedItems?.find(votedItem => votedItem._id === item._id)
                    ? '#F9C12E'
                    : undefined
                }
                borderWidth={
                  selectedItems?.find(votedItem => votedItem._id === item._id)
                    ? 4
                    : undefined
                }
                onPress={
                  onVote
                    ? () => toggleVote(item)
                    : () => pushToItemPage(item._id)
                }
              />
            )
          })}
        </ItemsContainer>
      ) : (
        <ItemsContainer>
          {currentEventItems!.map((item: any, index: number) => {
            return (
              <ItemComponent
                key={index}
                text={item?.title ? item.title : '이름을 찾을 수 없어요.'}
                price={item?.priceBefore ? item.priceBefore : '가격정보 없음'}
                uri={item.thumbnail}
                borderColor={
                  selectedItems?.find(votedItem => votedItem._id === item._id)
                    ? '#F9C12E'
                    : undefined
                }
                borderWidth={
                  selectedItems?.find(votedItem => votedItem._id === item._id)
                    ? 4
                    : undefined
                }
                onPress={
                  onVote
                    ? () => toggleVote(item)
                    : () => pushToItemPage(item._id)
                }
              />
            )
          })}
        </ItemsContainer>
      )}
    </Container>
  )
}

export default memo(VoteItems)
