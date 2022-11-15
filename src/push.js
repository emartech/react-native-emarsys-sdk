import { NativeModules } from 'react-native';

const { RNEmarsysPushWrapper } = NativeModules;

const Push = {

	/**
	 * @desc The Emarsys SDK automatically handles setPushToken for the device and it is recommended to leave this to the SDK.
	 * @desc However if you have your custom implementation of MessagingService, please use the setPushToken() method.

		* @param required string pushToken - Push Token of your MessagingService
		* @return bool - success or failure
		*/
	setPushToken(pushToken) {
		return RNEmarsysPushWrapper.setPushToken(pushToken)
	},

	/**
	 * @desc If you want to remove pushToken for the Contact, please use clearPushToken().

		* @return bool - success or failure
		*/
	clearPushToken() {
		return RNEmarsysPushWrapper.clearPushToken()
	},

	pushToken() {
		return RNEmarsysPushWrapper.getPushToken()
	},

};

export default Push;
