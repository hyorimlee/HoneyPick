import * as React from 'react'
import {memo} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import ProfileStack from './profile'
import RecommendStack from './recommend'
import SearchStack from './search'
import EventStack from './event'

const Tab = createBottomTabNavigator()

function Home() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#FFD669',
          borderTopLeftRadius: 30,
        },
      }}>
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{title: '프로필', headerShown: false}}
      />
      <Tab.Screen
        name="Recommand"
        component={RecommendStack}
        options={{title: '추천', headerShown: false}}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{title: '검색', headerShown: false}}
      />
      <Tab.Screen
        name="Event"
        component={EventStack}
        options={{title: '이벤트', headerShown: false}}
      />
    </Tab.Navigator>
  )
}

export default memo(Home)
