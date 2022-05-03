import * as React from 'react'
import {memo} from 'react'
import {Text, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import CollectionInfo from '../../../containers/collectionInfo'
import CollectionItems from '../../../containers/collectionItems'
import collectionItems from '../../../containers/collectionItems'

function Collection() {
  return (
    <KeyboardAwareScrollView style={{paddingHorizontal:20, marginTop:30}}>
      <CollectionInfo></CollectionInfo>
      <CollectionItems></CollectionItems>
    </KeyboardAwareScrollView>
  )
}

export default memo(Collection)
