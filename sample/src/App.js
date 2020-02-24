import React, { Component } from 'react';

import { Linking, Platform } from 'react-native';

import { Provider as StoreProvider } from 'mobx-react';

import store from './store';
import Auth from './store/modules/Auth';

import Routing from './Routing';

import Navigation from './Navigation';

import Emarsys from 'react-native-emarsys-wrapper';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/messaging';

let fcmToken = null;

export default class App extends Component {
  saveToken(token) {
    console.log('+++ FCM. saveToken: ', token);

    if (!token) return false;

    Auth.messageToken = token;
  }

  async getToken() {
    fcmToken = await firebase.messaging().getToken();

    if (fcmToken) {
      console.log('+++ FCM. fcmToken: ', fcmToken);

      this.saveToken(fcmToken);
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      console.log('+++ FCM. User has authorised  ');
      this.getToken();
    } catch (error) {
      console.log('+++ FCM. User has rejected permissions:  ', error);
    }
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();

    if (enabled) {
      console.log('+++ FCM. permissions granted: ', enabled);
      this.getToken();
    } else {
      console.log('+++ FCM. permissions not granted');
      this.requestPermission();
    }
  }

  async tokenRefreshListener() {
    firebase.messaging().onTokenRefresh(token => {
      if (token) {
        console.log('+++ FCM onTokenRefresh: ', token);
        fcmToken = token;

        this.saveToken(fcmToken);
      }
    });
  }

  async messageListener() {
    firebase.messaging().onMessage(async remoteMessage => {
      console.log('+++ FCM onMessage: ', remoteMessage);

      if (remoteMessage) {
        console.log('+++ FCM onMessage: ', remoteMessage.data ? remoteMessage.data : 'No message');
      }
    });
  }

  async componentDidMount() {
    this.wrapperInit(() => this.linkingMount());

    this.checkPermission();

    this.tokenRefreshListener();

    this.messageListener();
  }

  componentWillUnmount() {
    this.linkingUnMount();

    this.tokenRefreshListener();

    this.messageListener();
  }

  linkingMount(callback) {
    if (Platform.OS === 'ios') {
      Linking.addEventListener('url', this.handleNavigation);
    } else {
      Linking.getInitialURL().then(url => {
        //console.log("****** REACT HANDLE DEEPlink ANDROID", url)

        if (url) {
          Auth.deepLink = url;
        }
      });
    }

    Boolean(callback) && callback();
  }

  linkingUnMount() {
    if (Platform.OS === 'ios') {
      Linking.removeEventListener('url', this.handleNavigation);
    }
  }

  handleNavigation = e => {
    //console.log("****** REACT HANDLE DEEPlink IOS", e.url )

    if (e && e.url) {
      Auth.deepLink = e.url;
    }
  };

  // MARK: - Init *************************************************************************************************************

  async wrapperInit(callback) {
    let applicationCode = 'EMSF6-F532D';
    let contactFieldId = 3772;
    let predictMerchantId = '1A517D7BD6EAF712';

    try {
      let config = await Emarsys.init(applicationCode, contactFieldId, predictMerchantId);

      console.log('Init Done: ', config);

      Auth.init = true;

      Boolean(callback) && callback();
    } catch (e) {
      console.log('Init Fail: ', e);
    }

    let contactFieldValue = "second@email-test.com"
		try {
			let result = await Emarsys.setContact(contactFieldValue)
      console.log("setContact Done: ", result)
			showAlert( "setContact", "setContact Done.", false,  Boolean( callback ) && callback() )
		} catch (e) {
			console.log("setContact Fail: ", e)
			showAlert( "setContact", "setContact Fail: ", e )
		}
  }

  render() {
    // ****************************************************************************************************
    console.disableYellowBox = true;

    return (
      <StoreProvider {...store}>
        <Routing
          onNavigationStateChange={(prevState, currentState) => {
            // console.log("prevState", prevState)
            // console.log("currentState", currentState)
          }}
          ref={navigatorRef => {
            Navigation.setTopLevelNavigator(navigatorRef);
          }}
        />
      </StoreProvider>
    );
  }
}
