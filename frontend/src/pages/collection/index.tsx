import * as React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Collection from './default'
import EditCollection from './editCollection'
import Item from '../item/default'

const Stack = createNativeStackNavigator()

function CollectionStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Default"
        component={Collection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditCollection"
        component={EditCollection}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}

export default CollectionStack
