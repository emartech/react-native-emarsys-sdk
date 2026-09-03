import { AppRegistry, Platform, type EventSubscription } from 'react-native';
import NativeEmarsys, { type Event } from './native/NativeEmarsys';
import { SILENT_MESSAGE_EVENT_HEADLESS_TASK_NAME } from '../constants'

export default {
  setEventHandler: (handler: (arg: Event) => void | Promise<void>): EventSubscription => {
    const eventSubscription = NativeEmarsys.onEvent(handler);
    NativeEmarsys.setEventHandler();
    return eventSubscription;
  },
  setSilentMessageEventHandler: (handler: (event: Event) => Promise<void>): EventSubscription | undefined => {
    let eventSubscription: EventSubscription | undefined
    // HeadlessTask on Android, EventEmitter on iOS
    if (Platform.OS === 'android') {
      AppRegistry.registerHeadlessTask(SILENT_MESSAGE_EVENT_HEADLESS_TASK_NAME, () => handler);
    } else if (Platform.OS === 'ios') {
      eventSubscription = NativeEmarsys.onSilentMessageEvent(handler);
    }
    NativeEmarsys.setSilentMessageEventHandler();
    return eventSubscription
  },
  setContact: NativeEmarsys.setContact,
  clearContact: NativeEmarsys.clearContact,
  trackCustomEvent: NativeEmarsys.trackCustomEvent,
  trackDeepLink: NativeEmarsys.trackDeepLink
};

export type { Event };

// Track wrapper:init
(async () => {
  const version = require('../../package.json').version;
  let frameworkVersion = require('react-native/package.json').version;
  let type = 'react-native';

  // Check if expo exist
  try {
    frameworkVersion = require('expo/package.json').version;
    type = 'expo';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // No expo
  }

  NativeEmarsys.trackCustomEvent('wrapper:init', { type, version, frameworkVersion });
})();
