import React, { useRef, useState } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Emarsys from 'react-native-emarsys-wrapper';

import showAlert from '../Helpers';

const Button = ({ title, onPress }: { title: string; onPress?: () => void }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const InAppScreen = () => {

  const inlineInAppView = useRef<any>(null);
  const [inlineInAppViewHeight, setInlineInAppViewHeight] = useState(0);

  // MARK: - InApp *************************************************************************************************************
  const wrapperPause = async () => {
    try {
      const result = await Emarsys.inApp.pause();
      console.log('pause Done:', result);
      showAlert('pause', 'pause Done.');
    } catch (e) {
      console.log('pause Fail:', e);
      showAlert('pause', 'pause Fail: ' + JSON.stringify(e));
    }
  };

  const wrapperResume = async () => {
    try {
      const result = await Emarsys.inApp.resume();
      console.log('resume Done:', result);
      showAlert('resume', 'resume Done.');
    } catch (e) {
      console.log('resume Fail:', e);
      showAlert('resume', 'resume Fail: ' + JSON.stringify(e));
    }
  };

  const loadInlineInApp = () => {
    if (inlineInAppView.current) {
      inlineInAppView.current.loadInApp('view-id');
    }
  };

  // MARK: - Inbox *************************************************************************************************************
  const wrapperFetchMessages = async () => {
    try {
      const result = await Emarsys.inbox.fetchMessages();
      console.log('fetchMessages Done:', result);
      showAlert('fetchMessages', 'fetchMessages Done.');
    } catch (e) {
      console.log('fetchMessages Fail:', e);
      showAlert('fetchMessages', 'fetchMessages Fail: ' + JSON.stringify(e));
    }
  };

  const wrapperAddTag = async () => {
    try {
      const tag = 'seen';
      const messageId = '3475573315';
      const result = await Emarsys.inbox.addTag(tag, messageId);
      console.log('addTag Done:', result);
      showAlert('addTag', 'addTag Done.');
    } catch (e) {
      console.log('addTag Fail:', e);
      showAlert('addTag', 'addTag Fail: ' + JSON.stringify(e));
    }
  };

  const wrapperRemoveTag = async () => {
    try {
      const tag = 'seen';
      const messageId = '3475573315';
      const result = await Emarsys.inbox.removeTag(tag, messageId);
      console.log('removeTag Done:', result);
      showAlert('removeTag', 'removeTag Done.');
    } catch (e) {
      console.log('removeTag Fail:', e);
      showAlert('removeTag', 'removeTag Fail: ' + JSON.stringify(e));
    }
  };

  // MARK: - Geofence *************************************************************************************************************
  const wrapperRequestAlwaysAuthorization = async () => {
    if (Platform.OS === 'ios') {
      try {
        const result = await Emarsys.geofence.requestAlwaysAuthorization();
        console.log('requestAlwaysAuthorization Done:', result);
        showAlert('requestAlwaysAuthorization', 'requestAlwaysAuthorization Done.');
      } catch (e) {
        console.log('requestAlwaysAuthorization Fail:', e);
        showAlert('requestAlwaysAuthorization', 'requestAlwaysAuthorization Fail: ' + JSON.stringify(e));
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

        console.log('requestLocationPermissions Done: granted:', granted);
        showAlert('requestLocationPermissions', 'requestLocationPermissions Done.');
      } catch (e) {
        console.log('requestLocationPermissions Fail:', e);
        showAlert('requestLocationPermissions', 'requestLocationPermissions Fail: ' + JSON.stringify(e));
      }
    }
  };

  const wrapperGeofenceEnable = async () => {
    try {
      const result = await Emarsys.geofence.enable();
      console.log('geofence.enable Done:', result);
      showAlert('geofence.enable', 'geofence.enable Done.');
    } catch (e) {
      console.log('geofence.enable Fail:', e);
      showAlert('geofence.enable', 'geofence.enable Fail: ' + JSON.stringify(e));
    }
  };

  const wrapperGeofenceDisable = async () => {
    try {
      const result = await Emarsys.geofence.disable();
      console.log('geofence.disable Done:', result);
      showAlert('geofence.disable', 'geofence.disable Done.');
    } catch (e) {
      console.log('geofence.disable Fail:', e);
      showAlert('geofence.disable', 'geofence.disable Fail: ' + JSON.stringify(e));
    }
  };

  const wrapperGeofenceIsEnabled = async () => {
    try {
      const result = await Emarsys.geofence.isEnabled();
      console.log('geofence.isEnabled Done:', result);
      showAlert('geofence.isEnabled', 'geofence.isEnabled Done.');
    } catch (e) {
      console.log('geofence.isEnabled Fail:', e);
      showAlert('geofence.isEnabled', 'geofence.isEnabled Fail: ' + JSON.stringify(e));
    }
  };

  const wrapperSetInitialEnterTriggerEnabled = async () => {
    try {
      const result = await Emarsys.geofence.setInitialEnterTriggerEnabled(true);
      console.log('geofence.setInitialEnterTrigger Done:', result);
      showAlert('geofence.setInitialEnterTrigger', 'geofence.setInitialEnterTrigger Done.');
    } catch (e) {
      console.log('geofence.setInitialEnterTrigger Fail:', e);
      showAlert('geofence.setInitialEnterTrigger', 'geofence.setInitialEnterTrigger Fail: ' + JSON.stringify(e));
    }
  };

  const wrapperRegisteredGeofences = async () => {
    try {
      const result = await Emarsys.geofence.registeredGeofences();
      console.log('geofence.registeredGeofences Done:', result);
      showAlert('geofence.registeredGeofences', 'geofence.registeredGeofences Done.');
    } catch (e) {
      console.log('geofence.registeredGeofences Fail:', e);
      showAlert('geofence.registeredGeofences', 'geofence.registeredGeofences Fail: ' + JSON.stringify(e));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>InApp</Text>

      <Button title="In-app Resume" onPress={wrapperResume} />
      <Button title="In-app Pause" onPress={wrapperPause} />
      <Button title="Load Inline InApp" onPress={loadInlineInApp} />
      <Emarsys.InlineInAppView
            ref={inlineInAppView}
            style={{ width: '100%', height: inlineInAppViewHeight }}
            onAppEvent={(eventName: string, payload: any) => {
              showAlert(eventName, JSON.stringify(payload));
            }}
            onCompleted={(error: any) => {
              if (error == null) {
                setInlineInAppViewHeight(125);
              } else {
                console.log(error);
              }
            }}
            onClose={() => {
              setInlineInAppViewHeight(0);
            }}
          />

      <View style={styles.separator} />

      <Button title="Inbox Fetch Messages" onPress={wrapperFetchMessages} />
      <Button title="Inbox Add Tag" onPress={wrapperAddTag} />
      <Button title="Inbox Remove Tag" onPress={wrapperRemoveTag} />

      <View style={styles.separator} />

      <Button title={Platform.OS === 'ios' ? 'Request Always Authorization' : 'Request location permissions'} onPress={wrapperRequestAlwaysAuthorization} />
      <Button title="Geofence Enable" onPress={wrapperGeofenceEnable} />
      <Button title="Geofence Disable" onPress={wrapperGeofenceDisable} />
      <Button title="Geofence isEnabled" onPress={wrapperGeofenceIsEnabled} />
      <Button title="Geofence Set Initial Enter Trigger Enabled" onPress={wrapperSetInitialEnterTriggerEnabled} />
      <Button title="Geofence Registered Geofences" onPress={wrapperRegisteredGeofences} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 12,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'flex-start',
    maxWidth: 420,
  },
  button: {
    backgroundColor: '#595959',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 24,
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  separator: {
    marginTop: 24,
    width: '100%',
    height: 1,
    maxWidth: 420,
    backgroundColor: '#595959',
  },
});

export default InAppScreen;
