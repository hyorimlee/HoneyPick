import * as React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import Item from './default'
import SetHoneyItem from './setHoneyItem'

const Stack = createNativeStackNavigator()

function ItemStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Default"
        component={Item}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SetHoneyItem"
        component={SetHoneyItem}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}

export default ItemStack
