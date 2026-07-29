# Migration Guide: Moving to React Native New Architecture Support

This guide will help you migrate from the legacy React Native Emarsys SDK implementation to the version that supports both Expo and the React Native New Architecture.

## Overview

The updated SDK introduces several key improvements:
- **Expo support** with plugin configuration
- **Updated method signatures** for consistency
- **New initialization approach** via `RNEmarsys.setup()`
- **Enhanced Inline InApp** implementation

---

## Installation Changes

### Expo Projects (NEW)

The SDK now supports Expo through a plugin configuration in `app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "react-native-emarsys-sdk",
        {
          "applicationCode": <APPLICATION_CODE: STRING>,
          "merchantId": <MERCHANT_ID: STRING>,
          "enableConsoleLogging": <ENABLE_CONSOLE_LOGGING: BOOL>,
          "androidGoogleServicesJsonPath": <ANDROID_GOOGLE_SERVICES_JSON_PATH: STRING>,
          "androidSmallNotificationIconPath": <ANDROID_SMALL_NOTIFICATION_ICON_PATH: STRING>,
          "androidSharedPackageNames": <ANDROID_SHARED_PACKAGE_NAMES: LIST>,
          "androidSharedSecret": <ANDROID_SHARED_SECRET: STRING>,
          "iosSharedKeychainAccessGroup": <IOS_SHARED_KEYCHAIN_ACCESS_GROUP: STRING>
        }
      ]
    ]
  }
}
```

After configuration, run:
```bash
npx expo prebuild
```

### Bare React Native Projects

Installation remains similar, but with updated native initialization code.

---

## Native Integration Changes

### iOS Changes

#### Old Initialization (Home.md)
```objective-c
EMSConfig *config = [EMSConfig makeWithBuilder:^(EMSConfigBuilder * builder) {
  [builder setMobileEngageApplicationCode:@<APPLICATION_CODE: STRING>];
  [builder setMerchantId:@<MERCHANT_ID: STRING>];
  [builder enableConsoleLogLevels:<ENABLE_CONSOLE_LOG_LEVELS: ARRAY>];
  [builder setSharedKeychainAccessGroup:@<IOS_SHARED_KEYCHAIN_ACCESS_GROUP: STRING>];
}];
[Emarsys setupWithConfig:config];
UNUserNotificationCenter.currentNotificationCenter.delegate = [Emarsys push];

RNEmarsysEventHandler *rnEMSEventHandler = [RNEmarsysEventHandler allocWithZone: nil];
[rnEMSEventHandler setEventHandlers];
```

#### New Initialization (New-Architecture-and-Expo-framework.md)
```objective-c
EMSConfig *config = [EMSConfig makeWithBuilder:^(EMSConfigBuilder * builder) {
  [builder setMobileEngageApplicationCode:@<APPLICATION_CODE: STRING>];
  [builder setMerchantId:@<MERCHANT_ID: STRING>];
  [builder enableConsoleLogLevels:<ENABLE_CONSOLE_LOG_LEVELS: ARRAY>];
  [builder setSharedKeychainAccessGroup:@<IOS_SHARED_KEYCHAIN_ACCESS_GROUP: STRING>];
}];
[Emarsys setupWithConfig:config];
UNUserNotificationCenter.currentNotificationCenter.delegate = [Emarsys push];
[RNEmarsys setup];
```

**Key changes:**
- Replace `RNEmarsysEventHandler` manual initialization with `[RNEmarsys setup]`

#### Swift Example
**Old:**
```swift
let rnEMSEventHandler = RNEmarsysEventHandler()
rnEMSEventHandler.setEventHandlers()
```

**New:**
```swift
RNEmarsys.setup()
```

### Android Changes

#### Old Initialization (Home.md)
```java
EmarsysConfig config = new EmarsysConfig.Builder()
    .application(this)
    .applicationCode(<APPLICATION_CODE: STRING>)
    .merchantId(<MERCHANT_ID: STRING>)
    .enableVerboseConsoleLogging()
    .sharedPackageNames(<SHARED_PACKAGE_NAMES: LIST>)
    .sharedSecret(<SHARED_SECRET: STRING>)
    .build();
Emarsys.setup(config);

RNEmarsysEventHandler eventHandler = RNEmarsysEventHandler.getInstance();
eventHandler.setEventHandlers();
```

