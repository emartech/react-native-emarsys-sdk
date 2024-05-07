import { NativeModules } from "react-native";

const { RNEmarsysPushWrapper } = NativeModules;

const Push = {
  /**
   * The Emarsys SDK automatically handles `setPushToken()` for the device and it is recommended to leave this to the SDK.
   * However if you have your custom implementation of `MessagingService`, please use the `setPushToken()` method.
   * @param {string} pushToken - Push Token of your `MessagingService`.
   * @returns {Promise<boolean>} Promise with success or failure boolean.
   */
  setPushToken(pushToken) {
    return RNEmarsysPushWrapper.setPushToken(pushToken);
  },

  /**
   * If you want to remove `pushToken` from the `Contact`, please use `clearPushToken()`.
   * @returns {Promise<boolean>} Promise with success or failure boolean.
   */
  clearPushToken() {
    return RNEmarsysPushWrapper.clearPushToken();
  },

  /**
   * If you want to get the `pushToken` of the `Contact`, please use `getPushToken()`.
   * @returns {Promise<string>} Promise with the `pushToken` string.
   */
  getPushToken() {
    return RNEmarsysPushWrapper.getPushToken();
  },

  /**
   * @returns {never}
   * @deprecated Please use {@link Push.getPushToken()} instead.
   */
  pushToken() {
    return RNEmarsysPushWrapper.getPushToken();
  },
};

export default Push;
