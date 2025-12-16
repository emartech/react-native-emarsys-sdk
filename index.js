import { NativeModules, NativeEventEmitter } from "react-native";

const { RNEmarsysWrapper } = NativeModules;

import Push from "./src/push";
import Inbox from "./src/inbox";
import Predict from "./src/predict";
import Geofence from "./src/geofence";
import InApp, { InlineInAppView } from "./src/inapp";

const Emarsys = {
  /* Init ***************************************************************************************************************************************/

  /**
   * After application setup is finished, you can use `setContact()` method to identify the user with a `contactFieldValue`.
   * Without `setContact()` all events will be tracked as anonymous usage.
   * @param {number} contactFieldId - Field used for identification.
   * @param {string} contactFieldValue - User identification.
   * @returns {Promise<boolean>} Promise with success or failure boolean.
   */
  setContact(contactFieldId, contactFieldValue) {
    return RNEmarsysWrapper.setContact(contactFieldId, contactFieldValue);
  },

  /**
   * When the user signs out, we should use the `clearContact()` method.
   * The method is going to automatically log in an anonymous user instead of the one leaving.
   * @returns {Promise<boolean>} Promise with success or failure boolean.
   */
  clearContact() {
    return RNEmarsysWrapper.clearContact();
  },

  /**
   * If you want to track custom events, the `trackCustomEvent()` method should be used.
   * @param {string} eventName - Name of the tracked custom event.
   * @param {Record<string, unknown> | undefined} eventAttributes - Object containing the attributes of the tracked custom event.
   * @returns {Promise<boolean>} Promise with success or failure boolean.
   */
  trackCustomEvent(eventName, eventAttributes = null) {
    return RNEmarsysWrapper.trackCustomEvent(eventName, eventAttributes);
  },

  /**
   * Register an event handler to react to events triggered by Emarsys.
   * @param {(eventName: string, payload: unknown) => void} callback - Function receiving `eventName` & `payload` for
   * each event.
   * @returns {void}
   */
  setEventHandler(callback) {
    const eventEmitter = new NativeEventEmitter(RNEmarsysWrapper);
    eventEmitter.addListener("handleEvent", function (result) {
      callback(result.eventName, result.payload);
    });
    RNEmarsysWrapper.setEventHandler();
  },

  /* DeepLink ***********************************************************************************************************************************/

  /**
   * The Emarsys SDK automatically tracks email link clicks that open the application directly in most use cases, with only one exception: manual tracking is needed.
   * @param {string} url - URL to track.
   * @returns {Promise<boolean>} Promise with success or failure boolean.
   */
  trackDeepLink(url) {
    return RNEmarsysWrapper.trackDeepLink(url);
  },

  /* Config ***********************************************************************************************************************************/

  /**
   * Emarsys SDK provides a solution for `applicationCode` change in a convenient way without restarting the SDK.
   * @param {string} applicationCode - New `applicationCode` string to change for.
   * @returns {Promise<boolean>} Promise with success or failure boolean.
   */
  changeApplicationCode(applicationCode) {
    return RNEmarsysWrapper.changeApplicationCode(applicationCode);
  },

  /**
   * Emarsys SDK provides a solution for `merchantId` change in a convenient way without restarting the SDK.
   * @param {string} merchantId - New `merchantId` string to change for.
   * @returns {Promise<boolean>} Promise with success or failure boolean.
   */
  changeMerchantId(merchantId) {
    return RNEmarsysWrapper.changeMerchantId(merchantId);
  },

  /**
   * Provides what is the actual applicationCode set in the SDK.
   * @returns {Promise<string>} Currently set `applicationCode` string.
   */
  getApplicationCode() {
    return RNEmarsysWrapper.getApplicationCode();
  },

  /**
   * Provides what is the actual merchantId set in the SDK.
   * @returns {Promise<string>} Currently set `merchantId` string.
   */
  getMerchantId() {
    return RNEmarsysWrapper.getMerchantId();
  },

  /**
   * Provides what is the actual contactFieldId set in the SDK.
   * @returns {Promise<number>} Currently set `contactFieldId` number.
   */
  getContactFieldId() {
    return RNEmarsysWrapper.getContactFieldId();
  },

  /**
   * Provides what is the actual `hardwareId` set in the SDK.
   * @returns {Promise<string>} Current `hardwareId` string.
   */
  getHardwareId() {
    return RNEmarsysWrapper.getHardwareId();
  },

  /**
   * Provides what is the actual `languageCode` set in the SDK.
   * @returns {Promise<string>} Current `languageCode` string.
   */
  getLanguageCode() {
    return RNEmarsysWrapper.getLanguageCode();
  },

  /**
   * Provides what is the actual `sdkVersion` in the SDK.
   * @returns {Promise<string>} String of the current Emarsys SDK version.
   */
  getSdkVersion() {
    return RNEmarsysWrapper.getSdkVersion();
  },

  push: Push,
  inApp: InApp,
  inbox: Inbox,
  InlineInAppView,
  predict: Predict,
  geofence: Geofence,
};

export default Emarsys;

(async () => {
  let type = "react-native";
  let { version } = require("./package.json");
  let { version: frameworkVersion } = require("react-native/package.json");

  try {
    // check if expo plugin exist
    const { version: ver } = require("expo-plugin-for-sap-emarsys/package.json");
    const { version: frameworkVer } = require("expo/package.json");
    type = "expo";
    version = ver;
    frameworkVersion = frameworkVer;
  } catch (error) {
    // no expo plugin
  }

  RNEmarsysWrapper.trackCustomEvent("wrapper:init", { type, version, frameworkVersion });
})();
