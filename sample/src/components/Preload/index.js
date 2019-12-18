import { inject, observer } from "mobx-react"

import { toJS } from "mobx"

import React, { Component } from "react"

import { StyleSheet, View, Text, Button, ScrollView } from "react-native"

import { SafeAreaView } from "react-navigation"

import showAlert from "../Helpers"

import EmarsysWrapper from "react-native-emarsys-wrapper"

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
	title: {
		fontSize: 36,
		color: "#076bae",
		fontWeight: "500", 
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
export default class Preload extends Component {

	componentDidMount() {
		this.checkAuth()
		
		console.log( "DeepLink Mount :", toJS( this.props.auth.deepLink ) )
	}
	
	checkAuth = () => {
		if ( toJS( this.props.auth.token ) ) {
			this.props.navigation.navigate("Init", {
				cache: Date.now(),
			})
		}
	}
	
	// MARK: - Init *************************************************************************************************************

	async wrapperInit() {
		let applicationCode = "EMSF6-F532D"
		let contactFieldId = 3772
		let predictMerchantId = "1A517D7BD6EAF712"

		try {
			let config = await EmarsysWrapper.init(applicationCode, contactFieldId, predictMerchantId)
			console.log("Init Done: ", config)
			
			this.props.auth.init = true
			
			showAlert( "Init", "Init Done: ", config )
		} catch (e) {
			console.log("Init Fail: ", e)
			showAlert( "Init", "Init Fail: ", e )		
		}
	}
	
	async wrapperLogin( callback ) {
		let contactFieldValue = "second@email-test.com"

		try {
			let result = await EmarsysWrapper.setContact(contactFieldValue)
			console.log("setContact Done: ", result)
			showAlert( "setContact", "setContact Done.", false,  Boolean( callback ) && callback() )
		} catch (e) {
			console.log("setContact Fail: ", e)
			showAlert( "setContact", "setContact Fail: ", e )
		}
	}
	
	render() {
		return (
			<SafeAreaView style={styles.inbase}>
				<ScrollView contentContainerStyle={styles.scrollBase}>
					<View style={ styles.base }>
						<Text
							style={ styles.title }
						>
							Emarsys App
						</Text>
						
						{ !toJS( this.props.auth.init ) ? (
						
							<View style={ styles.buttonInit }>
								 <Button
									title="Init"
									color="#595959"
									onPress={() => {
										this.wrapperInit()
									}}
								/>
							</View>
							
						) : null }
						
						{ ( toJS( this.props.auth.init ) && !toJS( this.props.auth.token ) ) ? (
						
							<View style={ styles.buttonLogin }>
								 <Button
									title="Login to App"
									color="#076bae"
									onPress={() => {
										this.wrapperLogin(() => {
											this.props.auth.login(() => {
												this.props.navigation.navigate("Init", {
													cache: Date.now(),
												})
											})
										})
									}}
								/>
							</View>	

						) : null }
						
					</View>
				</ScrollView>
			</SafeAreaView>
		)
	}
}
