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
	hr: {
		marginTop: 24, 
		width: "100%",
		height: 1,		
		maxWidth: 420,
		backgroundColor: "#595959", 
	},
	buttonInit: {
		marginTop: 40,
		width: "100%", 
		maxWidth: 420,
	}, 
	buttonLogin: {
		marginTop: 24, 
		width: "100%", 
		maxWidth: 420,
	}, 
	buttonGoto: {
		marginTop: 24, 
		width: "100%", 
		maxWidth: 420,
	},
	buttonTrackCustomEvent: {
		width: "100%", 
		maxWidth: 420,
	},	
	buttonDeepLink: {
		marginTop: 24, 
		width: "100%", 
		maxWidth: 420,
	}, 	
})

@inject("auth")
@observer
export default class Init extends Component {
	
	// MARK: - Init *************************************************************************************************************
	
	async wrapperTrackCustomEvent() {
		let eventName = "testingEventName"
		let eventAttributes = {
			"customEvent-key1": "customEvent-value1",
			"customEvent-key2": "customEvent-value2",
		}
		
		try {
			let result = await Emarsys.trackCustomEvent(eventName, eventAttributes)
			console.log("trackCustomEvent Done: ", result)
			showAlert( "trackCustomEvent", "trackCustomEvent Done." )
		} catch (e) {
			console.log("trackCustomEvent Fail: ", e)
			showAlert( "trackCustomEvent", "trackCustomEvent Fail: ", e )
		}
	}	
	
	// MARK: - DeepLink *************************************************************************************************************

	async wrapperTrackDeepLink(url) {
		try {
			let result = await Emarsys.trackDeepLink(url)
			console.log("trackDeepLink Done: ", url, result)
			showAlert( "trackDeepLink", "trackDeepLink Done." )
		} catch (e) {
			console.log("trackDeepLink Fail: ", e)
			showAlert( "trackDeepLink", "trackDeepLink Fail: ", e )
		}
	}

	// MARK: - ApplicationCode, contactFieldId and merchantId change *************************************************************************************************************

	async wrapperChangeApplicationCode() {
		let applicationCodeChange = "EMSF6-F532D"
		let contactFieldId = 3

		try {
			let result = await Emarsys.changeApplicationCode(applicationCodeChange, contactFieldId)
			console.log("changeApplicationCode Done: ", result)
			showAlert( "changeApplicationCode", "changeApplicationCode Done.")
		} catch (e) {
			console.log("changeApplicationCode Fail: ", e)
			showAlert( "changeApplicationCode", "changeApplicationCode Fail: ", e )
		}
	}

	async wrapperChangeMerchantId() {
		let predictMerchantIdChange = null;

		try {
			let result = await Emarsys.changeMerchantId(predictMerchantIdChange)
			console.log("changeMerchantId Done: ", result)
			showAlert( "changeMerchantId", "changeMerchantId Done.")
		} catch (e) {
			console.log("changeMerchantId Fail: ", e)
			showAlert( "changeMerchantId", "changeMerchantId Fail: ", e )
		}
	}

	async wrapperGetApplicationCode() {
		try {
			let applicationCode = await Emarsys.getApplicationCode()
			console.log("getApplicationCode Done: ", applicationCode)
			showAlert( "getApplicationCode", "getApplicationCode Done: ", applicationCode )
		} catch (e) {
			console.log("getApplicationCode Fail: ", e)
			showAlert( "getApplicationCode", "getApplicationCode Fail: ", e )
		}
	}

	async wrapperGetMerchantId() {
		try {
			let merchantId = await Emarsys.getMerchantId()
			console.log("getMerchantId Done: ", merchantId)
			showAlert( "getMerchantId", "getMerchantId Done: ", merchantId )
		} catch (e) {
			console.log("getMerchantId Fail: ", e)
			showAlert( "getMerchantId", "getMerchantId Fail: ", e )
		}
	}

	async wrapperGetContactFieldId() {
		try {
			let contactFieldId = await Emarsys.getContactFieldId()
			console.log("getContactFieldId Done: ", contactFieldId)
			showAlert( "getContactFieldId", "getContactFieldId Done: ", contactFieldId )
		} catch (e) {
			console.log("getContactFieldId Fail: ", e)
			showAlert( "getContactFieldId", "getContactFieldId Fail: ", e )
		}
	}	

	render() {
		return (
			<SafeAreaView style={styles.inbase}>
				<ScrollView contentContainerStyle={styles.scrollBase}>
					<View style={ styles.base }>

						<View style={ styles.buttonTrackCustomEvent }>
							 <Button
								title="Track Custom Event"
								color="#595959"
								onPress={() => {
									this.wrapperTrackCustomEvent()
								}}
							/>
						</View>	
						
						<View style={ styles.hr } />
						
						<View style={ styles.buttonDeepLink }>
							 <Button
								title={"Track DeepLink: " + ( toJS( this.props.auth.deepLink ) ? toJS( this.props.auth.deepLink ) : "No initial link" ) }
								color="#595959"
								onPress={() => {
									this.wrapperTrackDeepLink( this.props.auth.deepLink )
								}}
							/>
						</View>				

						<View style={ styles.hr } />
						
						<View style={ styles.buttonLogin }>
							 <Button
								title="Change ApplicationCode"
								color="#076bae"
								onPress={() => {
									this.wrapperChangeApplicationCode()
								}}
							/>
						</View>	

						<View style={ styles.buttonLogin }>
							 <Button
								title="Change MerchantId"
								color="#076bae"
								onPress={() => {
									this.wrapperChangeMerchantId()
								}}
							/>
						</View>	
						
						<View style={ styles.hr } />

						<View style={ styles.buttonGoto }>
							 <Button
								title="Get ApplicationCode"
								color="#ED5E21"
								onPress={() => {
									this.wrapperGetApplicationCode()
								}}
							/>
						</View>	

						<View style={ styles.buttonGoto }>
							 <Button
								title="Get MerchantId"
								color="#ED5E21"
								onPress={() => {
									this.wrapperGetMerchantId()
								}}
							/>
						</View>	

						<View style={ styles.buttonGoto }>
							 <Button
								title="Get ContactFieldId"
								color="#ED5E21"
								onPress={() => {
									this.wrapperGetContactFieldId()
								}}
							/>
						</View>	

					</View>
				</ScrollView>
			</SafeAreaView>
		)
	}
}
