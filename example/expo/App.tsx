import { Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Notifications from 'expo-notifications';
import Emarsys from 'react-native-emarsys-sdk';
import CommonApp from './common/App';

export default function App() {
  return (
    <CommonApp
      TabBarIcon={Ionicons}
      requestPushPermission={requestPushPermission}
    />
  );
}

async function requestPushPermission() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('ems_sample_messages', {
      name: 'Messages',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  const { granted } = await Notifications.requestPermissionsAsync();
  if (granted) {
    if (Platform.OS === 'android') {
      const token = await Notifications.getDevicePushTokenAsync();
      await Emarsys.push.setPushToken(token.data);
    } else if (Platform.OS === 'ios') {
      // getDevicePushTokenAsync doesn't resolve on iOS, don't await here
      // Call it and trigger didRegisterForRemoteNotificationsWithDeviceToken in AppDelegate
      Notifications.getDevicePushTokenAsync();
    }
  }

  return granted;
}
