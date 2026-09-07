import ExpoModulesCore
import EmarsysSDK

public class EmarsysAppDelegateSubscriber: ExpoAppDelegateSubscriber {

  public func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    let config = StorageUtils.getEMSConfig()!
    Emarsys.setup(config: config)

    UNUserNotificationCenter.current().delegate = Emarsys.push
    EventUtils.setEventHandler(nil)

    return true
  }

  public func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    Emarsys.push.setPushToken(deviceToken)
  }

  public func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
	Emarsys.push.handleMessage(userInfo: userInfo)
	completionHandler(.newData)
  }

}
