import { registerRootComponent } from 'expo';
import Emarsys from '@emartech/react-native-emarsys-sdk';
import App from './App';

// Register silent message event handler when the app is killed.
// Must be at module level — outside any React component.
Emarsys.setSilentMessageEventHandler(async (event) => {
  console.log('Silent Message Event', '-', `${event.name}: ${JSON.stringify(event.payload)}`);
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
