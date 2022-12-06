import { inject, observer } from "mobx-react"

import { toJS } from "mobx"

import React, { Component } from "react"

import { StyleSheet, View, Text, Button, ScrollView, Platform, PermissionsAndroid } from "react-native"

import { SafeAreaView } from "react-navigation"

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
	hr: {
		marginTop: 24,
		width: "100%",
		height: 1,
		maxWidth: 420,
		backgroundColor: "#595959",
	},
	buttonPause: {
		width: "100%",
		maxWidth: 420,
	},
	buttonResume: {
		width: "100%",
		maxWidth: 420,
	},
	buttonSetEventHandler: {
		marginTop: 24,
		width: "100%",
		maxWidth: 420,
	},
	button: {
		marginTop: 24,
		width: "100%",
		maxWidth: 420,
	},
})

@inject("auth")
@observer
export default class InApp extends Component {

	// MARK: - InApp *************************************************************************************************************

	async wrapperPause() {
		try {
			let result = await Emarsys.inApp.pause()
			console.log("pause Done: ", result)

			this.props.auth.isPaused = true

			showAlert( "pause", "pause Done.")
		} catch (e) {
			console.log("pause Fail: ", e)
			showAlert( "pause", "pause Fail: ", e )
		}
	}

	async wrapperResume() {
		try {
			let result = await Emarsys.inApp.resume()
			console.log("resume Done: ", result)

			this.props.auth.isPaused = false

			showAlert( "resume", "resume Done.")
		} catch (e) {
			console.log("resume Fail: ", e)
			showAlert( "resume", "resume Fail: ", e )
		}
	}

	async wrapperSetEventHandler() {
		try {
			let eventData = await Emarsys.inApp.setEventHandler()
			console.log("setEventHandler Done: ", eventData)
			showAlert( "setEventHandler", "setEventHandler Done.")
		} catch (e) {
			console.log("setEventHandler Fail: ", e)
			showAlert( "setEventHandler", "setEventHandler Fail: ", e )
		}
	}

	// MARK: - Inbox *************************************************************************************************************

	async wrapperFetchMessages() {
		try {
			let inboxData = await Emarsys.inbox.fetchMessages()
			console.log("fetchMessages Done: ", inboxData)
			showAlert( "fetchMessages", "fetchMessages Done.")
		} catch (e) {
			console.log("fetchMessages Fail: ", e)
			showAlert( "fetchMessages", "fetchMessages Fail: ", e )
		}
	}

	async wrapperAddTag() {
		try {
			let tag = "seen"
			let messageId = "3475573315"

			let result = await Emarsys.inbox.addTag(tag, messageId)
			console.log("addTag Done: ", result)
			showAlert( "addTag", "addTag Done.")
		} catch (e) {
			console.log("addTag Fail: ", e)
			showAlert( "addTag", "addTag Fail: ", e )
		}
	}

	async wrapperRemoveTag() {
		try {
			let tag = "seen"
			let messageId = "3475573315"

			let result = await Emarsys.inbox.removeTag(tag, messageId)
			console.log("removeTag Done: ", result)
			showAlert( "removeTag", "removeTag Done.")
		} catch (e) {
			console.log("removeTag Fail: ", e)
			showAlert( "removeTag", "removeTag Fail: ", e )
		}
	}

	// MARK: - Geofence *************************************************************************************************************

