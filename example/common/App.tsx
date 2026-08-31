import { useEffect, useRef } from 'react';
import { EventSubscription } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Emarsys, { type Event } from '@emartech/react-native-emarsys-sdk';
import ConfigScreen from './ConfigScreen';
import PushScreen from './PushScreen';
import InAppScreen from './InAppScreen';
import PredictScreen from './PredictScreen';
import { Alert } from './Components';

const Tab = createBottomTabNavigator();

export default function App(
  { TabBarIcon, requestPushPermission }: { TabBarIcon: any, requestPushPermission: () => Promise<boolean> }) {
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
            return <TabBarIcon name={(() => {
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
        <Tab.Screen name="Push" children={() => <PushScreen requestPushPermission={requestPushPermission} />} />
        <Tab.Screen name="InApp" component={InAppScreen} />
        <Tab.Screen name="Predict" component={PredictScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
