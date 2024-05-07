import React from "react";
import PropTypes from "prop-types";
import { NativeModules, requireNativeComponent, UIManager, findNodeHandle } from "react-native";

const { RNEmarsysInAppWrapper } = NativeModules;

const InApp = {
  /**
   * When a critical activity starts and should not be interrupted by InApp, use `pause()` to pause InApp messages.
   * @returns {Promise<boolean>} Promise with success or failure boolean.
   */
  pause() {
    return RNEmarsysInAppWrapper.pause();
  },

  /**
   * In order to show inApp messages after being paused, use the `resume()` method.
   * @returns {Promise<boolean>} Promise with success or failure boolean.
   */
  resume() {
    return RNEmarsysInAppWrapper.resume();
  },
};

const RNEmarsysInlineInAppView = requireNativeComponent("RNEmarsysInlineInAppView");

class InlineInAppView extends React.Component {
  loadInApp(viewId) {
    let commandID = UIManager.RNEmarsysInlineInAppView.Commands.loadInApp;
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      Platform.OS === "ios" ? commandID : commandID.toString(),
      [viewId]
    );
  }

  _onAppEvent = (event) => {
    if (!this.props.onAppEvent) return;
    this.props.onAppEvent(event.nativeEvent.eventName, event.nativeEvent.payload);
  };

  _onCompleted = (event) => {
    if (!this.props.onCompleted) return;
    this.props.onCompleted(event.nativeEvent.error);
  };

  _onClose = () => {
    if (!this.props.onClose) return;
    this.props.onClose();
  };

  render() {
    return (
      <RNEmarsysInlineInAppView
        {...this.props}
        onAppEvent={this._onAppEvent}
        onCompleted={this._onCompleted}
        onClose={this._onClose}
      />
    );
  }
}

InlineInAppView.propTypes = {
  onAppEvent: PropTypes.func,
  onCompleted: PropTypes.func,
  onClose: PropTypes.func,
};

export default InApp;
export { InlineInAppView };
