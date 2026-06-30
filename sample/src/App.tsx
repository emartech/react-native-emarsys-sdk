import React, { useEffect } from 'react';
import {
  StatusBar,
  useColorScheme,
} from 'react-native';

import Emarsys from 'react-native-emarsys-wrapper';
import showAlert from './components/Helpers';
import Navigation from './Navigation';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    Emarsys.setEventHandler(function (eventName, payload) {
      showAlert(eventName, JSON.stringify(payload));
    });

    return () => {

    };
  }, []);

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <Navigation />
    </>
  );
}

export default App;
