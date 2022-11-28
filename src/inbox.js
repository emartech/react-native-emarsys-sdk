import { NativeModules } from 'react-native';

const { RNEmarsysInboxWrapper } = NativeModules;

const Inbox = {

	fetchMessages() {
		return RNEmarsysInboxWrapper.fetchMessages()
	},

	addTag(tag, messageId) {
		return RNEmarsysInboxWrapper.addTag(tag, messageId)
	},

	removeTag(tag, messageId) {
		return RNEmarsysInboxWrapper.removeTag(tag, messageId)
	},

};

export default Inbox;
