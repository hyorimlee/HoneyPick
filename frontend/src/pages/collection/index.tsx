import * as React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Collection from './default'
import EditCollection from './editCollection'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../../types/navigation'
const Stack = createNativeStackNavigator()

function CollectionStack() {
  const route = useRoute<RouteProp<RootStackParamList, 'Collection'>>()
  const {accountId, collectionId} = route.params!

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Default"
        component={Collection}
        options={{headerShown: false}}
        initialParams={{accountId, collectionId}}
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
