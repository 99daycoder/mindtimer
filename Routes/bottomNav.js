import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../Components/Home';
import Notes from '../Components/Notes';
import { Ionicons } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home-sharp'
                : 'home-outline';
            } else if (route.name === 'Notes') {
              iconName = focused ? 'document-sharp' : 'document-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'rgba(78, 116, 289, 1)',
          tabBarInactiveTintColor: 'grey',
          showIcon: true, 

        })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Notes" component={Notes} />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator