import * as React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import VoteResult from './voteResult'
import Vote from './default'
import { useRoute, RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../types/navigation'

const Stack = createNativeStackNavigator()

function VoteStack() {
  const route = useRoute<RouteProp<RootStackParamList, 'Vote'>>()
  const {accountId, collectionId, voteId, isClosed} = route.params!

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Default"
        component={isClosed ? VoteResult : Vote}
        options={{headerShown: false}}
        initialParams={{accountId, collectionId, voteId}}
      />
      <Stack.Screen
        name="VoteResult"
        component={VoteResult}
        options={{headerShown: false}}
        initialParams={{accountId, collectionId, voteId}}
      />
    </Stack.Navigator>
  )
}

export default VoteStack
