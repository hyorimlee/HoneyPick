import * as React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import VoteResult from './voteResult'
import { useRoute, RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../types/navigation'

const Stack = createNativeStackNavigator()

function VoteStack() {
  const route = useRoute<RouteProp<RootStackParamList, 'Vote'>>()
  // const {accountId, collectionId} = route.params!

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VoteResult"
        component={VoteResult}
        options={{headerShown: false}}
        // initialParams={accountId, collectionId}
      />
    </Stack.Navigator>
  )
}

export default VoteStack
