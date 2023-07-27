
# EmarsysApp

React Native Application for Emarsys SDK wrapper testing

## Setup

Getting Started with [React Native](https://facebook.github.io/react-native/docs/getting-started "React Native").

1. `$ npm install`
2. `$ npm run dev`

#### iOS
1. `$ cd ios && pod install && cd ..`
2. `$ npm run dev:ipa`

#### Android
1. `$ npm run dev:apk`

## Requirements

- React Native version 0.67.3 or higher.
- The minimum Android version should be at least API level 24. Requires compileSdkVersion 31 or higher.
- The iOS target should be iOS 11 or higher.

#### Native Modules
Emarsys includes Firebase Cloud Messaging (FCM) so that it does not need to be installed additionally. 
Emarsys will retrieve the token from FCM automatically. However, there are situations where we want to 
retrieve the token manually. For this case, a native module is provided and can be implemented the following way:

```
import { NativeModules } from "react-native"

const getFCMToken = async () => await NativeModules.FirebaseMessagingModule.getToken()
```


