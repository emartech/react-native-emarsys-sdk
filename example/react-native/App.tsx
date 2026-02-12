import { Platform, PermissionsAndroid } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Ionicons } from '@react-native-vector-icons/ionicons';
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
  let granted = false;
  if (Platform.OS === 'android') {
    const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    granted = result === PermissionsAndroid.RESULTS.GRANTED;
    // require firebase instead of import to avoid error on iOS
    const token = await require('@react-native-firebase/messaging').default().getToken();
    await Emarsys.push.setPushToken(token);

  } else if (Platform.OS === 'ios') {
    const result = await PushNotificationIOS.requestPermissions();
    granted = (result.alert || result.badge || result.sound) ?? false;
    // The push token will be set in AppDelegate's didRegisterForRemoteNotificationsWithDeviceToken, no need to get it here
  }

  return granted;
}
