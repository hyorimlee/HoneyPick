import * as React from 'react'
import {memo, useEffect} from 'react'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import CollectionInfo from './components/collectionInfo'
import CollectionItems from './components/collectionItems'
import {useRoute, RouteProp, useIsFocused} from '@react-navigation/native'
import {CollectionStackParamList} from './types'
import {getCollection} from '~/store/slices/collection/asyncThunk'
import {useAppSelector, useAppDispatch} from '~/store/types'

function Collection() {
  const dispatch = useAppDispatch()
  const {isModal} = useAppSelector(state => state.ui)
  const isFocused = useIsFocused()
  const route = useRoute<RouteProp<CollectionStackParamList>>()
  const {accountId, collectionId} = route.params!

  useEffect(() => {
    if (isFocused && !isModal) {
      dispatch(getCollection({accountId, collectionId}))
    }
  }, [isFocused, isModal])

  return (
    <>
      <KeyboardAwareScrollView style={{paddingHorizontal: 20, marginTop: 30}}>
        <CollectionInfo
          accountId={accountId}
          collectionId={collectionId}></CollectionInfo>
        <CollectionItems
          accountId={accountId}
          collectionId={collectionId}></CollectionItems>
      </KeyboardAwareScrollView>
    </>
  )
}

export default memo(Collection)
