[![REUSE status](https://api.reuse.software/badge/github.com/emartech/react-native-emarsys-sdk)](https://api.reuse.software/info/github.com/emartech/react-native-emarsys-sdk)

# React Native wrapper for SAP Emarsys SDK

> **Important**  
> This wrapper is in Pilot release. Please contact your Client Success Manager before starting the implementation.

For further information about how to use the wrapper please visit our [Documentation](https://github.com/emartech/react-native-emarsys-sdk/wiki/New-arch "Wiki").

## Installation

```bash
npm install "git+ssh://git@github.com/emartech/react-native-emarsys-sdk.git#<version>" --save
```

Check the latest version [here](https://github.com/emartech/react-native-emarsys-sdk/releases)

---

## Configuration

### With Expo

The React Native wrapper for SAP Emarsys SDK automatically integrates the **Emarsys SDK** into your Expo app’s native modules.

1. Add the plugin config options to your `app.json` with your own values:

```json
{
  "expo": {
    ...
    "plugins": [
      ...
      [
        "react-native-emarsys-sdk",
        {
          "applicationCode": <APPLICATION_CODE: STRING>,
          "merchantId": <MERCHANT_ID: STRING>,
          "enableConsoleLogging": <ENABLE_CONSOLE_LOGGING: BOOL>,
          "androidSharedPackageNames": <ANDROID_SHARED_PACKAGE_NAMES: LIST>,
          "androidSharedSecret": <ANDROID_SHARED_SECRET: STRING>,
          "iosSharedKeychainAccessGroup": <IOS_SHARED_KEYCHAIN_ACCESS_GROUP: STRING>
        }
      ]
    ]
    ...
  }
}
```

2. Add your `google-services.json` file into the app’s assets folder.
3. *(Optional)* Provide a custom Android **push notification icon**:
   - Place an image named **`mobile_engage_logo_icon.jpg`** inside the app’s `assets` folder.
   - During build, it will be copied into the correct Android resources directory (`res/drawable`).

4. Run prebuild to apply the changes:

```bash
npx expo prebuild
```

### Without Expo (Bare React Native)

Please follow our [Documentation](https://github.com/emartech/react-native-emarsys-sdk/wiki/New-arch#bare-react-native) to set up SAP Emarsys SDK natively into your app’s native modules.

---

## Contributing

Should you have any suggestions or bug reports, please raise an [SAP Emarsys support request](https://help.sap.com/docs/SAP_EMARSYS/8bf21e3e3ad3475bb9e25de1e0ac3d86/0f337f67c0cf4c799d3e976f4e24a503.html?locale=en-US&version=CLOUD).

## Code of Conduct

Please see our [Code of Conduct](https://github.com/emartech/.github/blob/main/CODE_OF_CONDUCT.md) for details.

## Licensing

Please see our [LICENSE](https://github.com/emartech/react-native-emarsys-sdk/blob/master/LICENSES) for copyright and license information.
