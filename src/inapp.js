import { NativeModules } from 'react-native';

const { RNEmarsysInAppWrapper } = NativeModules;

const InApp = {

	/**
	 * @desc When a critical activity starts and should not be interrupted by InApp, use pause to pause InApp messages.
	 * @return bool - success or failure
	 */
	pause() {
		return RNEmarsysInAppWrapper.pause()
	},

	/**
	 * @desc In order to show inApp messages after being paused, use the resume method.
	 * @return bool - success or failure
	 */
	resume() {
		return RNEmarsysInAppWrapper.resume()
	},

};

export default InApp;
