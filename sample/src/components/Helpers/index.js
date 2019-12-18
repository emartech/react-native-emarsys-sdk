import React, { Component } from "react"

import { Alert } from "react-native"

export default showAlert = ( title, desc, extra, callback ) => {
    Alert.alert(
        title,
        desc + ( extra ? extra : "" ), [{
            text: "OK",
            onPress: () => Boolean( callback ) && callback(),
        }], { 
            cancelable: true 
        },
    )
}