#### New Initialization (New-Architecture-and-Expo-framework.md)
```java
EmarsysConfig config = new EmarsysConfig.Builder()
    .application(this)
    .applicationCode(<APPLICATION_CODE: STRING>)
    .merchantId(<MERCHANT_ID: STRING>)
    .enableVerboseConsoleLogging()
    .sharedPackageNames(<SHARED_PACKAGE_NAMES: LIST>)
    .sharedSecret(<SHARED_SECRET: STRING>)
    .build();
Emarsys.setup(config);
RNEmarsys.setup()
```

**Key changes:**
- Replace `RNEmarsysEventHandler` with `RNEmarsys.setup()`

#### Kotlin Example
**Old:**
```kotlin
val eventHandler = RNEmarsysEventHandler.getInstance()
eventHandler.setEventHandlers()
```

**New:**
```kotlin
RNEmarsys.setup()
```

---

## API Changes

### Import Statement

The package has been renamed from `react-native-emarsys-wrapper` to `react-native-emarsys-sdk`.

> **Note:** The package name might change in the future.

**Old:**
```javascript
import Emarsys from 'react-native-emarsys-wrapper';
```

**New:**
```javascript
import Emarsys from 'react-native-emarsys-sdk';
```

### Contact Management

The contact management APIs remain unchanged:
- `await Emarsys.setContact(contactFieldId, contactFieldValue)`
- `await Emarsys.clearContact()`

### Tracking Custom Events

The tracking API remains unchanged:
- `await Emarsys.trackCustomEvent(eventName, eventAttributes)`

### Push Token Methods

Method renamed from `pushToken()` to `getPushToken()`:

**Old:**
```javascript
await Emarsys.push.pushToken();
```

**New:**
```javascript
await Emarsys.push.getPushToken();
```

### Inline InApp View

**Old:**
```javascript
<Emarsys.InlineInAppView ref={this.inlineInAppView}
  style={{width: '100%', height: this.state.inlineInAppViewHeight}}
  onAppEvent={(eventName, payload) => {
    showAlert(eventName, JSON.stringify(payload))
  }}
  onCompleted={error => {
    if (error == null) {
      this.setState({ inlineInAppViewHeight: 125 })
    } else {
      console.log(error)
    }
  }}
  onClose={_ => {
    this.setState({ inlineInAppViewHeight: 0 })
  }} />

// Loading
this.inlineInAppView.current.loadInApp('view-id')
```

**New:**
```javascript
import { InlineInAppView } from 'react-native-emarsys-sdk';

const inlineInAppView = useRef<any>(null);
const [inlineInAppViewHeight, setInlineInAppViewHeight] = useState(0);

<InlineInAppView
  ref={inlineInAppView}
  style={{ width: '100%', height: inlineInAppViewHeight }}
  onEvent={(event) => {
    Alert(event.nativeEvent.name, JSON.stringify(event.nativeEvent.payload))
  }}
  onCompletion={(event) => {
    if (!event.nativeEvent.error) {
      setInlineInAppViewHeight(125);
    } else {
      console.log(event.nativeEvent.error)
    }
  }}
  onClose={() => {
    setInlineInAppViewHeight(0);
  }}
/>
```

**Key changes:**
- Import `InlineInAppView` separately
- `onAppEvent` renamed to `onEvent`
- Event structure changed to `event.nativeEvent.name` and `event.nativeEvent.payload`

### Predict Methods

#### Track Cart

The tracking API remains unchanged:
```javascript
await Emarsys.predict.trackCart(items);
```

#### Recommend Products

This is one of the most significant API changes.

**Old:**
```javascript
const logic = 'HOME';
const logicOptions = {
  variants: ['1', '2', '3'],
};
const recommendationOptions = {
  availabilityZone: 'en',
  limit: 5,
  filters: [{ 
    type: 'exclude', 
    field: 'category',
    comparison: 'is',
    expectations: 'Shoes>Pump'
  },{
    type: 'exclude',
    field: 'category',
    comparison: 'IN',
    expectations: [ 'Shoes>Golf', 'For Women>Shoes>Golf']
  }]
}

await Emarsys.predict.recommendProducts(logic, logicOptions, recommendationOptions);
```

