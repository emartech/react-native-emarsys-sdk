import React, { Component } from "react"

import { Linking, Platform } from "react-native"

import { Provider as StoreProvider } from "mobx-react"

import { toJS } from "mobx"

import store from "./store" 
import Auth from "./store/modules/Auth" 

import Routing from "./Routing"

import Navigation from "./Navigation"

export default class App extends Component {

	checkAuth = () => {
		if ( !toJS( Auth.token ) ) {
			Navigation.navigate("Preload", {
				cache: Date.now(),
			})
		}
	}
	
	componentDidMount() {
		this.linkingMount()

		this.checkAuth()
	}	
	
	componentWillUnmount() {
		this.linkingUnMount()
	}	
	
	linkingMount( callback ) {
		if (Platform.OS === "ios") {
			Linking.addEventListener("url", this.handleNavigation)
		} else {
			Linking.getInitialURL().then(url => {
				//console.log("****** REACT HANDLE DEEPlink ANDROID", url)
				
				if ( url ) {
					Auth.deepLink = url	
				}
			})
		}
		
		Boolean( callback ) && callback()
	}	
	
	linkingUnMount() {
		if (Platform.OS === "ios") {
			Linking.removeEventListener("url", this.handleNavigation)
		}
	}

	handleNavigation = e => {
		//console.log("****** REACT HANDLE DEEPlink IOS", e.url )

		if ( e && e.url ) {
			Auth.deepLink = e.url
		}
	}
	
	render() {
		
		// ****************************************************************************************************
		console.disableYellowBox = true

		return (
			<StoreProvider {...store}>
				<Routing 
					onNavigationStateChange={(prevState, currentState) => {
						// console.log("prevState", prevState)
						// console.log("currentState", currentState)
					}}
					ref={ ( navigatorRef ) => {
						Navigation.setTopLevelNavigator( navigatorRef )
					}}
				/>
			</StoreProvider>
		)
	}
}
