import * as React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import CreateVote from './createVote'

const Stack = createNativeStackNavigator()

function VoteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CreateVote"
        component={CreateVote}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="VoteResult"
        component={VoteResult}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  )
}

export default VoteStack
