import React, { Component } from "react";
import { AppRegistry } from "react-native";

import App from "./src/App";

import { name as app } from "./app.json";

AppRegistry.registerComponent( app, () => App );
