import React from 'react';
import { NativeModules, requireNativeComponent, UIManager, findNodeHandle } from 'react-native';
import PropTypes from 'prop-types';

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

const RNEmarsysInlineInAppView = requireNativeComponent('RNEmarsysInlineInAppView');

class InlineInAppView extends React.Component {
	loadInApp(viewId) {
		let commandID = UIManager.RNEmarsysInlineInAppView.Commands.loadInApp
		UIManager.dispatchViewManagerCommand(
			findNodeHandle(this),
			Platform.OS === 'ios' ? commandID : commandID.toString(),
			[viewId],
		);
	}

	_onAppEvent = event => {
		if (!this.props.onAppEvent) { return; }
		this.props.onAppEvent(event.nativeEvent.eventName, event.nativeEvent.payload);
	};

	_onCompleted = event => {
		if (!this.props.onCompleted) { return; }
		this.props.onCompleted(event.nativeEvent.error);
	};

	_onClose = event => {
		if (!this.props.onClose) { return; }
		this.props.onClose();
	};

	render() {
		return <RNEmarsysInlineInAppView {...this.props}
			onAppEvent={this._onAppEvent}
			onCompleted={this._onCompleted}
			onClose={this._onClose} />;
	}
}

InlineInAppView.propTypes = {
	onAppEvent: PropTypes.func,
	onCompleted: PropTypes.func,
	onClose: PropTypes.func,
};

export default InApp;
export { InlineInAppView };
