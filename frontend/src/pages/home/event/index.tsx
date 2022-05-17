import * as React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import EventItem from './eventItem'
import EventList from './default'
import {useRoute, RouteProp} from '@react-navigation/native'
import {RootStackParamList} from '~/../types/navigation'

const Stack = createNativeStackNavigator()

function EventStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Default"
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
