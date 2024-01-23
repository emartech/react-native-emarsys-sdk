import { NativeModules, NativeEventEmitter } from 'react-native';

const { RNEmarsysWrapper } = NativeModules;

import Push from './src/push';
import InApp, { InlineInAppView } from './src/inapp';
import Inbox from './src/inbox';
import Predict from './src/predict';
import Geofence from './src/geofence';

const Emarsys = {

	/* Init ***************************************************************************************************************************************/

	/**
	 * @desc After application setup is finished, you can use setContact method to identify the user with a contactFieldValue.
	 * 	Without setContact all events will be tracked as anonymous usage.
	 * @param required string contactFieldValue - user identification
	 * @param required integer contactFieldId - field used for identification
	 * @return bool - success or failure
	 */
	setContact(contactFieldId, contactFieldValue) {
		return RNEmarsysWrapper.setContact(contactFieldId, contactFieldValue)
	},

	/**
	 * @desc When the user signs out, we should use the clearContact method.
	 * 	The method is going to automatically log in an anonymous user instead of the one leaving.
	 * @return bool - success or failure
	 */
	clearContact() {
		return RNEmarsysWrapper.clearContact()
	},

	/**
	 * @desc If you want to track custom events, the trackCustomEvent method should be used.
	 * @param required string eventName - Name of tracked custom event.
	 * @param object eventAttributes - Attributes of tracked custom event.
	 * @return bool - success or failure
	 */
	trackCustomEvent(eventName, eventAttributes) {
		return RNEmarsysWrapper.trackCustomEvent(eventName, eventAttributes ? eventAttributes : null)
	},

	/**
	 * @desc Register an event handler to react to events triggered by Emarsys.
	 * @param function (eventName, payload) callback function receiving events
	 * @return bool - success or failure
	 */
	setEventHandler(callback) {
		const eventEmitter = new NativeEventEmitter(RNEmarsysWrapper);
		eventEmitter.addListener('handleEvent', function (result) {
			callback(result.eventName, result.payload);
		});
		RNEmarsysWrapper.setEventHandler();
	},

	/* DeepLink ***********************************************************************************************************************************/

	/**
	 * @desc The Emarsys SDK automatically tracks email link clicks that open the application directly in most use cases, with only one exception: manual tracking is needed.
	 * @param string url - Track URL
	 * @return bool - success or failure
	 */
	trackDeepLink(url) {
		return RNEmarsysWrapper.trackDeepLink(url)
	},

	/* Config ***********************************************************************************************************************************/

	/**
	 * @desc Emarsys SDK provides a solution for applicationCode change in a convenient way without restarting the SDK.
	 * @param string applicationCode - applicationCode for change
	 * @return bool - success or failure
	 */
	changeApplicationCode(applicationCode) {
		return RNEmarsysWrapper.changeApplicationCode(applicationCode)
	},

	/**
	 * @desc Emarsys SDK provides a solution for merchantId change in a convenient way without restarting the SDK.
	 * @param string merchantId - merchantId for change
	 * @return bool - success or failure
	 */
	changeMerchantId(merchantId) {
		return RNEmarsysWrapper.changeMerchantId(merchantId)
	},

	/**
	 * @desc Provides what is the actual applicationCode set in the SDK.
	 * @return string - applicationCode
	 */
	getApplicationCode() {
		return RNEmarsysWrapper.getApplicationCode()
	},

	/**
	 * @desc Provides what is the actual merchantId set in the SDK.
	 * @return string - merchantId
	 */
	getMerchantId() {
		return RNEmarsysWrapper.getMerchantId()
	},

	/**
	 * @desc Provides what is the actual contactFieldId set in the SDK.
	 * @return integer - contactFieldId
	 */
	getContactFieldId() {
		return RNEmarsysWrapper.getContactFieldId()
	},

	getHardwareId() {
		return RNEmarsysWrapper.getHardwareId()
	},

	getLanguageCode() {
		return RNEmarsysWrapper.getLanguageCode()
	},

	getSdkVersion() {
		return RNEmarsysWrapper.getSdkVersion()
	},

	push: Push,
	inApp: InApp,
	InlineInAppView,
	inbox: Inbox,
	predict: Predict,
	geofence: Geofence,

};

export default Emarsys;

import { version } from './package.json';
RNEmarsysWrapper.trackCustomEvent('wrapper:init', { type: 'react-native', version })
