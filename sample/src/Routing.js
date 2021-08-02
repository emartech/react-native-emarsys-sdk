import React from "react"

import { toJS } from "mobx"

import { createAppContainer } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator } from "react-navigation-tabs"

import { StyleSheet, TouchableOpacity, View, Platform } from "react-native"

import Emarsys from "react-native-emarsys-wrapper"

import Ionicon from "react-native-vector-icons/Ionicons"


import Init from "./components/Init"
import Push from "./components/Push"
import InApp from "./components/InApp"
import Predict from "./components/Predict"

import Auth from "./store/modules/Auth" 

import showAlert from "./components/Helpers"

wrapperLogin = async ( callback ) => {
	let contactFieldId = 100005878
	let contactFieldValue = "test@emarsys.com"
	
	try {
		let result = await Emarsys.setContact(contactFieldId, contactFieldValue)
		console.log("setContact Done: ", result)
		showAlert( "setContact", "setContact Done.", false,  Boolean( callback ) && callback() )
	} catch (e) {
		console.log("setContact Fail: ", e)
		showAlert( "setContact", "setContact Fail: ", e )
	}
}

wrapperLogout = async ( callback ) => {
	try {
		let result = await Emarsys.clearContact()
		console.log("clearContact Done: ", result)
		showAlert( "clearContact", "clearContact Done.", false,  Boolean( callback ) && callback() )
	} catch (e) {
		console.log("clearContact Fail: ", e)
		showAlert( "clearContact", "clearContact Fail: ", e )
	}
}	

const styles = StyleSheet.create({
	headerBtnBox: {
		flex: 1, 
		padding: 14, 
		textAlign: "center", 
		justifyContent: "center", 
		alignItems: "center", 
	},
	headerBtnBoxIOS: {
		flex: 1, 
		padding: 10, 
		textAlign: "center", 
		justifyContent: "center", 
		alignItems: "center", 
	},
	headerBtnIcon: {
		fontSize: 26, 
		lineHeight: 26, 
		width: 26, 
		height: 26, 
		textAlign: "center", 
		color: "#ffffff", 
		textAlignVertical: "top", 
	},
	headerBtnIconIOS: {
		fontSize: 22, 
		lineHeight: 22, 
		width: 22, 
		height: 22, 
		textAlign: "center", 
		color: "#ffffff", 
		textAlignVertical: "top", 
	},
	headerTitleStyle: {
		fontSize: 20, 
		color: "#ffffff", 
		fontWeight: "600", 
		lineHeight: 28,
		textAlign: "center", 
		alignSelf: "center", 
		justifyContent: "center", 
		flex: 1, 
		textAlignVertical: "center", 
	},
	headerTitleStyleIOS: {
		fontSize: 16, 
		color: "#ffffff", 
		fontWeight: "600", 
		lineHeight: 24,
		textAlign: "center", 
		alignSelf: "center", 
		justifyContent: "center", 
		flex: 1, 
		textAlignVertical: "center", 
	},
	headerStyle: {
		backgroundColor: "#076bae",
	}, 
})

const btnPreload = navigation => {
	if ( !navigation ) return (<View />)

	return toJS( Auth.token ) ? (
		<View />
	) : (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={() => {
				navigation.navigate("Preload", {
					cache: Date.now(), 
				})
			}}
		>
			<View style={ Platform.OS === "ios" ? styles.headerBtnBoxIOS : styles.headerBtnBox }>
				<Ionicon name="md-apps" style={ Platform.OS === "ios" ? styles.headerBtnIconIOS : styles.headerBtnIcon } />
			</View>
		</TouchableOpacity>
	)
}

const InitStackRouteConfig = {
	Init: {
		screen: Init,
		navigationOptions: ({ navigation }) => ({
			title: "Init",
			headerLayoutPreset: "center",
			headerTitleStyle: Platform.OS === "ios" ? styles.headerTitleStyleIOS : styles.headerTitleStyle,
			headerStyle: styles.headerStyle,
		}),
	},
}

const PushStackRouteConfig = {
	Push: {
		screen: Push,
		navigationOptions: ({ navigation }) => ({
			title: "Push",
			headerLayoutPreset: "center",
			headerTitleStyle: Platform.OS === "ios" ? styles.headerTitleStyleIOS : styles.headerTitleStyle,
			headerStyle: styles.headerStyle,
		}),
	},
}

const InAppStackRouteConfig = {
	InApp: {
		screen: InApp,
		navigationOptions: ({ navigation }) => ({
			title: "InApp",
			headerLayoutPreset: "center",
			headerTitleStyle: Platform.OS === "ios" ? styles.headerTitleStyleIOS : styles.headerTitleStyle,
			headerStyle: styles.headerStyle,
		}),
	},
}

const PredictStackRouteConfig = {
	Predict: {
		screen: Predict,
		navigationOptions: ({ navigation }) => ({
			title: "Predict",
			headerLayoutPreset: "center",
			headerTitleStyle: Platform.OS === "ios" ? styles.headerTitleStyleIOS : styles.headerTitleStyle,
			headerStyle: styles.headerStyle,
		}),
	},
}

const InitStackNavigatorConfig = {
	initialRouteName: "Init",
}

const PushStackNavigatorConfig = {
	initialRouteName: "Push",
}

const InAppStackNavigatorConfig = {
	initialRouteName: "InApp",
}

const PredictStackNavigatorConfig = {
	initialRouteName: "Predict",
}

const InitStack = createStackNavigator(InitStackRouteConfig, InitStackNavigatorConfig)
const PushStack = createStackNavigator(PushStackRouteConfig, PushStackNavigatorConfig)
const InAppStack = createStackNavigator(InAppStackRouteConfig, InAppStackNavigatorConfig)
const PredictStack = createStackNavigator(PredictStackRouteConfig, PredictStackNavigatorConfig)

const bottomTabRouteConfig = {
	Init: {
		screen: InitStack,
		navigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				return <Ionicon name="ios-cog" size={22} color={tintColor} />
			},
		}),
	},
	Push: {
		screen: PushStack,
		navigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				return <Ionicon name="ios-chatbubbles" size={22} color={tintColor} />
			},
		}),
	},
	InApp: {
		screen: InAppStack,
		navigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				return <Ionicon name="ios-today" size={22} color={tintColor} />
			},
		}),
	},
	Predict: {
		screen: PredictStack,
		navigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				return <Ionicon name="ios-pricetags" size={22} color={tintColor} />
			},
		}),
	},
}

const bottomTabNavigatorConfig = {
	initialRouteName: "Init",

	tabBarOptions: {
		activeTintColor: "#076bae",
		inactiveTintColor: "#828282",
		labelStyle: {
			fontSize: 12,
		},
		tabStyle: {
			paddingTop: 4,
			paddingBottom: 6,
		},
		style: {
			height: 60,
			backgroundColor: "#ffffff",
		},
	},
}

const BottomTabNavigator = createBottomTabNavigator( bottomTabRouteConfig, bottomTabNavigatorConfig )

const Routing = createAppContainer( BottomTabNavigator )

export default Routing
