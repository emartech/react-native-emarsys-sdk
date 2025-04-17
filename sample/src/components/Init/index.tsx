import React from 'react';
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

const InitScreen = () => {

  // MARK: - Init *************************************************************************************************************
  const wrapperSetContact = async () => {
    const contactFieldId = 100005878;
    const contactFieldValue = '7c3df9f3';

    try {
      const result = await Emarsys.setContact(contactFieldId, contactFieldValue);
      console.log('setContact Done:', result);
      showAlert('setContact', 'setContact Done.');
    } catch (e) {
      console.log('setContact Fail:', e);
      showAlert('setContact', 'setContact Fail: ' + JSON.stringify(e));
    }
  };

  const wrapperClearContact = async () => {
    try {
      await Emarsys.clearContact();
      console.log('clearContact Done');
      showAlert('clearContact', 'clearContact Done.');
    } catch (e) {
      console.log('clearContact Fail:', e);
      showAlert('clearContact', 'clearContact Fail: ' + JSON.stringify(e));
    }
  };

  const wrapperTrackCustomEvent = async () => {
    const eventName = 'testingEventName';
    const eventAttributes = {
      'customEvent-key1': 'customEvent-value1',
      'customEvent-key2': 'customEvent-value2',
    };

    try {
      const result = await Emarsys.trackCustomEvent(eventName, eventAttributes);
      console.log('trackCustomEvent Done:', result);
      showAlert('trackCustomEvent', 'trackCustomEvent Done.');
    } catch (e) {
      console.log('trackCustomEvent Fail:', e);
      showAlert('trackCustomEvent', 'trackCustomEvent Fail: ' + JSON.stringify(e));
    }
  };

	// MARK: - DeepLink *************************************************************************************************************
  const wrapperTrackDeepLink = async (url: string) => {
    try {
      const result = await Emarsys.trackDeepLink(url);
      console.log('trackDeepLink Done:', url, result);
      showAlert('trackDeepLink', 'trackDeepLink Done.');
    } catch (e) {
      console.log('trackDeepLink Fail:', e);
      showAlert('trackDeepLink', 'trackDeepLink Fail: ' + JSON.stringify(e));
    }
  };

	// MARK: - ApplicationCode and merchantId change *************************************************************************************************************
  const wrapperChangeApplicationCode = async () => {
    const applicationCode = 'EMSF6-F532D';

    try {
      const result = await Emarsys.changeApplicationCode(applicationCode);
      console.log('changeApplicationCode Done:', result);
      showAlert('changeApplicationCode', 'changeApplicationCode Done.');
    } catch (e) {
      console.log('changeApplicationCode Fail:', e);
      showAlert('changeApplicationCode', 'changeApplicationCode Fail: ' + JSON.stringify(e));
    }
  };

  const wrapperChangeMerchantId = async () => {
    const merchantId = '1428C8EE286EC34B';

    try {
      const result = await Emarsys.changeMerchantId(merchantId);
      console.log('changeMerchantId Done:', result);
      showAlert('changeMerchantId', 'changeMerchantId Done.');
    } catch (e) {
      console.log('changeMerchantId Fail:', e);
      showAlert('changeMerchantId', 'changeMerchantId Fail: ' + JSON.stringify(e));
    }
  };

  // MARK: - Config *************************************************************************************************************
	const wrapperGetApplicationCode = async () => {
    try {
      const applicationCode = await Emarsys.getApplicationCode();
      console.log('getApplicationCode Done:', applicationCode);
      showAlert('getApplicationCode', 'getApplicationCode Done: ' + applicationCode);
    } catch (e) {
      console.log('getApplicationCode Fail:', e);
      showAlert('getApplicationCode', 'getApplicationCode Fail: ' + JSON.stringify(e));
    }
  };

  const wrapperGetMerchantId = async () => {
    try {
      const merchantId = await Emarsys.getMerchantId();
      console.log('getMerchantId Done:', merchantId);
      showAlert('getMerchantId', 'getMerchantId Done: ' + merchantId);
    } catch (e) {
      console.log('getMerchantId Fail:', e);
      showAlert('getMerchantId', 'getMerchantId Fail: ' + JSON.stringify(e));
    }
  };

  const wrapperGetClientId = async () => {
    try {
      const clientId = await Emarsys.getHardwareId();
      console.log('getClientId Done:', clientId);
      showAlert('getClientId', 'getClientId Done: ' + clientId);
    } catch (e) {
      console.log('getClientId Fail:', e);
      showAlert('getClientId', 'getClientId Fail: ' + JSON.stringify(e));
    }
  };

  const wrapperGetLanguageCode = async () => {
    try {
      const languageCode = await Emarsys.getLanguageCode();
      console.log('getLanguageCode Done:', languageCode);
      showAlert('getLanguageCode', 'getLanguageCode Done: ' + languageCode);
    } catch (e) {
      console.log('getLanguageCode Fail:', e);
      showAlert('getLanguageCode', 'getLanguageCode Fail: ' + JSON.stringify(e));
    }
  };

  const wrapperGetSdkVersion = async () => {
    try {
      const sdkVersion = await Emarsys.getSdkVersion();
      console.log('getSdkVersion Done:', sdkVersion);
      showAlert('getSdkVersion', 'getSdkVersion Done: ' + sdkVersion);
    } catch (e) {
      console.log('getSdkVersion Fail:', e);
      showAlert('getSdkVersion', 'getSdkVersion Fail: ' + JSON.stringify(e));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>Config</Text>

      <Button title="Set Contact" onPress={wrapperSetContact} />
      <Button title="Clear Contact" onPress={wrapperClearContact} />
      <Button title="Track Custom Event" onPress={wrapperTrackCustomEvent} />
      <Button title="Track Deep Link" onPress={() => wrapperTrackDeepLink('https://emarsys.com')}/>

      <View style={styles.separator} />

      <Button title="Change Application Code" onPress={wrapperChangeApplicationCode} />
      <Button title="Change Merchant Id" onPress={wrapperChangeMerchantId} />
      <Button title="Get Application Code" onPress={wrapperGetApplicationCode} />
      <Button title="Get Merchant Id" onPress={wrapperGetMerchantId} />
      <Button title="Get Client Id" onPress={wrapperGetClientId} />
      <Button title="Get Language Code" onPress={wrapperGetLanguageCode} />
      <Button title="Get Sdk Version" onPress={wrapperGetSdkVersion} />
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

export default InitScreen;
