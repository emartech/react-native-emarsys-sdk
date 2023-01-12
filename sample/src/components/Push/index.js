import { inject, observer } from "mobx-react"

import { toJS } from "mobx"

import React, { Component } from "react"

import { StyleSheet, View, Button, ScrollView, SafeAreaView } from "react-native"

import showAlert from "../Helpers"

import Emarsys from "react-native-emarsys-wrapper"

const styles = StyleSheet.create({
	inbase: {
		flex: 1,
		width: "100%",
		backgroundColor: "#ffffff",
	},
	scrollBase: {
		flexGrow: 1,
		flexShrink: 0,
		flexBasis: "auto",
		width: "100%",
		backgroundColor: "#ffffff",
	},
	base: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",

		backgroundColor: "#ffffff",

		paddingTop: 16,
		paddingBottom: 24,
		paddingLeft: 12,
		paddingRight: 12,
	},
	buttonSetPushToken: {
		marginTop: 24,
		width: "100%",
		maxWidth: 420,
	},
	buttonClearPushToken: {
		marginTop: 24,
		width: "100%",
		maxWidth: 420,
	},
	buttonTrackMessageOpen: {
		marginTop: 24,
		width: "100%",
		maxWidth: 420,
	},
})

@inject("auth")
@observer
export default class Push extends Component {

	// MARK: - Push *************************************************************************************************************

	async wrapperSetPushToken() {
		let deviceToken = toJS( this.props.auth.messageToken ) ? toJS( this.props.auth.messageToken ) : ""

		try {
			let result = await Emarsys.push.setPushToken( deviceToken )
			console.log("setPushToken Done: ", deviceToken, result)
			showAlert( "setPushToken", "setPushToken Done.")
		} catch (e) {
			console.log("setPushToken Fail: ", e)
			showAlert( "setPushToken", "setPushToken Fail: ", e )
		}
	}

	async wrapperClearPushToken() {
		try {
			let result = await Emarsys.push.clearPushToken()
			console.log("clearPushToken Done: ", result)
			showAlert( "clearPushToken", "clearPushToken Done.")
		} catch (e) {
			console.log("clearPushToken Fail: ", e)
			showAlert( "clearPushToken", "clearPushToken Fail: ", e )
		}
	}

	async wrapperGetPushToken() {
		try {
			let pushToken = await Emarsys.push.pushToken()
			console.log("pushToken Done: ", pushToken)
			showAlert( "pushToken", "pushToken Done.")
		} catch (e) {
			console.log("pushToken Fail: ", e)
			showAlert( "pushToken", "pushToken Fail: ", e )
		}
	}

	render() {
		return (
			<SafeAreaView style={styles.inbase}>
				<ScrollView contentContainerStyle={styles.scrollBase}>
					<View style={ styles.base }>
						<View style={ styles.buttonSetPushToken }>
							 <Button
								title="Set Push Token"
								color="#076bae"
								onPress={() => {
									this.wrapperSetPushToken()
								}}
							/>
						</View>
						<View style={ styles.buttonClearPushToken }>
							 <Button
								title="Clear Push Token"
								color="#0A9AFA"
								onPress={() => {
									this.wrapperClearPushToken()
								}}
							/>
						</View>
						<View style={ styles.buttonTrackMessageOpen }>
							 <Button
								title="Track Message Open"
								color="#04446E"
								onPress={() => {
									this.wrapperTrackMessageOpen()
								}}
							/>
						</View>
						<View style={ styles.buttonSetPushToken }>
							 <Button
								title="Push Token"
								color="#076bae"
								onPress={() => {
									this.wrapperGetPushToken()
								}}
							/>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		)
	}
}
