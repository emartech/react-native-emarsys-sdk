import React, { Component } from "react";
import { AppRegistry } from "react-native";

import App from "./src/App";
import FirebaseMessage from './src/FirebaseMessage';

import { name as app, firebaseService } from "./app.json";

AppRegistry.registerComponent( app, () => App );
AppRegistry.registerHeadlessTask( firebaseService, () => FirebaseMessage );
