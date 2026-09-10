import { AppRegistry } from 'react-native';
import Emarsys from '@emartech/react-native-emarsys-sdk';
import App from './App';
import { name as appName } from './app.json';

// Register silent message event handler when the app is killed.
// Must be at module level — outside any React component.
Emarsys.setSilentMessageEventHandler(async (event) => {
  console.log('Silent Message Event', '-', `${event.name}: ${JSON.stringify(event.payload)}`);
});

AppRegistry.registerComponent(appName, () => App);
