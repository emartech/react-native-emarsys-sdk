import { NativeModules } from "react-native";

const { RNEmarsysInboxWrapper } = NativeModules;

const Inbox = {
  /**
   * In order to receive the message Inbox content, you can use the fetchMessages method.
   * @returns {Promise<unknown[]>} Promise with the Inbox content.
   */
  fetchMessages() {
    return RNEmarsysInboxWrapper.fetchMessages();
  },

  /**
   * Tags are to be used to set the status of the inbox message, e.g. `"opened"`, `"seen"`, etc.
   *
   * There are 6 tags in total: `"high"`, `"cancelled"` and 4 others that are the only ones App developers can add: `"seen"`, `"opened"`, `"pinned"` and `"deleted"`.
   *
   * It is important to note all the tags though, as they will be included in the message payload in the SDK `tag` field.
   *
   * Depending on the `tag` included in the message, the message could be handled differently by the app.
   * An example would be that messages tagged with `"high"` (for High Priority) could be visible flagged/highlighted by the Contact.
   * @param {'seen' | 'opened' | 'pinned' | 'deleted'} tag - Label to use as the new message status.
   * @param {string} messageId - Id of the message to update the status of.
   * @returns {Promise<boolean>} Promise with success or failure boolean.
   */
  addTag(tag, messageId) {
    return RNEmarsysInboxWrapper.addTag(tag, messageId);
  },

  /**
   * To remove a label from a message, you can use `removeTag()` method.
   * @param {'high' | 'cancelled' | 'seen' | 'opened' | 'pinned' | 'deleted'} tag - Current message statues tag to remove.
   * @param {string} messageId - Id of the message to update the status of.
   * @returns {Promise<boolean>} Promise with success or failure boolean.
   */
  removeTag(tag, messageId) {
    return RNEmarsysInboxWrapper.removeTag(tag, messageId);
  },
};

export default Inbox;
