import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicon from 'react-native-vector-icons/Ionicons';

import InitScreen from './components/Init';
import PushScreen from './components/Push';
import InAppScreen from './components/InApp';
import PredictScreen from './components/Predict';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (routeName: string) => ({ color, size }: { color: string; size: number }) => {

  if (routeName === 'Config') {
    return <Ionicon name="cog" size={size} color={color} />;
  } else if (routeName === 'Push') {
    return <Ionicon name="chatbubbles" size={size} color={color} />;
  } else if (routeName === 'InApp') {
    return <Ionicon name="chatbubbles" size={size} color={color} />;
  } else {
    return <Ionicon name="chatbubbles" size={size} color={color} />;
  }
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: getTabBarIcon(route.name),
          headerShown: false,
        })}>
        <Tab.Screen name="Config" component={InitScreen} />
        <Tab.Screen name="Push" component={PushScreen} />
        <Tab.Screen name="InApp" component={InAppScreen} />
        <Tab.Screen name="Predict" component={PredictScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
