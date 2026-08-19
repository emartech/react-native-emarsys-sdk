#### Contents

- [Installation](#installation)
  - [Expo](#expo)
    - [Android Kotlin compatibility](#android-kotlin-compatibility)
  - [Bare React Native](#bare-react-native)
    - [Setup](#setup)
      - [iOS](#ios)
        - [SDK Initialisation](#sdk-initialisation)
      - [Android](#android)
        - [Kotlin compatibility](#kotlin-compatibility)
        - [Firebase](#firebase)
        - [Messaging service](#messaging-service)
        - [SDK Initialisation](#sdk-initialisation-1)
    - [Push](#push)
      - [Android](#android-1)
      - [iOS](#ios-1)
      - [Rich Push Notifications](#rich-push-notifications)
        - [iOS](#ios-2)
      - [Silent Push](#silent-push)
        - [iOS](#ios-3)
    - [Geofence](#geofence)
      - [iOS](#ios-4)
      - [Android](#android-2)
        - [Limitations](#limitations)
- [React Native API Interface](#react-native-api-interface)
  - [Import](#import)
  - [Contact Management](#contact-management)
    - [1. Set Contact](#1-set-contact)
    - [2. Clear Contact](#2-clear-contact)
  - [Tracking Custom Events](#tracking-custom-events)
  - [Event Handler](#event-handler)
  - [Push](#push-1)
    - [1. Set Push Token](#1-set-push-token)
    - [2. Clear Push Token](#2-clear-push-token)
    - [3. Get Push Token](#3-get-push-token)
  - [InApp](#inapp)
    - [1. Overlay InApp](#1-overlay-inapp)
      - [1.1. Pause](#11-pause)
      - [1.2. Resume](#12-resume)
    - [2. Inline InApp](#2-inline-inapp)
      - [2.1. Load InApp](#21-load-inapp)
  - [Predict](#predict)
    - [1. Initialization](#1-initialization)
    - [2. Track Cart](#2-track-cart)
    - [3. Track Purchase](#3-track-purchase)
    - [4. Track Item View](#4-track-item-view)
    - [5. Track Category View](#5-track-category-view)
    - [6. Track Search Term](#6-track-search-term)
    - [7. Track Tag](#7-track-tag)
    - [8. Recommend Products](#8-recommend-products)
      - [8.1 Logic](#81-logic)
      - [8.2 Filter](#82-filter)
    - [9. Track Recommendation Click](#9-track-recommendation-click)
  - [DeepLink](#deeplink)
    - [1. Track Deep Link](#1-track-deep-link)
  - [Config](#config)
    - [1. Change Application Code](#1-change-application-code)
    - [2. Change Merchant ID](#2-change-merchant-id)
    - [3. Get Application Code](#3-get-application-code)
    - [4. Get Merchant ID](#4-get-merchant-id)
    - [5. Get Contact Field ID](#5-get-contact-field-id)
    - [6. Get Client ID](#6-get-client-id)
    - [7. Get Language Code](#7-get-language-code)
    - [8. Get SDK Version](#8-get-sdk-version)
    - [9. Get RN Wrapper Version](#9-get-rn-wrapper-version)
  - [Inbox](#inbox)
    - [1. Fetch Messages](#1-fetch-messages)
    - [2. Message Tag](#2-message-tag)
      - [2.1 Tags](#21-tags)
      - [2.2 Add Tag](#22-add-tag)
      - [2.3 Remove Tag](#23-remove-tag)
  - [Geofence](#geofence-1)
    - [Currently supported triggers](#currently-supported-triggers)
    - [1. Request Always Authorization](#1-request-always-authorization)
    - [2. Enable](#2-enable)
    - [3. Disable](#3-disable)
    - [4. Is Enabled](#4-is-enabled)
    - [5. Set Initial Enter Trigger Enabled](#5-set-initial-enter-trigger-enabled)
    - [6. Registered Geofences](#6-registered-geofences)

# Installation

> **Important**  
> New Archtecture and Expo framework are in Pilot release. Please contact your Client Success Manager before starting the implementation.

## Expo
The React Native wrapper for SAP Emarsys SDK automatically integrates the **Emarsys SDK** into your Expo app’s native modules.

1. Add the plugin config options to your `app.json` with your own values:

```json
{
  "expo": {
    ...
    "plugins": [
      ...
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
    ...
  }
}
```

2. Enable `use_frameworks!` in Podfile

```json
{
  "expo": {
    "plugins": [
      [
        "expo-build-properties",
        {
          "ios": {
            "useFrameworks": "static"
          }
        }
      ]
    ]
  }
}
```

3. Add your `google-services.json` file into the app project:
  - Option 1: Place the json file in default path `./assets/google-services.json`, `androidGoogleServicesJsonPath` can be omitted.
  - Option 2: Update the plugin config option `androidGoogleServicesJsonPath` with the json file relative path.

4. *(Optional)* Provide a custom Android **push notification icon**:
   - Place an image in the app project, and update the plugin config option `androidSmallNotificationIconPath` with its relative path.
   - During build, it will be copied into the correct Android resources directory (`res/drawable`).

5. *(Optional)* If you are building your app with Expo Application Services (EAS), add the EAS Build config options to your `app.json` with your own values:

```json
{
  "expo": {
    ...
    "extra": {
      ...
      "eas": {
        ...
        "build": {
          "experimental": {
            "ios": {
              "appExtensions": [
                {
                  "targetName": "NotificationService",
                  "bundleIdentifier": "<IOS_BUNDLE_ID: STRING>.NotificationService"
                }
              ]
            }
          }
        }
      }
    }
    ...
  }
}

```

6. Run prebuild to apply the changes:

```bash
npx expo prebuild
```

#### Android Kotlin compatibility

The Emarsys SDK for Android is compiled with Kotlin 2.4.x. Expo's toolchain (KSP, `expo-root-project`) currently supports Kotlin up to 2.1.x, so the plugin automatically injects `-Xskip-metadata-version-check` into all Android subprojects via the generated `android/build.gradle`. This allows Kotlin 2.1.x to read the newer metadata without a version mismatch error.

## Bare React Native

### Setup
Emarsys SDK setup should be implemented natively to ensure `setup` method is the first thing to be called. 

#### iOS

##### SDK Initialisation

> :warning: **If you are using RN version 0.62 or higher**: Make sure to place Emarsys SDK imports outside `#ifdef FB_SONARKIT_ENABLED` condition!

The SDK initialisation should be done in `didFinishLaunchingWithOptions` in `AppDelegate`.

objective-c
```objective-c
#import <EmarsysSDK/Emarsys.h>
#import <EmarsysSDK/EMSConfig.h>
#import <RNEmarsysSDK/RNEmarsys.h>
```

```objective-c
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  //...
  EMSConfig *config = [EMSConfig makeWithBuilder:^(EMSConfigBuilder * builder) {
    [builder setMobileEngageApplicationCode:@<APPLICATION_CODE: STRING>]; // your application code
    [builder setMerchantId:@<MERCHANT_ID: STRING>]; // your predict merchant ID
    [builder enableConsoleLogLevels:<ENABLE_CONSOLE_LOG_LEVELS: ARRAY>];
    [builder setSharedKeychainAccessGroup:@<IOS_SHARED_KEYCHAIN_ACCESS_GROUP: STRING>];
  }];
  [Emarsys setupWithConfig:config];
  UNUserNotificationCenter.currentNotificationCenter.delegate = [Emarsys push];
  [RNEmarsys setup];
  //...
  return YES;
}
```

swift
```swift
import EmarsysSDK
import RNEmarsysSDK
```

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
  //...
  let config = EMSConfig.make { (build) in 
    build.setMobileEngageApplicationCode(<APPLICATION_CODE: String>)
    build.setMerchantId(<MERCHANT_ID: String>)
    build.enableConsoleLogLevels(<ENABLE_CONSOLE_LOG_LEVELS: Array>)
    build.setSharedKeychainAccessGroup(<IOS_SHARED_KEYCHAIN_ACCESS_GROUP: String>)
  }
  Emarsys.setup(config: config)
  UNUserNotificationCenter.current().delegate = Emarsys.push
  RNEmarsys.setup()
  //...
  return true
}
```

#### Android

##### Kotlin compatibility

The Emarsys SDK for Android is compiled with Kotlin 2.4.x. Your project must use a matching Kotlin version to avoid the following build error:

```
Module was compiled with an incompatible version of Kotlin.
The binary version of its metadata is 2.4.0, expected version is 2.1.0.
```

In your root `android/build.gradle`, set `kotlinVersion` to `2.4.0` and pin the compiler plugin explicitly so it takes precedence over the version bundled with the React Native Gradle plugin:

```groovy
buildscript {
    ext {
        kotlinVersion = "2.4.0"
        // ...
    }
    dependencies {
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:${kotlinVersion}")
        // ...
    }
}
```

> **Note:** The React Native Gradle plugin ships its own Kotlin version via a composite build. Pinning the classpath explicitly as shown above is required for it to be overridden.

##### Firebase

Follow Google's instructions to add the Google Play Services gradle plugin to your project: https://developers.google.com/android/guides/google-services-plugin

In order for push notifications to work, you need to obtain Firebase Cloud Messaging credentials for your app. Follow the instruction for the native SDK here: https://github.com/emartech/android-emarsys-sdk/wiki/Obtaining-Firebase-Cloud-Messaging-credentials, then copy the `google-services.json` file to the `android/app` directory of your React Native project.

##### Messaging service

When the push token arrives from Firebase, we need to set it using `Emarsys.push.setPushToken()`. The recommended way of using the Android SDK is to enable the SDK to automatically handle `setPushToken` and `trackMessageOpen` calls for you, please register the service in your `android/app/AndroidManifest.xml` file.

```xml
<service android:name="com.emarsys.service.EmarsysFirebaseMessagingService" android:exported="false">
  <intent-filter>
		<action android:name="com.google.firebase.MESSAGING_EVENT" />
	</intent-filter>
</service>
```

Additionally, you can set a custom notification icon, by specifying it as a `meta-data` in your application tag:

```xml
<meta-data
android:name="com.emarsys.mobileengage.small_notification_icon"
android:resource="@drawable/notification_icon"
>
```

##### SDK Initialisation

The SDK has to be initialised in the `onCreate` method of the `MainApplication`.

java
```java
import com.emarsys.Emarsys;
import com.emarsys.config.EmarsysConfig;
import com.emarsys.reactnative.RNEmarsys;
```

```java
public void onCreate() {
  super.onCreate();
  //...
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

  createNotificationChannels();
  //...
}
```

kotlin
```kotlin
import com.emarsys.Emarsys
import com.emarsys.config.EmarsysConfig
import com.emarsys.reactnative.RNEmarsys
```

```kotlin
override fun onCreate() {
  super.onCreate()
  //...
  val config = EmarsysConfig(
    application = this,
    applicationCode = <APPLICATION_CODE: STRING>,
    merchantId = <MERCHANT_ID: STRING>,
    verboseConsoleLoggingEnabled = <VERBOSE_CONSOLE_LOGGING_ENABLED: BOOLEAN>,
    sharedPackageNames = <SHARED_PACKAGE_NAMES: LIST>,
    sharedSecret = <SHARED_SECRET: STRING>)
  Emarsys.setup(config)
  RNEmarsys.setup()

  createNotificationChannels()
  //...
}
```

### Push

#### Android
The Emarsys SDK automatically handles `setPushToken` for the device and it is recommended to leave this to the SDK. However if you have your custom implementation of `MessagingService`, please use the `setPushToken()` method, to set the push token.

For Android 8.0 (API level 26) and higher, you need to create notification channels. Please refer to the [Android Oreo Channels documentation](https://github.com/emartech/android-emarsys-sdk/wiki/Android-Oreo-Channels) for detailed instructions.

#### iOS
The push token has to be set natively when it arrives in `didRegisterForRemoteNotificationsWithDeviceToken` in the `AppDelegate`:

objective-c
```objective-c
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  [Emarsys.push setPushToken:deviceToken];
}
```

swift
```swift
func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
  Emarsys.push.setPushToken(deviceToken)
}
```

#### Rich Push Notifications

##### iOS

Push notification could show media content and action buttons besides the title and body. Push notifications with these types of contents are called Rich Notifications.

1. Add a new Notification Service Extension target to your project.

2. Add the `EmarsysNotificationService` to this target in the `Podfile`.
```
target 'EMSNotificationService' do
  pod 'EmarsysNotificationService'
end
```

3. Install pods with the `pod install` command in the iOS workspace directory via terminal.

4. Open the `NotificationService.h` in the target, then:
  - Import the <EmarsysNotificationService/EMSNotificationService.h>.
  - Extend the class EMSNotificationService instead of UNNotificationServiceExtension.
  - Remove all default implementation in the class.

objective-c
```objective-c
#import <EmarsysNotificationService/EMSNotificationService.h>

@interface NotificationService : EMSNotificationService

@end
```

swift
```swift
import EmarsysNotificationService

class NotificationService: EMSNotificationService {

}
```

> `Note`
>
> The `NotificationService` class should remain empty. All functionality is handled by the `EMSNotificationService` base class.

#### Silent Push

##### iOS

Silent messages arrives in `application:didReceivedRemoteNotification:fetchCompletionHandler:`, so in order to be able to handle them, call `handleMessageWithUserInfo:` method there

objective-c
```objective-c
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
  fetchCompletionHandler:(void (^)(UIBackgroundFetchResult result))completionHandler {
  [Emarsys.push handleMessageWithUserInfo:userInfo];
  completionHandler(UIBackgroundFetchResultNewData);
}
```

swift
```swift
func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
	Emarsys.push.handleMessage(userInfo: userInfo)
	completionHandler(.newData)
}
```

### Geofence

#### iOS

For the location permissions the applications `Info.plist` must be extended with the following keys:

```xml
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>AlwaysUsage is a must have for region monitoring (or some description of your choice)</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>AlwaysUsage is a must have for region monitoring (or some description of your choice)</string>
```
Make sure that your app is requesting the required permissions from the user. To make it easier, you can call our `requestAlwaysAuthorization` method.

#### Android

For the location permissions the applications `AndroidManifest.xml` must be extended with the following permissions:

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

Make sure that your app is requesting the required permissions from the user. From Android 12, the `ACCESS_FINE_LOCATION` also needs the `ACCESS_COARSE_LOCATION` permission, since the user can now prevent applications from accessing the precise location of the phone. In response to this, both `android.permission.ACCESS_COARSE_LOCATION` and `android.permission.ACCESS_FINE_LOCATION` permissions are mandatory for geofences to work.

##### Limitations

From Android 12, when the `ACCESS_FINE_LOCATION` permission is granted to the Application, the geofencing will work as before. If only `ACCESS_COARSE_LOCATION` is granted, then we can't guarantee that the geofences will trigger at the correct times.

> `Important Note:` Geofencing is disabled on devices that do not have Google Play Services!


# React Native API Interface

## Import
```javascript
import Emarsys from 'react-native-emarsys-sdk';
```

## Contact Management

### 1. Set Contact

**The `contactFieldId` should not be set to `3` (email). In order to prevent your customers' personal data (PII) being stored in our cloud infrastructure, we require use of unique, non-guessable and immutable contact identifiers. Customer ID's are considered secure. Salted email hash is no longer supported for new Mobile Engage implementations. To make sure the behavioural tracking is cross devices (i.e. mobile and web), the Web Extend contact ID should also use Customer ID and match that used on mobile.**

After the application setup is finished, you can use `setContact` method to identify the user with `contactFieldId` and `contactFieldValue`. Without `setContact` all events will be tracked as anonymous usage. 

```javascript
const contactFieldId = 987654321;
const contactFieldValue = '123456789';
await Emarsys.setContact(contactFieldId, contactFieldValue);
```

### 2. Clear Contact

When the user signs out, we should use the `clearContact` method. The method is going to automatically log in an anonymous user instead of the one leaving.

> `Note`
>
> No need to call `clearContact` every time, even if the user isn't logged in. Just make sure it is called when the user logs out of the application.

```javascript
await Emarsys.clearContact();
```

## Tracking Custom Events

If you want to track custom events, the trackCustomEvent method should be used, where the eventName parameter is required, but the `eventAttributes` are optional.

```javascript
const eventName = 'test-event';
const eventAttributes = { k1: 'v1', k2: 'v2' };
await Emarsys.trackCustomEvent(eventName, eventAttributes);
```

## Event Handler
Add `setEventHandler` to the `useEffect` in your `App.js`.
`setEventHandler` returns React Native `EventSubscription`, which could be unsubscribed (`remove()`) when needed, e.g. in the cleanup function.

```javascript
import { type Event } from 'react-native-emarsys-sdk';

const eventHandlerSubscription = useRef<EventSubscription | null>(null);

useEffect(() => {
  eventHandlerSubscription.current = Emarsys.setEventHandler((event: Event) => {
    Alert('Event', `${event.name}: ${JSON.stringify(event.payload)}`);
  });

  return  () => {
    eventHandlerSubscription.current?.remove();
    eventHandlerSubscription.current = null;
  }
}, []);
```

## Push

### 1. Set Push Token

The push token is automatically handled by the native integration. No additional implementation is required.

If needed, you can manually update the token calling `setPushToken()`:
```javascript
const pushToken = '1234567890'; // Should retrieve the actual push token here
await Emarsys.push.setPushToken(pushToken);
```

> [!CAUTION]  
> If your app is already live and you add the Emarsys SDK, existing installations will not be opted in automatically.
> 
> You must retrieve the existing push tokens and set them manually:
> - **Android:** via Firebase Cloud Messaging
> - **iOS:** via APNs registration

### 2. Clear Push Token

If you want to remove the push token for the contact, please use `clearPushToken()` method.

```javascript
await Emarsys.push.clearPushToken();
```

### 3. Get Push Token

If you want to get the push token for the contact, please use `getPushToken()` method.

```javascript
const pushToken = await Emarsys.push.getPushToken();
```

## InApp

### 1. Overlay InApp

#### 1.1. Pause

When a critical activity starts and should not be interrupted by in-app, use `pause()` to pause in-app messages.

```javascript
await Emarsys.inApp.pause();
```

#### 1.2. Resume

In order to show in-app messages after being paused, use the `resume()` method.

```javascript
await Emarsys.inApp.resume();
```

### 2. Inline InApp

In-App message, that takes place in the application's view hierarchy. Multiple inline in-app components are allowed in one screen.

Create the view with component `InlineInAppView`.
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

#### 2.1. Load InApp

In order to load the inline in-app, `loadInApp(<ViewRef>, <String>)` must be called with the corresponding viewId.

```javascript
Emarsys.inApp.loadInlineInApp(inlineInAppView.current, viewId);
```

## Predict

We won't go into the details to introduce how Predict works, and what its capabilities are, rather we aim to explain the mapping between the Predict commands and our interface. Please visit Predict's [documentation](https://dev.emarsys.com/v2/web-extend-command-reference/web-extend-availabilityzone) for more information.

### 1. Initialization

To use the Predict functionality you have to setup your `merchantId` during the initialization of the SDK. In order to track Predict events, you can use the methods available on our Predict interface.

### 2. Track Cart

When you want to track the cart items in the basket, you can call the `trackCart()` method with a list of `CartItem`. `CartItem` is an interface that can be used in your application for your own `CartItem` and then simply use the same items with the SDK.

```javascript
import { type CartItem } from 'react-native-emarsys-sdk';

const items: CartItem[] = [
  { itemId: 'item1', price: 1.1, quantity: 1 },
  { itemId: 'item2', price: 2.2, quantity: 2 }
];
await Emarsys.predict.trackCart(items);
```

When you want to track empty basket.

```javascript
const items: CartItem[] = [];
await Emarsys.predict.trackCart(items)
```

### 3. Track Purchase

To report a purchase event, you should call `trackPurchase()` with the items purchased and with an `orderId`.

```javascript
const orderId = 'order1';
const items: CartItem[] = [
  { itemId: 'item1', price: 1.1, quantity: 1 },
  { itemId: 'item2', price: 2.2, quantity: 2 }
];
await Emarsys.predict.trackPurchase(orderId, items);
```

To report a purchase event with empty basket.

```javascript
const orderId = 'order2';
const items: CartItem[] = [];
await Emarsys.predict.trackPurchase(orderId, items);
```

### 4. Track Item View

If an item was viewed, use the `trackItemView()` method with an `itemId` as required parameter.

```javascript
const itemId = 'item1';
await Emarsys.predict.trackItemView(itemId);
```

### 5. Track Category View

When the user navigates between the categories, you should call `trackCategoryView()` in every navigation. Be aware to send `categoryPath` in the required format. Please visit Predict's documentation for more information.

```javascript
const categoryPath = 'Shoes>Pump';
await Emarsys.predict.trackCategoryView(categoryPath);
```

### 6. Track Search Term

To report search terms entered by the contact, use `trackSearchTerm()` method.

```javascript
const searchTerm = 'searchTerm';
await Emarsys.predict.trackSearchTerm(searchTerm);
```

### 7. Track Tag

To track custom tags, use the `trackTag()` method, where, the `eventName` parameter is required, but the `tagAttributes` is optional.

```javascript
const tag = 'tag1';
const attributes = { k1: 'v1', k2: 'v2' };
await Emarsys.predict.trackTag(tag, attributes);
```

### 8. Recommend Products

With the Emarsys SDK you can ask for product recommendations based on different recommendation parameters.

```javascript
import { Logic, Filter, type Product } from 'react-native-emarsys-sdk';

const logic = Logic.home(['1', '2']);
const filters = [Filter.exclude.isValue('field', 'value')];
const limit = 5;
const availabilityZone = 'en';
const recommendedProducts: Product[] = await Emarsys.predict.recommendProducts(logic, filters, limit, availabilityZone);
```

#### 8.1 Logic

> `Note`
>
> For more information of the recommender logics, please visit [documentation](https://help.emarsys.com/hc/en-us/articles/115004662189-Web-Recommender-logics "The Official Documentation").

The currently supported logics are:

Search logic - based on `searchTerm`
```javascript
const searchTerm = 'searchTerm';
const logic = Logic.search(searchTerm);
```

Cart logic - based on `cartItems`
```javascript
const items: CartItem[] = [
  { itemId: 'item1', price: 1.1, quantity: 1 },
  { itemId: 'item2', price: 2.2, quantity: 2 }
];
const logic = Logic.cart(items);
```

Related logic - based on `itemId`
```javascript
const itemId = 'item1';
const logic = Logic.related(itemId);
```

Category logic - based on `categoryPath`
```javascript
const categoryPath = 'Shoes>Pump';
const logic = Logic.category(categoryPath);
```

Also bought logic - based on `itemId`
```javascript
const itemId = 'item1';
const logic = Logic.alsoBought(itemId);
```

Popular logic - based on `categoryPath`
```javascript
const categoryPath = 'Shoes>Pump';
const logic = Logic.popular(categoryPath);
```

Personal logic - based on current browsing and activity
```javascript
const variants = ['1', '2'];
const logic = Logic.personal(variants);
```

Home logic - based on most recent browsing behaviour
```javascript
const variants = ['1', '2'];
const logic = Logic.home(variants);
```

#### 8.2 Filter

The currently supported filters are:

```javascript
const filters = [
  Filter.exclude.isValue('field', 'value')
  Filter.include.inValues('field', ['value1', 'value2']),
  Filter.include.hasValue('field', 'value'),
  Filter.include.overlapsValues('field', ['value1', 'value2']),
  Filter.exclude.isValue('field', 'value'),
  Filter.exclude.inValues('field', ['value1', 'value2']),
  Filter.exclude.hasValue('field', 'value'),
  Filter.exclude.overlapsValues('field', ['value1', 'value2'])
]
```

### 9. Track Recommendation Click

The Emarsys SDK doesn't track automatically `recommendationClicks`, so you have to call manually `trackRecommendationClick()` when an interaction happens with any of the recommended products.

```javascript
const product = recommendedProducts[i];
await Emarsys.predict.trackRecommendationClick(product);
```


## DeepLink

In order to track email link clicks that open the application directly with the Emarsys SDK, you need to call `trackDeepLink`.

### 1. Track Deep Link
```javascript
Emarsys.trackDeepLink(url);
```


## Config

### 1. Change Application Code

Emarsys SDK provides a solution for `applicationCode` change in a convenient way, without restarting the SDK.

```javascript
const applicationCode = 'applicationCode';
await Emarsys.config.changeApplicationCode(applicationCode);
```

### 2. Change Merchant ID

Emarsys SDK provides a solution for `merchantId` change in a convenient way, without restarting the SDK.

```javascript
const merchantId = 'merchantId';
await Emarsys.config.changeMerchantId(merchantId);
```

### 3. Get Application Code

Provides what is the actual `applicationCode` set in the SDK.

```javascript
const applicationCode = await Emarsys.config.getApplicationCode();
```

### 4. Get Merchant ID

Provides what is the actual `merchantId` set in the SDK.

```javascript
const merchantId = await Emarsys.config.getMerchantId();
```

### 5. Get Contact Field ID

Provides what is the actual `contactFieldId` set in the SDK.

```javascript
const contactFieldId = await Emarsys.config.getContactFieldId();
```

### 6. Get Client ID

Provides what is the actual `clientId` set in the SDK.

```javascript
const clientId = await Emarsys.config.getClientId();
```

### 7. Get Language Code

Provides what is the actual language code set in the SDK.

```javascript
const languageCode = await Emarsys.config.getLanguageCode();
```

### 8. Get SDK Version

Provides what is the actual sdk version in the SDK.

```javascript
const SDKVersion = await Emarsys.config.getSdkVersion();
```

### 9. Get RN Wrapper Version

Provides what is the actual RN wrapper version.

```javascript
const RNWrapperVersion = await Emarsys.config.getRNWrapperVersion();
```

## Inbox

### 1. Fetch Messages

In order to receive the message Inbox content, you can use the `fetchMessages()` method.

```javascript
import { type Message } from 'react-native-emarsys-sdk';

const inboxMessages: Message[] = await Emarsys.inbox.fetchMessages();
```

### 2. Message Tag
Tags are to be used to set the status of the inbox message, e.g. opened, seen etc. There are 6 tags in total and the details are confirmed in the table below. App developers can add the tags `seen`, `opened`, `pinned` and `deleted`. It is important to note all the tags though as they will be included in the message payload in the SDK tag field. Depending on the tag included in the message, the message could be handled differently by the app. An example would be that messages tagged with `high` (for High Priority) could be visible flagged/highlighted by the contact.

> [!WARNING]  
> Only the tags specified below are supported. Any custom tags created will not work.

| Tag Name | Tag | Description | Where it can be added
|  -----  |  -----  | ----- | -----
| High Priority | high | Marketer setting of high priority message. You can activate this tag from your inbox-campaign by ticking the relevant  [checkbox](https://help.emarsys.com/hc/en-us/articles/360012441317-end-user-guides-mobile-engage-inbox-campaigns). Your developers have to graphically represent this setting in the app inbox. | SAP Engagement Cloud system |
| Cancelled | cancelled | Marketer cancelled the message. This tag is automatically added to your inbox campaign when you [recall](https://help.emarsys.com/hc/en-us/articles/360012441317-end-user-guides-mobile-engage-inbox-campaigns) it. | SAP Engagement Cloud system
| Seen | seen | Inbox messages visible in the app inbox but not opened | Mobile App via the SDK
| Opened | opened | Messages opened on the app | Mobile App via the SDK
| Pinned | pinned | Messages that are pinned as favourite by the contact | Mobile App via the SDK
| Deleted | deleted | Messages that are deleted in the app's user interface | Both SAP Engagement Cloud system and/or Mobile App via the SDK

#### 2.1 Tags
```javascript
import { Tag } from 'react-native-emarsys-sdk';
```

#### 2.2 Add Tag

To label a message with a tag, you can use `addTag()` method.

```javascript
const tag = Tag.seen;
const messageId = inboxMessages[i].id;
await Emarsys.inbox.addTag(tag, messageId);
```

#### 2.3 Remove Tag

To remove a label from a message, you can use `removeTag()` method.

```javascript
const tag = Tag.seen;
const messageId = inboxMessages[i].id;
await Emarsys.inbox.removeTag(tag, messageId);
```

## Geofence

Geofence makes it available to trigger certain actions based on the users location. When the user enters a predefined region (represented by latitude, longitude and radius) EmarsysSDK fires a custom event which can trigger an action, for example, a push notification. This requires permission for background locations from the user.

### Currently supported triggers

The geofence feature has two different trigger types: `ENTER` and `EXIT`.

- `ENTER` triggers when the user reaches the bounds of the geofence and enters it.
- `EXIT` triggers when the user reaches the bounds of the geofence and exits it.
Note

> `Note`
> 
> Based on our experiences so far, the accuracy of geofencing is inconsistent and can be different based on device types and the environment of usage.
> 
> Please be aware that our current geofencing solution only works well when there is no other geofencing solution used in the application.
> ### iOS
> We recommend to use at least 50m of radius, to ensure that the triggers happen. Based on the Apple documentation only 20 geofences/app can be used.
> ### Android
> We recommend adding at least 100m of radius to your geofences, to ensure that the triggers happen. Based on the Android documentation only 100 geofences/app can be used

### 1. Request Always Authorization

> Only available for iOS

The `requestAlwaysAuthorization()` method is responsible for asking the required permissions from the user. Calling this method is not necessary, if your app already asked the user for the permissions.


```javascript
await Emarsys.geofence.requestAlwaysAuthorization();
```

### 2. Enable

The `enable()` method is responsible for the activation of this feature

```javascript
await Emarsys.geofence.enable();
```

### 3. Disable

The `disable()` method is responsible for disabling this feature

```javascript
await Emarsys.geofence.disable();
```

### 4. Is Enabled

The `isEnabled()` method returns if the geofencing is currently enabled or not

```javascript
const isEnabled = await Emarsys.geofence.isEnabled();
```

### 5. Set Initial Enter Trigger Enabled

When `setInitialEnterTriggerEnabled()` is `true`, Emarsys SDK will trigger all the affected geofences with `Enter` type triggers at the moment when the geofence is enabled if the device is already inside that geofence. By default, this value is set to `false`. 

```javascript
await Emarsys.geofence.setInitialEnterTriggerEnabled(true);
```

### 6. Registered Geofences

You can access the registered geofences from the device using the `getRegisteredGeofences()` method.

```javascript
import { type Geofence } from 'react-native-emarsys-sdk';

const geofences: Geofence[] = await Emarsys.geofence.getRegisteredGeofences();
```