	async wrapperRequestAlwaysAuthorization() {
		if (Platform.OS === 'ios') {
			try {
				let result = await Emarsys.geofence.requestAlwaysAuthorization()
				console.log("requestAlwaysAuthorization Done: ", result)
				showAlert( "requestAlwaysAuthorization", "requestAlwaysAuthorization Done.")
			} catch (e) {
				console.log("requestAlwaysAuthorization Fail: ", e)
				showAlert( "requestAlwaysAuthorization", "requestAlwaysAuthorization Fail: ", e )
			}
		} else if (Platform.OS === 'android') {
			try {
				var granted = true

				var checkGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
				if (!checkGranted) {
					const requestGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
					granted = granted && (requestGranted === PermissionsAndroid.RESULTS.GRANTED)
				}

				checkGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION)
				if (!checkGranted) {
					const requestGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION)
					granted = granted && (requestGranted === PermissionsAndroid.RESULTS.GRANTED)
				}

				checkGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
				if (!checkGranted) {
					const requestGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
					granted = granted && (requestGranted === PermissionsAndroid.RESULTS.GRANTED)
				}

				console.log("requestLocationPermissions Done: granted: ", granted)
				showAlert( "requestLocationPermissions", "requestLocationPermissions Done.")
			} catch (err) {
				console.log("requestLocationPermissions Fail: ", e)
				showAlert( "requestLocationPermissions", "requestLocationPermissions Fail: ", e )
			}
		}
	}

	async wrapperGeofenceEnable() {
		try {
			let result = await Emarsys.geofence.enable()
			console.log("geofence.enable Done: ", result)
			showAlert( "geofence.enable", "geofence.enable Done.")
		} catch (e) {
			console.log("geofence.enable Fail: ", e)
			showAlert( "geofence.enable", "geofence.enable Fail: ", e )
		}
	}

	async wrapperGeofenceDisable() {
		try {
			let result = await Emarsys.geofence.disable()
			console.log("geofence.disable Done: ", result)
			showAlert( "geofence.disable", "geofence.disable Done.")
		} catch (e) {
			console.log("geofence.disable Fail: ", e)
			showAlert( "geofence.disable", "geofence.disable Fail: ", e )
		}
	}

	async wrapperGeofenceIsEnabled() {
		try {
			let result = await Emarsys.geofence.isEnabled()
			console.log("geofence.isEnabled Done: ", result)
			showAlert( "geofence.isEnabled", "geofence.isEnabled Done.")
		} catch (e) {
			console.log("geofence.isEnabled Fail: ", e)
			showAlert( "geofence.isEnabled", "geofence.isEnabled Fail: ", e )
		}
	}

	async wrapperSetInitialEnterTriggerEnabled() {
		try {
			let result = await Emarsys.geofence.setInitialEnterTriggerEnabled(true)
			console.log("geofence.setInitialEnterTrigger Done: ", result)
			showAlert( "geofence.setInitialEnterTrigger", "geofence.setInitialEnterTrigger Done.")
		} catch (e) {
			console.log("geofence.setInitialEnterTrigger Fail: ", e)
			showAlert( "geofence.setInitialEnterTrigger", "geofence.setInitialEnterTrigger Fail: ", e )
		}
	}

	async wrapperRegisteredGeofences() {
		try {
			let result = await Emarsys.geofence.registeredGeofences()
			console.log("geofence.registeredGeofences Done: ", result)
			showAlert( "geofence.registeredGeofences", "geofence.registeredGeofences Done.")
		} catch (e) {
			console.log("geofence.registeredGeofences Fail: ", e)
			showAlert( "geofence.registeredGeofences", "geofence.registeredGeofences Fail: ", e )
		}
	}

	render() {
		return (
			<SafeAreaView style={styles.inbase}>
				<ScrollView contentContainerStyle={styles.scrollBase}>
					<View style={ styles.base }>
						{ toJS( this.props.auth.isPaused ) ? (
							<View style={ styles.buttonResume }>
								 <Button
									title="Resume"
									color="#076bae"
									onPress={() => {
										this.wrapperResume()
									}}
								/>
							</View>
						) : (
							<View style={ styles.buttonPause }>
								 <Button
									title="Pause"
									color="#595959"
									onPress={() => {
										this.wrapperPause()
									}}
								/>
							</View>
						)}
						<View style={ styles.buttonSetEventHandler }>
							 <Button
								title="Set Event Handler"
								color="#04446E"
								onPress={() => {
									this.wrapperSetEventHandler()
								}}
							/>
						</View>

						<View style={ styles.hr } />

						<View style={ styles.button }>
							 <Button
								title="Fetch Inbox Messages"
								color="#04446E"
								onPress={() => {
									this.wrapperFetchMessages()
								}}
							/>
						</View>
						<View style={ styles.button }>
							 <Button
								title="Add Tag"
								color="#04446E"
								onPress={() => {
									this.wrapperAddTag()
								}}
							/>
						</View>
						<View style={ styles.button }>
							 <Button
								title="Remove Tag"
								color="#04446E"
								onPress={() => {
									this.wrapperRemoveTag()
								}}
							/>
						</View>

						<View style={ styles.hr } />

						<View style={ styles.button }>
							 <Button
								title={ Platform.OS === 'ios' ? "Request Always Authorization" : "Request location permissions" }
								color="#04446E"
								onPress={() => {
									this.wrapperRequestAlwaysAuthorization()
								}}
							/>
						</View>
						<View style={ styles.button }>
							 <Button
								title="Enable Geofence"
								color="#04446E"
								onPress={() => {
									this.wrapperGeofenceEnable()
								}}
							/>
						</View>
						<View style={ styles.button }>
							 <Button
								title="Disable Geofence"
								color="#04446E"
								onPress={() => {
									this.wrapperGeofenceDisable()
								}}
							/>
						</View>
						<View style={ styles.button }>
							 <Button
								title="Geofence isEnabled"
								color="#04446E"
								onPress={() => {
									this.wrapperGeofenceIsEnabled()
								}}
							/>
						</View>
						<View style={ styles.button }>
							 <Button
								title="Set Initial Enter Trigger Enabled"
								color="#04446E"
								onPress={() => {
									this.wrapperSetInitialEnterTriggerEnabled()
								}}
							/>
						</View>
						<View style={ styles.button }>
							 <Button
								title="Registered Geofences"
								color="#04446E"
								onPress={() => {
									this.wrapperRegisteredGeofences()
								}}
							/>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		)
	}
}
