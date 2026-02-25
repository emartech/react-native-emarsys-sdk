# Introduction

We released the current major version of the Emarsys SDK two years ago. In the meantime we have received a lot of valuable usage feedback from our users and also the development tools of the underlying platforms have improved a lot. We always strive to offer the best possible developer experience and the most up-to-date mobile feature set to our users and this sometimes requires to introduce breaking changes of our API and therefore to release a new major version. This migration guide leads you through the changes you have to make to your Emarsys SDK integration to start using the latest 3.0.0 version. We estimate that this migration can be done in about 60 minutes. We recommend to do this migration as soon as possible so that you can benefit from these improvements and also prepare your integration to benefit from future Emarsys SDK improvements. If you need any help in the migration please reach out to Emarsys support.

## Setup

The Builder has been also modified, `mobileEngageApplicationCode` was renamed to `applicationCode` while predictMerchantId is now called `merchantId`. We have also moved the `contactFieldId` from the setup to the `setContact` call.

### iOS
```objective-c
EMSConfig *config = [EMSConfig makeWithBuilder:^(EMSConfigBuilder * builder) {
  [builder setMobileEngageApplicationCode:@"EMS25-20071"];
  [builder setMerchantId:@"1DF86BF95CBE8F19"];
}];

[Emarsys setupWithConfig:config];
```

From Emarsys SDK 3.0.0 `MEUserNotificationCenterDelegate` is not available anymore on the public Emarsys API, everything is handled by `Emarsys.push`.

```objective-c
UNUserNotificationCenter.currentNotificationCenter.delegate = [Emarsys push];
```

### Android
```java
EmarsysConfig config = new EmarsysConfig.Builder()
        .application(this)
        .applicationCode("EMS25-20071")
        .merchantId("1DF86BF95CBE8F19")
        .enableVerboseConsoleLogging()
        .build();

Emarsys.setup(config);
```

Firebase
Note: This is an additional dependency, which points to a new module for the Emarsys SDK, to work with Firebase.

Since Firebase is not a mandatory dependency anymore, it’s needed to be added explicitly so please include emarsys-firebase like the example below:

```groovy
implementation 'com.emarsys:emarsys-firebase:<latest-version>'
implementation 'com.emarsys:emarsys-sdk:<latest-version>'
```

`EmarsysMessagingService` is renamed to `EmarsysFirebaseMessagingService`, `EmarsysMessagingServiceUtils` to `EmarsysFirebaseMessagingServiceUtils`.

```xml
<service android:name="com.emarsys.service.EmarsysFirebaseMessagingService">
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT" />
    </intent-filter>
</service>
```

## Event Handlers
In order to make it easier to implement native code, we have created a method in the RN wrapper which will set all the event handlers.

### iOS
```objective-c
RNEmarsysEventHandler *rnEMSEventHandler = [RNEmarsysEventHandler allocWithZone: nil];
[rnEMSEventHandler setEventHandlers];
```

### Android
```java
RNEmarsysEventHandler eventHandler = RNEmarsysEventHandler.getInstance();
eventHandler.setEventHandlers();
```

We have also created methods that set the handlers individually.

### iOS
```objective-c
[rnEMSEventHandler setPushNotificationEventHandler];
[rnEMSEventHandler setPushSilentMessageEventHandler];
[rnEMSEventHandler setInAppEventHandler];
[rnEMSEventHandler setGeofenceEventHandler];
[rnEMSEventHandler setOnEventActionEventHandler];
```

### Android
```java
eventHandler.setPushNotificationEventHandler();
eventHandler.setPushSilentMessageEventHandler();
eventHandler.setInAppEventHandler();
eventHandler.setGeofenceEventHandler();
eventHandler.setOnEventActionEventHandler();
```

## setContact

With Emarsys SDK 3.0.0 we’ve moved the `contactFieldId` from the config to `setContact` call to give more flexibility into the developer’s hand so the developer can decide what the `contactFieldId` is going to be when the contact needs to be identified and not at the setup where it might be an unknown what type of authentication the user might choose.

```javascript
let contactFieldId = 100005878
let contactFieldValue = "7c3df9f3"

try {
	let result = await Emarsys.setContact(contactFieldId, contactFieldValue)
} catch (e) {
	console.log("setContact Fail: ", e)
}
```

## changeApplicationCode

We simplified the `changeApplicationCode` by removing the methods with the `contactFieldId`. `contactFieldId` is now part of the `setContact`.

```javascript
let applicationCode = "EMSF6-F532D"

try {
	let result = await Emarsys.changeApplicationCode(applicationCode)
} catch (e) {
	console.log("changeApplicationCode Fail: ", e)
}
```


