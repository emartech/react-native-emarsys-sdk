import { NativeModules } from 'react-native';

const { RNEmarsysWrapper } = NativeModules;

const Inbox = {

	fetchMessages() {
		return RNEmarsysWrapper.fetchMessages()
	},

	addTag(tag, messageId) {
		return RNEmarsysWrapper.addTag(tag, messageId)
	},

	removeTag(tag, messageId) {
		return RNEmarsysWrapper.removeTag(tag, messageId)
	},

};

export default Inbox;
