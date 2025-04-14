import React, { useEffect } from 'react';
import {
  StatusBar,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

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

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Navigation />
    </>
  );
}

export default App;
