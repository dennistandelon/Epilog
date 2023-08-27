import { StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import Library from '../screens/Library';
import UserData from '../data/UserData';

const TabNavigator = ({route}) => {

  const Tab = createBottomTabNavigator();
  let data = UserData.getUser();
  data.setData(route)

  return (
        <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#CDC9C3'
        },
        tabBarActiveTintColor: '#439A97',
        tabBarInactiveTintColor: '#555555',
      })}
      >
        <Tab.Screen name="Home" component={Home} initialParams={route}/>
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Library" component={Library} />
        <Tab.Screen name="Profile" component={Profile} initialParams={route}/>
      </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({})