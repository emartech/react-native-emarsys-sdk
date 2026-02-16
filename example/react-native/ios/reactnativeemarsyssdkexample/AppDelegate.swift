import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider

// Emarsys - imports
import EmarsysSDK
import RNEmarsysSDK

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "reactnativeemarsyssdkexample",
      in: window,
      launchOptions: launchOptions
    )

    // Emarsys - SDK setup
    let config: EMSConfig = EMSConfig.make { build in
      build.setMobileEngageApplicationCode("EMS25-20071")
      build.setMerchantId("1DF86BF95CBE8F19")
      build.enableConsoleLogLevels([EMSLogLevel.trace, EMSLogLevel.debug, EMSLogLevel.info, EMSLogLevel.warn, EMSLogLevel.error, EMSLogLevel.basic])
      build.setSharedKeychainAccessGroup("4J5FXBB97U.com.ems.EmarsysShared")
    }
    Emarsys.setup(config: config)
    UNUserNotificationCenter.current().delegate = Emarsys.push
    RNEmarsys.setup()

    return true
  }

  public func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    // Emarsys - push token
    Emarsys.push.setPushToken(deviceToken)
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
