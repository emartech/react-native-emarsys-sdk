
# react-native-emarsys-wrapper

[![REUSE status](https://api.reuse.software/badge/github.com/emartech/react-native-emarsys-sdk)](https://api.reuse.software/info/github.com/emartech/react-native-emarsys-sdk)

React Native wrapper for Emarsys SDK.

For further information about how to use the wrapper please visit our [Documentation](https://github.com/emartech/react-native-emarsys-sdk/wiki "Wiki").

## Sample app
We created a sample application to help in the integration and give an example. Find instructions for the build process [here](https://github.com/emartech/react-native-emarsys-sdk/tree/master/sample "Sample app").

## Setup

`$ npm install "git+ssh://git@github.com/emartech/react-native-emarsys-sdk.git#<version>" --save`

Check the latest version [here](https://github.com/emartech/react-native-emarsys-sdk/releases)

## ⚠️ Known issue: React Native New Architecture

Inline in-app view is not compatible with React Native's [New Architecture](https://reactnative.dev/docs/the-new-architecture/landing-page) (Fabric / Turbo) introduced in React Native 0.68+.  
This implementation is based on the legacy native UI system and **will not be updated to support the New Architecture**.

## Requirements

- React Native version 0.67.3 or higher.
- The minimum Android version should be at least API level 24. Requires compileSdkVersion 31 or higher.
- The iOS target should be iOS 11 or higher. In order to be able to send push messages to your app, you need to have certifications from Apple Push Notification service (APNs).

## Contributing

Should you have any suggestions or bug reports, please raise an [SAP Emarsys support request](https://help.sap.com/docs/SAP_EMARSYS/8bf21e3e3ad3475bb9e25de1e0ac3d86/0f337f67c0cf4c799d3e976f4e24a503.html?locale=en-US&version=CLOUD).

## Code of Conduct

Please see our [Code of Conduct](https://github.com/emartech/.github/blob/main/CODE_OF_CONDUCT.md) for details.

## Licensing

Please see our [LICENSE](https://github.com/emartech/react-native-emarsys-sdk/blob/master/LICENSE) for copyright and license information.
