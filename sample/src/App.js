import React, { Component } from 'react';

import { Linking, Platform } from 'react-native';

import { Provider as StoreProvider } from 'mobx-react';

import store from './store';
import Auth from './store/modules/Auth';

import Routing from './Routing';

import Navigation from './Navigation';

import Emarsys from "react-native-emarsys-wrapper"

export default class App extends Component {

  constructor() {
    super();
    Emarsys.setEventHandler(function (eventName, payload) {
      showAlert(eventName, JSON.stringify(payload))
    });
  }

  async componentDidMount() {
    this.linkingMount();
  }

  componentWillUnmount() {
    this.linkingUnMount();
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

  render() {
    return (
      <StoreProvider {...store}>
        <Routing
          onNavigationStateChange={(prevState, currentState) => {
            // console.log("prevState", prevState)
            // console.log("currentState", currentState)
          }}
          innerRef={navigatorRef => {
            Navigation.setTopLevelNavigator(navigatorRef);
          }}
        />
      </StoreProvider>
    );
  }
}
