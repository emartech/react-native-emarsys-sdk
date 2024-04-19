import { NativeModules } from "react-native";

const { RNEmarsysGeofenceWrapper } = NativeModules;

const Geofence = {
  /**
   * The `requestAlwaysAuthorization()` method is responsible for asking the required permissions from the user. Only available on iOS.
   * @returns {Promise<boolean | "Not supported on Android">} Promise with success/failure boolean or error string on Android.
   */
  requestAlwaysAuthorization() {
    return Platform.OS === "ios" ? RNEmarsysGeofenceWrapper.requestAlwaysAuthorization() : "Not supported on Android";
  },

  /**
   * Enables Geofence.
   * @returns {Promise<boolean>} Promise with success or failure boolean.
   */
  enable() {
    return RNEmarsysGeofenceWrapper.geofenceEnable();
  },

  /**
   * Disables Geofence.
   * @returns {Promise<boolean>} Promise with success or failure boolean.
   */
  disable() {
    return RNEmarsysGeofenceWrapper.geofenceDisable();
  },

  /**
   * Returns whether or not geofencing is currently enabled.
   * @returns {Promise<boolean>} Promise with a boolean indicating the geofencing status.
   */
  isEnabled() {
    return RNEmarsysGeofenceWrapper.geofenceIsEnabled();
  },

  /**
   * When `initialEnterTriggerEnabled` is `true`,
   * Emarsys SDK will trigger all the affected geofences with `Enter` type triggers at the moment
   * when the geofence is enabled if the device is already inside that geofence.
   *
   * By default, this value is set to `false`.
   * @param {boolean} enabled - New `initialEnterTriggerEnabled` value to change for.
   * @returns {Promise<boolean>} Promise with success or failure boolean.
   */
  setInitialEnterTriggerEnabled(enabled) {
    return RNEmarsysGeofenceWrapper.geofenceSetInitialEnterTriggerEnabled(enabled);
  },

  /**
   * Accesses the registered geofences from the device.
   * @returns {Promise<unknown[]>} Promise with the array of registered geofences.
   */
  registeredGeofences() {
    return RNEmarsysGeofenceWrapper.registeredGeofences();
  },
};

export default Geofence;
