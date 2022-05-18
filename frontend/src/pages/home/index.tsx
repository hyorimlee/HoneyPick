import * as React from 'react'
import {memo} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import ProfileStack from './profile'
import RecommendStack from './recommend'
import SearchStack from './search'
import EventStack from './event'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faWandSparkles, faMagnifyingGlass, faCakeCandles } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
const Tab = createBottomTabNavigator()

function Home() {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#FFD669',
          borderTopLeftRadius: 30,
        },
      }}>
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          title: '프로필',
          headerShown: false,
          tabBarActiveTintColor:"#5e5e5e",
          tabBarInactiveTintColor: "#ffffff",
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faUser as IconProp}
              color={focused ? "#7c7c7c" : "#ffffff"}
              size={20}/>
          )
        }}
      />
      <Tab.Screen
        name="Recommand"
        component={RecommendStack}
        options={{
          title: '추천',
          headerShown: false,
          tabBarActiveTintColor:"#5e5e5e",
          tabBarInactiveTintColor: "#ffffff",
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faWandSparkles as IconProp}
              color={focused ? "#7c7c7c" : "#ffffff"}
              size={20}/>
          )
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          title: '검색',
          headerShown: false,
          tabBarActiveTintColor:"#5e5e5e",
          tabBarInactiveTintColor: "#ffffff",
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faMagnifyingGlass as IconProp}
              color={focused ? "#7c7c7c" : "#ffffff"}
              size={20}/>
          )
        }}
      />
      <Tab.Screen
        name="Event"
        component={EventStack}
        options={{
          title: '이벤트',
          headerShown: false,
          tabBarActiveTintColor:"#5e5e5e",
          tabBarInactiveTintColor: "#ffffff",
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faCakeCandles as IconProp}
              color={focused ? "#7c7c7c" : "#ffffff"}
              size={20}/>
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default memo(Home)
