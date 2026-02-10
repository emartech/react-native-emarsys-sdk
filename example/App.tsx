import { useEffect, useRef } from 'react';
import { EventSubscription } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Emarsys, { type Event } from 'react-native-emarsys-sdk';
import ConfigScreen from './screens/ConfigScreen';
import PushScreen from './screens/PushScreen';
import InAppScreen from './screens/InAppScreen';
import PredictScreen from './screens/PredictScreen';
import { Alert } from './components';

const Tab = createBottomTabNavigator();

export default function App() {
  const eventHandlerSubscription = useRef<EventSubscription | null>(null);

  useEffect(() => {
    eventHandlerSubscription.current = Emarsys.setEventHandler((event: Event) => {
      Alert('Event', `${event.name}: ${JSON.stringify(event.payload)}`);
    });

    return  () => {
      eventHandlerSubscription.current?.remove();
      eventHandlerSubscription.current = null;
    }
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name={(() => {
              switch (route.name) {
                case 'Config': return 'cog';
                case 'Push': return 'notifications';
                case 'InApp': return 'chatbubbles';
                case 'Predict': return 'cart';
                default: return 'ellipse';
              }
            })()} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Config" component={ConfigScreen} />
        <Tab.Screen name="Push" component={PushScreen} />
        <Tab.Screen name="InApp" component={InAppScreen} />
        <Tab.Screen name="Predict" component={PredictScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
