import React from "react"

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicon from "react-native-vector-icons/Ionicons"

import Init from "./components/Init"
import Push from "./components/Push"
import InApp from "./components/InApp"
import Predict from "./components/Predict"

const Tab = createBottomTabNavigator()

export default function Routing() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Init') {
              return <Ionicon name="cog" size={22} color={color} />
            } else if (route.name === 'Push') {
              return <Ionicon name="chatbubbles" size={22} color={color} />;
            } else if (route.name === 'InApp') {
              return <Ionicon name="today" size={22} color={color} />
            } else if (route.name === 'Predict') {
              return <Ionicon name="pricetags" size={22} color={color} />;
            }
          },
        })}
      >
        <Tab.Screen name="Init" component={Init} />
        <Tab.Screen name="Push" component={Push} />
        <Tab.Screen name="InApp" component={InApp} />
        <Tab.Screen name="Predict" component={Predict} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
