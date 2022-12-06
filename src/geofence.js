import { NativeModules } from 'react-native';

const { RNEmarsysGeofenceWrapper } = NativeModules;

const Geofence = {

	/**
	 * @desc The requestAlwaysAuthorization method is responsible for asking the required permissions from the user.
	 *	Only available on iOS.
	 * @return bool - success or failure
	 */
	requestAlwaysAuthorization() {
		return Platform.OS === 'ios' ? RNEmarsysGeofenceWrapper.requestAlwaysAuthorization() : "Not supported on Android"
	},

	/**
	 * @desc Activate Geofence
	 * @return bool - success or failure
	 */
	enable() {
		return RNEmarsysGeofenceWrapper.geofenceEnable()
	},

	/**
	 * @desc Disable Geofence
	 * @return bool - success or failure
	 */
	disable() {
		return RNEmarsysGeofenceWrapper.geofenceDisable()
	},

	/**
	 * @desc Return if the geofencing is currently enabled or not
	 * @return bool - geofencing is currently enabled or not
	 */
	isEnabled() {
		return RNEmarsysGeofenceWrapper.geofenceIsEnabled()
	},

	/**
	 * @desc When initialEnterTriggerEnabled is true,
	 * 	Emarsys SDK will trigger all the affected geofences with Enter type triggers at the moment
	 * 	when the geofence is enabled if the device is already inside that geofence.
	 * 	By default, this value is set to false.
	 * @param bool enabled - initialEnterTriggerEnabled value for change
	 * @return bool - success or failure
	 */
	setInitialEnterTriggerEnabled(enabled) {
		return RNEmarsysGeofenceWrapper.geofenceSetInitialEnterTriggerEnabled(enabled)
	},

	/**
	 * @desc Access the registered geofences from the device
	 * @return array - array of registered geofences
	 */
	registeredGeofences() {
		return RNEmarsysGeofenceWrapper.registeredGeofences()
	},

};

export default Geofence;
