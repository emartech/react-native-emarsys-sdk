import { Platform, PermissionsAndroid } from 'react-native';
import Emarsys from 'react-native-emarsys-sdk';
import { ScrollView, Button, Alert, Separator, SectionTitle } from './Components';

export default function PushScreen({ requestPushPermission }: { requestPushPermission: () => Promise<boolean> }) {
  return (
    <ScrollView>
      <Button title="Request Push Permission" action={async () => {
        if (!(await requestPushPermission())) {
          Alert('Request Push Permission', 'Push permission denied');
        }
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
      
      <Button title="Request Location Permission" action={async () => {
        await requestLocationPermission();
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

async function requestLocationPermission() {
  if (Platform.OS === 'android') {
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

    if (!granted) {
      Alert('Request Location Permission', 'Location permissions (partially) denied');
    }

  } else if (Platform.OS === 'ios') {
    // Only available on iOS
    await Emarsys.geofence.requestAlwaysAuthorization();
  }
}
