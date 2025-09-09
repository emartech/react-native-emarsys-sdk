//
//  Copyright © 2025. Emarsys. All rights reserved.
//

import UIKit
import RNEmarsysWrapper
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import EmarsysSDK

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    
    registerForPushNotifications()
    
//        MARK: Emarys Config
    let config = EMSConfig.make { (build) in
        build.setMobileEngageApplicationCode("EMS25-20071")
        build.setMerchantId("1DF86BF95CBE8F19")
        build.enableConsoleLogLevels([EMSLogLevel.basic, EMSLogLevel.error, EMSLogLevel.info, EMSLogLevel.debug])
    }
    Emarsys.setup(config: config)
    
    UNUserNotificationCenter.current().delegate = Emarsys.push
    let rnEMSEventHandler = RNEmarsysEventHandler()
    rnEMSEventHandler.setEventHandlers()
    
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "EmarsysApp",
      in: window,
      launchOptions: launchOptions
    )

    return true
  }
  
  func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    Emarsys.push.setPushToken(deviceToken)
  }
  
  func registerForPushNotifications() {
      UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) {
          [weak self] granted, error in
          print("Permission granted: \(granted)")
          self?.getNotificationSettings()
      }
  }
  
  func getNotificationSettings() {
      UNUserNotificationCenter.current().getNotificationSettings { settings in
          print("Permission authorizationStatus: \(settings.authorizationStatus)")
          switch settings.authorizationStatus {
          case .authorized, .provisional, .ephemeral:
              DispatchQueue.main.async {
                  UIApplication.shared.registerForRemoteNotifications()
              }
          case .denied, .notDetermined:
              Emarsys.push.clearPushToken()
          @unknown default:
              print("authorization fallback")
          }
      }
  }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