**New:**
```javascript
const logic = Logic.home(['1', '2', '3']);
const filters = [
  Filter.exclude.isValue('category', 'Shoes>Pump'),
  Filter.exclude.inValues('category', [ 'Shoes>Golf', 'For Women>Shoes>Golf'])
];
const limit = 5;
const availabilityZone = 'en';

await Emarsys.predict.recommendProducts(logic, filters, limit, availabilityZone);
```

**Key changes:**
- Logic is now defined using `Logic` class methods instead of strings
- Filters use `Filter` class with chainable methods
- Parameters are now separate instead of nested objects
- Available logic methods:
  - `Logic.search(searchTerm)`
  - `Logic.cart(items)`
  - `Logic.related(itemId)`
  - `Logic.category(categoryPath)`
  - `Logic.alsoBought(itemId)`
  - `Logic.popular(categoryPath)`
  - `Logic.personal(variants)`
  - `Logic.home(variants)`

#### Logic Options Removed

The `logicOptions` parameter structure has been simplified. Instead of:
```javascript
let logicOptions = {
  variants: ['1', '2', '3']
}
```

Pass variants directly to the logic method:
```javascript
const logic = Logic.home(['1', '2', '3']);
```

#### Recommendation Options Split

Instead of a single `recommendationOptions` object, parameters are now separate:
- `filters` (array)
- `limit` (number)
- `availabilityZone` (string)

### Config Methods

**Old:**
```javascript
await Emarsys.changeApplicationCode(applicationCode);
await Emarsys.changeMerchantId(merchantId);
await Emarsys.getApplicationCode();
await Emarsys.getMerchantId();
await Emarsys.getContactFieldId();
await Emarsys.getHardwareId();
await Emarsys.getLanguageCode();
await Emarsys.getSdkVersion();
```

**New:**
```javascript
await Emarsys.config.changeApplicationCode(applicationCode);
await Emarsys.config.changeMerchantId(merchantId);
await Emarsys.config.getApplicationCode();
await Emarsys.config.getMerchantId();
await Emarsys.config.getContactFieldId();
await Emarsys.config.getClientId(); // NEW - replaces getHardwareId
await Emarsys.config.getLanguageCode();
await Emarsys.config.getSdkVersion();
await Emarsys.config.getRNWrapperVersion(); // NEW
```

**Key changes:**
- All config methods moved to `Emarsys.config` namespace
- `getHardwareId()` renamed to `getClientId()`
- New method: `getRNWrapperVersion()`

### Inbox Methods

**Old:**
```javascript
const tag = 'seen';
const messageId = '12345';
await Emarsys.inbox.removeTag(tag, messageId);
```

**New:**
```javascript
const tag = Tag.seen;
const messageId = '12345';
await Emarsys.inbox.removeTag(tag, messageId);
```

**Key changes:**
- Tags now use `Tag` enum/constant (e.g., `Tag.seen`, `Tag.opened`, `Tag.pinned`, `Tag.deleted`) instead of strings

### Geofence Methods

Method renamed from `registeredGeofences()` to `getRegisteredGeofences()`:

**Old:**
```javascript
await Emarsys.geofence.registeredGeofences();
```

**New:**
```javascript
await Emarsys.geofence.getRegisteredGeofences();
```

---

## Summary of Breaking Changes

### Namespace Changes
- Config methods: `Emarsys.getXXX()` → `Emarsys.config.getXXX()`
- Push token: `Emarsys.push.pushToken()` → `Emarsys.push.getPushToken()`
- Geofence: `Emarsys.geofence.registeredGeofences()` → `Emarsys.geofence.getRegisteredGeofences()`
- Hardware ID: `Emarsys.getHardwareId()` → `Emarsys.config.getClientId()`

### Native Initialization
- **iOS:** `RNEmarsysEventHandler` → `RNEmarsys.setup()`
- **Android:** `RNEmarsysEventHandler` → `RNEmarsys.setup()`

### Event Handler
- Event structure: `(eventName, payload)` → `(event: Event)` with `event.name` and `event.payload`

### Inline InApp
- Import separately: `import { InlineInAppView } from 'react-native-emarsys-sdk'`
- Loading: `ref.current.loadInApp(viewId)` → `Emarsys.inApp.loadInlineInApp(ref.current, viewId)`

### Predict API
- Logic: String literals → `Logic.xxx()` methods
- Parameters: Nested objects → Separate parameters
- Logic options embedded in logic methods

### Package Name
- Old: `react-native-emarsys-wrapper`
- New: `react-native-emarsys-sdk`
