import * as React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import EventItem from './eventItem'
import EventList from './default'

const Stack = createNativeStackNavigator()

function EventStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EventDefault"
        component={EventList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EventItem"
        component={EventItem}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}

export default EventStack
