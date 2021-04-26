import { inject, observer } from "mobx-react"

import { toJS } from "mobx"

import React, { Component } from "react"

import { StyleSheet, View, Text, Button, ScrollView } from "react-native"

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
						<View style={ styles.buttonFetchMessages }>
							 <Button
								title="Fetch Inbox Messages"
								color="#04446E"
								onPress={() => {
									this.wrapperFetchMessages()
								}}
							/>
						</View>				
					</View>
				</ScrollView>
			</SafeAreaView>
		)
	}
}
