import * as React from 'react'
import {memo, useEffect} from 'react'
import {Text, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import CollectionInfo from '../components/collectionInfo'
import CollectionItems from '../components/collectionItems'
import {useRoute, RouteProp} from '@react-navigation/native'
import {CollectionStackParamList} from '../../../../types/navigation'
import {useDispatch} from 'react-redux'
import {getCollection} from '../../../store/slices/collection/asyncThunk'
import {ProfileStackParamList} from '../../../../types/navigation'
import {useAppSelector} from '../../../store/types'
import {getVote} from '../../../store/slices/vote/asyncThunk'
import {setCurrentVote} from '../../../store/slices/vote'

function Collection() {
  const dispatch = useDispatch()
  const route = useRoute<RouteProp<ProfileStackParamList>>()
  const {accountId, collectionId} = route.params
  const {votes} = useAppSelector(state => state.profile)
  const vote = votes.find(vote => vote.collectionId === collectionId)

  useEffect(() => {
    dispatch(getCollection({accountId: accountId, collectionId: collectionId}))
    if (vote) {
      dispatch(getVote({accountId: accountId, voteId: vote._id}))
    } else {
      dispatch(setCurrentVote({}))
    }
  }, [])

  return (
    <KeyboardAwareScrollView style={{paddingHorizontal: 20, marginTop: 30}}>
      <CollectionInfo></CollectionInfo>
      <CollectionItems></CollectionItems>
    </KeyboardAwareScrollView>
  )
}

export default memo(Collection)
