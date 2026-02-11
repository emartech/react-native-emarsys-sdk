import { Platform, PermissionsAndroid } from 'react-native';
import * as Notifications from 'expo-notifications';
import Emarsys from 'react-native-emarsys-sdk';
import { ScrollView, Button, Alert, Separator, SectionTitle } from '../components';

export default function PushScreen() {
  return (
    <ScrollView>
      <Button title="Request Push Permission" action={async () => {
        await requestPushPermission();
      }} />
      <Button title="Set Push Token" action={async () => {
        const pushToken = '1234567890'; // Should retrive the actual push token here
        await Emarsys.push.setPushToken(pushToken);
      }} />
      <Button title="Clear Push Token" action={async () => {
        await Emarsys.push.clearPushToken();
      }} />
      <Button title="Get Push Token" action={async () => {
        return await Emarsys.push.getPushToken();
      }} printResult />

      <Separator />

      <SectionTitle title="Geofence" />
      
      <Button title="Request Always Authorization" action={async () => {
        await requestAlwaysAuthorization();
      }} />
      <Button title="Enable" action={async () => {
        await Emarsys.geofence.enable();
      }} />
      <Button title="Disable" action={async () => {
        await Emarsys.geofence.disable();
      }} />
      <Button title="Is Enabled" action={async () => {
        return await Emarsys.geofence.isEnabled();
      }} printResult />
      <Button title="Set Initial Enter Trigger Enabled" action={async () => {
        await Emarsys.geofence.setInitialEnterTriggerEnabled(true);
      }} />
      <Button title="Get Registered Geofences" action={async () => {
        const geofences = await Emarsys.geofence.getRegisteredGeofences();
        return JSON.stringify(geofences);
      }} printResult />

    </ScrollView>
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
  } else {
    Alert('Request Push Permission', 'Push permission denied');
  }
}

async function requestAlwaysAuthorization() {
  if (Platform.OS === 'ios') {
    try {
      const result = await Emarsys.geofence.requestAlwaysAuthorization();
      console.log('Location permission granted:', result);
      Alert('Location Permission', 'Location access granted successfully');
    } catch (e) {
      console.log('Location permission failed:', e);
      Alert('Location Permission', 'Failed to grant location access: ' + JSON.stringify(e));
    }
  } else if (Platform.OS === 'android') {
    try {
      let granted = true;

      const coarse = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
      if (!coarse) {
        const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
        granted = granted && result === PermissionsAndroid.RESULTS.GRANTED;
      }

      const background = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION);
      if (!background) {
        const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION);
        granted = granted && result === PermissionsAndroid.RESULTS.GRANTED;
      }

      const fine = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if (!fine) {
        const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        granted = granted && result === PermissionsAndroid.RESULTS.GRANTED;
      }

      console.log('Location permissions granted:', granted);
      Alert('Location Permission', `Location permissions ${granted ? 'granted successfully' : 'partially denied'}`);
    } catch (e) {
      console.log('Location permission failed:', e);
      Alert('Location Permission', 'Failed to request location permissions: ' + JSON.stringify(e));
    }
  }
}
