

#### Contents

- [Native Integration](#native-integration)
  - [Setup](#setup)
    - [iOS](#ios)
      - [SDK Initialisation](#sdk-initialisation)
    - [Android](#android)
      - [Firebase](#firebase)
      - [Emarsys SDK dependency](#emarsys-sdk-dependency)
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
- [React Native Integration](#react-native-integration)
  - [Usage](#usage)
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
      - [⚠️ Known issue: React Native New Architecture](#️-known-issue-react-native-new-architecture)
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
      - [8.2 Logic options](#82-logic-options)
      - [8.3 Recommendation options](#83-recommendation-options)
    - [9. Track Recommendation Click](#9-track-recommendation-click)
  - [DeepLink](#deeplink)
    - [1. Track Deep Link](#1-track-deep-link)
  - [Config](#config)
    - [1. Change ApplicationCode](#1-change-applicationcode)
    - [2. Change MerchantId](#2-change-merchantid)
    - [3. Get ApplicationCode](#3-get-applicationcode)
    - [4. Get MerchantId](#4-get-merchantid)
    - [5. Get ContactFieldId](#5-get-contactfieldid)
    - [6. Get HardwareId](#6-get-hardwareid)
    - [7. Get LanguageCode](#7-get-languagecode)
    - [8. Get SdkVersion](#8-get-sdkversion)
  - [Inbox](#inbox)
    - [1. Fetch Messages](#1-fetch-messages)
    - [2. Message Tag](#2-message-tag)
      - [2.1 Add Tag](#21-add-tag)
      - [2. Remove Tag](#2-remove-tag)
  - [Geofence](#geofence-1)
    - [Currently supported triggers](#currently-supported-triggers)
    - [1. Request Always Authorization](#1-request-always-authorization)
    - [2. Enable](#2-enable)
    - [3. Disable](#3-disable)
    - [4. Is Enabled](#4-is-enabled)
    - [5. Set Initial Enter Trigger Enabled](#5-set-initial-enter-trigger-enabled)
    - [6. Registered Geofences](#6-registered-geofences)

# Native Integration

## Setup
Emarsys SDK setup should be implemented nativity to ensure `setup` method is the first thing to be called. 

### iOS
Please, follow the steps on the Emarsys SDK [documentation](https://github.com/emartech/ios-emarsys-sdk#1-installation-with-cocoapods) to install the SDK in your iOS project.

> :warning: **If you are using RN version 0.62 or higher**: Make sure to place Emarsys SDK imports outside `#ifdef FB_SONARKIT_ENABLED` condition!

#### SDK Initialisation

The SDK initialisation should be done in `didFinishLaunchingWithOptions` in `AppDelegate`.

objective-c
```objective-c
#import <EmarsysSDK/Emarsys.h>
#import <EmarsysSDK/EMSConfig.h>
#import <RNEmarsysWrapper/RNEmarsysEventHandler.h>
```

```objective-c
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  //...
  EMSConfig *config = [EMSConfig makeWithBuilder:^(EMSConfigBuilder * builder) {
    [builder setMobileEngageApplicationCode:@<APPLICATION_CODE>]; // your application code
    [builder setMerchantId:@<MERCHANT_ID>];  // your predict merchant ID
  }];
  [Emarsys setupWithConfig:config];

  // enable the SDK to automatically handle the arrived push messages
  UNUserNotificationCenter.currentNotificationCenter.delegate = [Emarsys push];

  RNEmarsysEventHandler *rnEMSEventHandler = [RNEmarsysEventHandler allocWithZone: nil];
  [rnEMSEventHandler setEventHandlers];
  //...
  return YES;
}
```

swift
```swift
import EmarsysSDK
import RNEmarsysWrapper
```

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
  //...
  let config = EMSConfig.make { (build) in 
    build.setMobileEngageApplicationCode(<APPLICATION_CODE>)
    build.setMerchantId(<MERCHANT_ID>)
    build.enableConsoleLogLevels([EMSLogLevel.basic, EMSLogLevel.error, EMSLogLevel.info, EMSLogLevel.debug])
  }
  Emarsys.setup(config: config)
  
  // enable the SDK to automatically handle the arrived push messages
  UNUserNotificationCenter.current().delegate = Emarsys.push

  let rnEMSEventHandler = RNEmarsysEventHandler()
  rnEMSEventHandler.setEventHandlers()
  //...
  return true
}
```

### Android

#### Firebase

Follow Google's instructions to add the Google Play Services gradle plugin to your project: https://developers.google.com/android/guides/google-services-plugin

In order for push notifications to work, you need to obtain Firebase Cloud Messaging credentials for your app. Follow the instruction for the native SDK here: https://github.com/emartech/android-emarsys-sdk/wiki/Obtaining-Firebase-Cloud-Messaging-credentials, then copy the `google-services.json` file to the `android/app` directory of your React Native project.

#### Emarsys SDK dependency

For the SDK initialization to work, an Emarsys SDK version corresponding to the one used by the wrapper has to be added to the Android project as a dependency. In the `dependencies` section of the `android/app/build.gradle`, add:

```groovy
dependencies {
  implementation "com.emarsys:emarsys-sdk:‹emarsys-sdk_version_used_by_wrapper›"
  implementation "com.emarsys:emarsys-firebase:‹emarsys-sdk_version_used_by_wrapper›"
}
```

#### Messaging service

When the push token arrives from Firebase, we need to set it using `Emarsys.push.setPushToken()`. The recommended way of using the Android SDK is to enable the SDK to automatically handle `setPushToken` and `trackMessageOpen` calls for you, please register the service in your `android/app/AndroidManifest.xml` file.

```xml
<service android:name="com.emarsys.service.EmarsysFirebaseMessagingService">
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

#### SDK Initialisation

For receiving push notifications in the background to work, the SDK has to be initialised in the `onCreate` method of the `MainApplication`.

java
```java
public void onCreate() {
    super.onCreate();
    //...
    EmarsysConfig config = new EmarsysConfig.Builder()
        .application(this)
        .applicationCode("EMSAA-00000") // your application code
        .merchantId("XXXXXXXXXXXXX") // your predict merchant ID
        .enableVerboseConsoleLogging()
        .build();
    Emarsys.setup(config);

    RNEmarsysEventHandler eventHandler = RNEmarsysEventHandler.getInstance();
    eventHandler.setEventHandlers();

    createNotificationChannels();
    //...
}
```

kotlin
```kotlin
override fun onCreate() {
  super.onCreate()
  //...
  val config = EmarsysConfig(
      application = this,
      applicationCode = "EMSAA-00000", // your application code
      merchantId = "XXXXXXXXXXXXX", // your predict merchant ID
      verboseConsoleLoggingEnabled = true)
  Emarsys.setup(config)

  val eventHandler = RNEmarsysEventHandler.getInstance()
  eventHandler.setEventHandlers()

  createNotificationChannels()
  //...
}
```

## Push

### Android
The Emarsys SDK automatically handles `setPushToken` for the device and it is recommended to leave this to the SDK. However if you have your custom implementation of `MessagingService`, please use the `setPushToken()` method, to set the push token.

### iOS
The push token has to be set natively when it arrives in `didRegisterForRemoteNotificationsWithDeviceToken` in the `AppDelegate`:

objective-c
```objective-c
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    [Emarsys.push setPushToken:deviceToken
               completionBlock:^(NSError *error) {
               }];
}
```

swift
```swift
func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
  Emarsys.push.setPushToken(deviceToken)
}
```

### Rich Push Notifications

### iOS

Push notification could show media content and action buttons besides the title and body. Push notifications with these types of contents are called Rich Notifications.

1. Add a new Notification Service Extension target to your project.

2. Add the `EmarsysNotificationService` to this target in the `Podfile`.
```
target 'Emarsys Sample' do
  pod 'EmarsysSDK'
end

target 'EMSNotificationService' do
  pod 'EmarsysNotificationService'
end
```

3. Install pods with the `pod install` command in the iOS workspace directory via terminal.

4. Open the `NotificationService.h` in the target, then:
  - Import the <EmarsysNotificationService/EMSNotificationService.h>.
  - Extend the class EMSNotificationService instead of UNNotificationServiceExtension.

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

### Silent Push

### iOS

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
override func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
  Emarsys.push.handleMessage(userInfo: userInfo)
  completionHandler(.newData)
    }
```

## Geofence

### iOS

For the location permissions the applications `Info.plist` must be extended with the following keys:

```javascript
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>AlwaysUsage is a must have for region monitoring (or some description of your choice)</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>AlwaysUsage is a must have for region monitoring (or some description of your choice)</string>
```
Make sure that your app is requesting the required permissions from the user. To make it easier, you can call our `requestAlwaysAuthorization` method.

### Android

For the location permissions the applications `AndroidManifest.xml` must be extended with the following permissions:

```javascript
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

Make sure that your app is requesting the required permissions from the user. From Android 12, the `ACCESS_FINE_LOCATION` also needs the `ACCESS_COARSE_LOCATION` permission, since the user can now prevent applications from accessing the precise location of the phone. In response to this, both `android.permission.ACCESS_COARSE_LOCATION` and `android.permission.ACCESS_FINE_LOCATION` permissions are mandatory for geofences to work.

#### Limitations

From Android 12, when the `ACCESS_FINE_LOCATION` permission is granted to the Application, the geofencing will work as before. If only `ACCESS_COARSE_LOCATION` is granted, then we can't guarantee that the geofences will trigger at the correct times.

> `Important Note:` Geofencing is disabled on devices, that does not have Google Play Services!



# React Native Integration

## Usage
```javascript
import Emarsys from "react-native-emarsys-wrapper";
```

## Contact Management

### 1. Set Contact

**The `contactFieldId` should not be set to `3` (email). In order to prevent your customers' personal data (PII) being stored in our cloud infrastructure, we require use of unique, non-guessable and immutable contact identifiers. Customer ID's are considered secure. Salted email hash is no longer supported for new Mobile Engage implementations. To make sure the behavioural tracking is cross devices (i.e. mobile and web), the Web Extend contact ID should also use Customer ID and match that used on mobile.**

After the application setup is finished, you can use `setContact` method to identify the user with `contactFieldId` and `contactFieldValue`. Without `setContact` all events will be tracked as anonymous usage. 

```javascript
async setContact() {
  let contactFieldId = 100010824;
  let contactFieldValue = "7c3df9f3";

  try {
    let result = await Emarsys.setContact(contactFieldId, contactFieldValue);
  } catch (e) {
    console.log(e);
  }
}
```

### 2. Clear Contact

When the user signs out, we should use the `clearContact` method. The method is going to automatically log in an anonymous user instead of the one leaving.

> `Note`
>
> No need to call `clearContact` every time, even if the user isn't logged in. Just make sure it is called when the user logs out of the application.

```javascript
async clearContact() {
  try {
    let result = await Emarsys.clearContact();
  } catch (e) {
    console.log(e);
  }
}
```

## Tracking Custom Events

If you want to track custom events, the trackCustomEvent method should be used, where the eventName parameter is required, but the `eventAttributes` are optional.

```javascript
async trackCustomEvent() {
  let eventName = "customEventName";
  let eventAttributes = {
    "customEvent-key1": "customEvent-value1",
    "customEvent-key2": "customEvent-value2",
  }
  try {
    let result = await Emarsys.trackCustomEvent(eventName, eventAttributes);
  } catch (e) {
    console.log(e);
  }
}
```

## Event Handler

Add `setEventHandler` to your `App.js` constructor.

```javascript
constructor() {
  super();
  Emarsys.setEventHandler(function (eventName, payload) {
    showAlert(eventName, JSON.stringify(payload))
  });
}
```

## Push

### 1. Set Push Token

The push token is automatically handled by the native integration. No additional implementation is required.

If needed, you can manually update the token calling `setPushToken()`:
```javascript
async setPushToken() {
  try {
    let result = await Emarsys.push.setPushToken(deviceToken);
  } catch (e) {
    console.log(e);
  }
}
```

> [!CAUTION]  
> If your app is already live and you add the Emarsys SDK, existing installations will not be opted in automatically.
> 
> You must retrieve the existing push tokens and set them mannualy:
> - **Android:** via Firebase Cloud Messaging
> - **iOS:** via APNs registration

### 2. Clear Push Token

If you want to remove the push token for the contact, please use `clearPushToken()` method.

```javascript
async clearPushToken() {
  try {
    let result = await Emarsys.push.clearPushToken();
  } catch (e) {
    console.log(e);
  }
}
```

### 3. Get Push Token

If you want to get the push token for the contact, please use `pushToken()` method.

```javascript
async pushToken() {
  try {
    let pushToken = await Emarsys.push.pushToken();
  } catch (e) {
    console.log(e);
  }
}
```

## InApp

### 1. Overlay InApp

#### 1.1. Pause

When a critical activity starts and should not be interrupted by in-app, use `pause()` to pause in-app messages.

```javascript
async pause() {
  try {
    let result = await Emarsys.inApp.pause();
  } catch (e) {
    console.log(e);
  }
}
```

#### 1.2. Resume

In order to show in-app messages after being paused, use the `resume()` method.

```javascript
async resume() {
  try {
    let result = await Emarsys.inApp.resume();
  } catch (e) {
    console.log(e);
  }
}
```

### 2. Inline InApp

In-App message, that takes place in the application's view hierarchy. Multiple inline in-app components are allowed in one screen.

#### ⚠️ Known issue: React Native New Architecture

Inline in-app view is not compatible with React Native's [New Architecture](https://reactnative.dev/docs/the-new-architecture/landing-page) (Fabric / Turbo) introduced in React Native 0.68+.  
This implementation is based on the legacy native UI system and **will not be updated to support the New Architecture**.

Create the view with component `Emarsys.InlineInAppView`.

```javascript
<Emarsys.InlineInAppView ref={this.inlineInAppView}
  style={{width: "100%", height: this.state.inlineInAppViewHeight}}
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
```

#### 2.1. Load InApp

In order to load the inline in-app, `loadInApp(<String>)` must be called with the corresponding viewId.

```javascript
this.inlineInAppView.current.loadInApp('view-id')
```

## Predict

We won't go into the details to introduce how Predict works, and what its capabilities are, rather we aim to explain the mapping between the Predict commands and our interface. Please visit Predict's [documentation](https://dev.emarsys.com/v2/web-extend-command-reference/web-extend-availabilityzone) for more information.

### 1. Initialization

To use the Predict functionality you have to setup your `merchantId` during the initialization of the SDK. In order to track Predict events, you can use the methods available on our Predict interface.

### 2. Track Cart

When you want to track the cart items in the basket, you can call the `trackCart()` method with a list of `CartItem`. `CartItem` is an interface that can be used in your application for your own `CartItem` and then simply use the same items with the SDK.

```javascript
async trackCart() {
  let cartItems = [{
    itemId: "cartId-1", 
    price: 1.66, 
    quantity: 26.4, 
  }, {
    itemId: "cartId-2", 
    price: 2.88, 
    quantity: 56.5, 
  }];

  try {
    let result = await Emarsys.predict.trackCart(cartItems);
  } catch (e) {
    console.log(e);
  }
}
```

When you want to track empty basket.

```javascript
async trackEmptyCart() {
  let emptyCartItems = [];

  try {
    let result = await Emarsys.predict.trackCart(emptyCartItems)
  } catch (e) {
    console.log(e);
  }
}
```

### 3. Track Purchase

To report a purchase event, you should call `trackPurchase()` with the items purchased and with an `orderId`.

```javascript
async trackPurchase() {
  let orderId = "TrackPurchase-OrderID";
  let cartItems = [{
    itemId: "cartId-1",
    price: 2.22,
    quantity: 27.56,
  }, {
    itemId: "cartId-2",
    price: 28.11,
    quantity: 5.6,
  }];

  try {
    let result = await Emarsys.predict.trackPurchase(orderId, cartItems);
  } catch (e) {
    console.log(e);
  }
}
```

To report a purchase event with empty basket.

```javascript
async trackEmptyPurchase() {
  let emptyOrderId = "TrackPurchase-Empty-OrderID";
  let emptyCartItems = [];

  try {
    let result = await Emarsys.predict.trackPurchase(emptyOrderId, emptyCartItems);
  } catch (e) {
    console.log(e);
  }
}
```

### 4. Track Item View

If an item was viewed, use the `trackItemView()` method with an `itemId` as required parameter.

```javascript
async trackItemView() {
  let itemId = "TrackItemId";

  try {
    let result = await Emarsys.predict.trackItemView(itemId);
  } catch (e) {
    console.log(e);
  }
}
```

### 5. Track Category View

When the user navigates between the categories, you should call `trackCategoryView()` in every navigation. Be aware to send `categoryPath` in the required format. Please visit Predict's documentation for more information.

```javascript
async trackCategoryView() {
  let categoryPath = "Bikes > Road Bikes";

  try {
    let result = await Emarsys.predict.trackCategoryView(categoryPath);
  } catch (e) {
    console.log(e);
  }
}
```

### 6. Track Search Term

To report search terms entered by the contact, use `trackSearchTerm()` method.

```javascript
async trackSearchTerm() {
  let searchTerm = "searchTerm";

  try {
    let result = await Emarsys.predict.trackSearchTerm(searchTerm);
  } catch (e) {
    console.log(e);
  }
}
```

### 7. Track Tag

To track custom tags, use the `trackTag()` method, where, the `eventName` parameter is required, but the `tagAttributes` is optional.

```javascript
async trackTag() {
  let tagName = "tagName";
  let tagAttributes = {
    "tag-key1": "tag-value1",
    "tag-key2": "tag-value2",
  }

  try {
    let result = await Emarsys.predict.trackTag(tagName, tagAttributes);
  } catch (e) {
    console.log(e);
  }
}
```

### 8. Recommend Products

With the Emarsys SDK you can ask for product recommendations based on different recommendation parameters.

```javascript
async recommendProducts() {
  let logic = "HOME";
  let logicOptions = {
    variants: ["1", "2", "3"],
  };
  let recommendationOptions = {
    availabilityZone: "es",
    limit: 10,
    filters: [{ 
      type: "include", 
      field: "category",
      comparison: "is",
      expectations: "Shoes>Pump"
    },{
      type: "exclude",
      field: "category",
      comparison: "IN",
      expectations: [ "Shoes>Golf", "For Women>Shoes>Golf"]
    }]
  }

  try {
    let result = await Emarsys.predict.recommendProducts(logic, logicOptions, recommendationOptions)
  } catch (e) {
    console.log(e);
  }
}
```

#### 8.1 Logic

> `Note`
>
> For more information of the recommender logics, please visit [documentation](https://help.emarsys.com/hc/en-us/articles/115004662189-Web-Recommender-logics "The Official Documentation").

The currently supported logics are:
- `SEARCH` - based on `searchTerm`
- `CART` - based on `cartItems`
- `RELATED` - based on `itemViewId`
- `CATEGORY` - based on `categoryPath`
- `ALSO_BOUGHT` - based on `itemViewId`
- `POPULAR` - based on `categoryPath`
- `PERSONAL` - based on current browsing and activity
- `HOME` - based on most recent browsing behaviour

#### 8.2 Logic options

This is an optional parameter.

Either `query`, `cartItems`, or `variants`
- `query` - Query string extends recommended logics. For logics: `SEARCH`, `RELATED`, `CATEGORY`, `ALSO_BOUGHT`, `POPULAR`
- `cartItems` - Array of `cartItems`, can be empty. For logic: `CART`
- `variants` - Array of `variants`. For logics: `HOME`, `PERSONAL`

```javascript
let logicOptions = {
  query: "Shoes>Pump"
}
```
```javascript
let logicOptions = {
  cartItems: [{
    itemId: "ID of the Cart Item 1",
    price: 1.66,
    quantity: 26.4,
  }, {
    itemId: "ID of the Cart Item 2",
    price: 2.88,
    quantity: 56.5,
  }]
}
```
```javascript
let logicOptions = {
  variants: ["1", "2", "3"]
}
```

#### 8.3 Recommendation options

This is an optional parameter.

- `availabilityZone` - You can personalize the recommendation further by setting the `availabilityZone` parameter of the recommendation, to only recommend the locally available products. This is an optional parameter.
- `limit` - You can limit the number of recommended products received by defining a `limit`. This is an optional parameter, by default its value is 5.
- `filters` - You can filter product recommendations with the SDK by building `RecommendationFilters`. This is an optional parameter.
    - `type` - There are two types of filters: `exclude` or `include`.
    - `field` - String extends Type of recommended logics.
    - `comparison` - In every case there are four types of comparators you can use to compare your chosen field to expectations:
        - `is` - checking if the field is matching the value.
        - `in` - any of the values has a match with the field.
        - `has` - One of the field values is equal to expectation value (applicable only to fields containing multiple values).
        - `overlaps` - One or more of the field values are found in expectation values (applicable only to fields containing multiple values).
    - `expectations` - String/Array of strings extends Comparison of recommended logics.

### 9. Track Recommendation Click

The Emarsys SDK doesn't track automatically `recommendationClicks`, so you have to call manually `trackRecommendationClick()` when an interaction happens with any of the recommended products.

```javascript
async trackRecommendationClick() {
  let product = {
    productId: "productId",
    title: "title", 
    linkUrl: "http://linkUrl.com/test",
    feature: "feature",
    cohort: "awesome",
    imageUrl: "http://productURL.com/imageUrl", 
    zoomImageUrl: "http://productURL.com/zoomImageUrl",
    categoryPath: "productCategoryPath",
    productDescription: "productDescription",
    album: "productAlbum",
    actor: "productActor",
    artist: "productArtist",
    author: "productAuthor",
    brand: "productBrand",
    customFields: {
      productTestKey1: "productTestValue1",
      productTestKey2: "productTestValue2",
      productTestKey3: "productTestValue3",
    },
    available: true,
    price: 45.67, 
    msrp: 2.45, 
    year: 2019, 
  };

  try {
    let result = await Emarsys.predict.trackRecommendationClick(product);
  } catch (e) {
    console.log(e);
  }
}
```


## DeepLink

In order to track email link clicks that open the application directly with the Emarsys SDK, you need to call `trackDeepLink`.

### 1. Track Deep Link
```javascript
async trackDeepLink(url) {
  try {
    let result = await Emarsys.trackDeepLink(url);
  } catch (e) {
    console.log(e);
  }
}
```


## Config

### 1. Change ApplicationCode

Emarsys SDK provides a solution for `applicationCode` change in a convenient way, without restarting the SDK.

```javascript
async changeApplicationCode() {
  let applicationCode = "applicationCode";

  try {
    let result = await Emarsys.changeApplicationCode(applicationCode);
  } catch (e) {
    console.log(e);
  }
}
```

### 2. Change MerchantId

Emarsys SDK provides a solution for `merchantId` change in a convenient way, without restarting the SDK.

```javascript
async changeMerchantId() {
  let merchantId = "merchantId";

  try {
    let result = await Emarsys.changeMerchantId(merchantId);
  } catch (e) {
    console.log(e);
  }
}
```

### 3. Get ApplicationCode

Provides what is the actual `applicationCode` set in the SDK.

```javascript
async getApplicationCode() {
  try {
    let applicationCode = await Emarsys.getApplicationCode();
  } catch (e) {
    console.log(e);
  }
}
```

### 4. Get MerchantId

Provides what is the actual `merchantId` set in the SDK.

```javascript
async getMerchantId() {
  try {
    let merchantId = await Emarsys.getMerchantId();
  } catch (e) {
    console.log(e);
  }
}
```

### 5. Get ContactFieldId

Provides what is the actual `contactFieldId` set in the SDK.

```javascript
async getContactFieldId() {
  try {
    let contactFieldId = await Emarsys.getContactFieldId();
  } catch (e) {
    console.log(e);
  }
}
```

### 6. Get HardwareId

Provides what is the actual `hardwareId` set in the SDK.

```javascript
async getHardwareId() {
  try {
    let hardwareId = await Emarsys.getHardwareId();
  } catch (e) {
    console.log(e);
  }
}
```

### 7. Get LanguageCode

Provides what is the actual language code set in the SDK.

```javascript
async getLanguageCode() {
  try {
    let languageCode = await Emarsys.getLanguageCode();
  } catch (e) {
    console.log(e);
  }
}
```

### 8. Get SdkVersion

Provides what is the actual sdk version in the SDK.

```javascript
async getSdkVersion() {
  try {
    let sdkVersion = await Emarsys.getSdkVersion();
  } catch (e) {
    console.log(e);
  }
}
```

## Inbox


### 1. Fetch Messages

In order to receive the message Inbox content, you can use the `fetchMessages()` method.

```javascript
async fetchMessages() {
  try {
    let inboxData = await Emarsys.inbox.fetchMessages()
  } catch (e) {
    console.log(e);
  }
}
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
| Deleted | deleted | Messages that are deleted in the app UI | Both SAP Engagement Cloud system and/or Mobile App via the SDK

#### 2.1 Add Tag

To label a message with a tag, you can use `addTag()` method. (for example: `OPENED`, `SEEN` etc)

```javascript
async addTag() {
  let tag = "seen"
  let messageId = "12345"
  try {
    let result = await Emarsys.inbox.addTag(tag, messageId)
  } catch (e) {
    console.log(e)
  }
}
```

#### 2. Remove Tag

To remove a label from a message, you can use `removeTag()` method.

```javascript
async removeTag() {
  let tag = "seen"
  let messageId = "12345"
  try {
    let result = await Emarsys.inbox.removeTag(tag, messageId)
  } catch (e) {
    console.log(e)
  }
}
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
async requestAlwaysAuthorization() {
  try {
    let result = await Emarsys.geofence.requestAlwaysAuthorization()
  } catch (e) {
    console.log(e);
  }
}
```

### 2. Enable

The `enable()` method is responsible for the activation of this feature

```javascript
async enable() {
  try {
    let result = await Emarsys.geofence.enable()
  } catch (e) {
    console.log(e)
  }
}
```

### 3. Disable

The `disable()` method is responsible for disabling this feature

```javascript
async disable() {
  try {
    let result = await Emarsys.geofence.disable()
  } catch (e) {
    console.log(e)
  }
}
```

### 4. Is Enabled

The `isEnabled()` method returns if the geofencing is currently enabled or not

```javascript
async isEnabled() {
  try {
    let result = await Emarsys.geofence.isEnabled()
  } catch (e) {
    console.log(e)
  }
}
```

### 5. Set Initial Enter Trigger Enabled

When `initialEnterTriggerEnabled()` is `true`, Emarsys SDK will trigger all the affected geofences with `Enter` type triggers at the moment when the geofence is enabled if the device is already inside that geofence. By default, this value is set to `false`.

```javascript
async setInitialEnterTriggerEnabled() {
  try {
    let result = await Emarsys.geofence.setInitialEnterTriggerEnabled(true)
  } catch (e) {
    console.log(e)
  }
}
```

### 6. Registered Geofences

You can access the registered geofences from the device using the `registeredGeofences()` method.

```javascript
async registeredGeofences() {
  try {
    let registeredGeofences = await Emarsys.geofence.registeredGeofences()
  } catch (e) {
    console.log(e)
  }
}
```