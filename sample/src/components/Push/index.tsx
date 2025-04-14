import React from 'react';
import {
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

const PushScreen = () => {

  // MARK: - Push *************************************************************************************************************
  const wrapperSetPushToken = async () => {
    // TODO: Replace with device token
    // This is just a sample token.
    // In a real application, you would get the device token from the push notification service
    // (APNS for iOS or Firebase for Android)
    const deviceToken = '1234567890';
    try {
      const result = await Emarsys.push.setPushToken(deviceToken);
      console.log('setPushToken Done:', deviceToken, result);
      showAlert('setPushToken', 'setPushToken Done.');
    } catch (e) {
      console.log('setPushToken Fail:', e);
      showAlert('setPushToken', 'setPushToken Fail: ' + JSON.stringify(e));
    }
  };

  const wrapperClearPushToken = async () => {
    try {
      const result = await Emarsys.push.clearPushToken();
      console.log('clearPushToken Done:', result);
      showAlert('clearPushToken', 'clearPushToken Done.');
    } catch (e) {
      console.log('clearPushToken Fail:', e);
      showAlert('clearPushToken', 'clearPushToken Fail: ' + JSON.stringify(e));
    }
  };

  const wrapperGetPushToken = async () => {
    try {
      const pushToken = await Emarsys.push.getPushToken();
      console.log('pushToken Done:', pushToken);
      showAlert('pushToken', 'pushToken Done: ' + pushToken);
    } catch (e) {
      console.log('pushToken Fail:', e);
      showAlert('pushToken', 'pushToken Fail: ' + JSON.stringify(e));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>Push</Text>

      <Button title="Set Push Token" onPress={wrapperSetPushToken} />
      <Button title="Clear Push Token" onPress={wrapperClearPushToken} />
      <Button title="Get Push Token" onPress={wrapperGetPushToken} />
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

export default PushScreen;
