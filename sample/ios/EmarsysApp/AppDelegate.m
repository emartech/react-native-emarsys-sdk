//
//  Copyright © 2019 Emarsys. All rights reserved.
//

#import "AppDelegate.h"

#import <EmarsysSDK/Emarsys.h>
#import <EmarsysSDK/EMSConfig.h>
#import <EmarsysSDK/EMSLogLevel.h>
#import <RNEmarsysWrapper/RNEmarsysEventHandler.h>

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>
static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

#import <React/RCTLinkingManager.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

  #ifdef FB_SONARKIT_ENABLED
    InitializeFlipper(application);
  #endif

  [self requestPushPermission];
  
  EMSConfig *config = [EMSConfig makeWithBuilder:^(EMSConfigBuilder * builder) {
    [builder setMobileEngageApplicationCode:@"EMS25-20071"];
    [builder setMerchantId:@"1DF86BF95CBE8F19"];
    [builder enableConsoleLogLevels:@[EMSLogLevel.trace, EMSLogLevel.debug, EMSLogLevel.info, EMSLogLevel.warn, EMSLogLevel.error, EMSLogLevel.basic]];
  }];
  
  [Emarsys setupWithConfig:config];
  
  UNUserNotificationCenter.currentNotificationCenter.delegate = [Emarsys push];
  RNEmarsysEventHandler *rnEMSEventHandler = [RNEmarsysEventHandler allocWithZone: nil];
  [rnEMSEventHandler setEventHandlers];
  
	RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
	RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"EmarsysApp" initialProperties:nil];

  if (@available(iOS 13.0, *)) {
    rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
    rootView.backgroundColor = [UIColor whiteColor];
  }

	self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
	UIViewController *rootViewController = [UIViewController new];
	rootViewController.view = rootView;
	self.window.rootViewController = rootViewController;
	[self.window makeKeyAndVisible];

	return YES;
}

- (void) requestPushPermission {
  UNUserNotificationCenter* center = [UNUserNotificationCenter currentNotificationCenter];
  [center requestAuthorizationWithOptions:
           (UNAuthorizationOptionAlert +
            UNAuthorizationOptionSound)
     completionHandler:^(BOOL granted, NSError * _Nullable error) {
        // Enable or disable features based on authorization.
    
    dispatch_async(dispatch_get_main_queue(), ^{
        [[UIApplication sharedApplication] registerForRemoteNotifications];
    });
  }];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
	#if DEBUG
        return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
	#else
		return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
	#endif
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  [Emarsys.push setPushToken:deviceToken];
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options {
  return [RCTLinkingManager application:application openURL:url options:options];
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler {
	return [RCTLinkingManager application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
}

@end
