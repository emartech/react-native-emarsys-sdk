
# react-native-emarsys-wrapper

## React Native wrapper for Emarsys SDK

## Setup

`$ npm install git+ssh://git@github.com/emartech/react-native-emarsys-sdk.git --save`

### Mostly automatic installation

`$ react-native link react-native-emarsys-wrapper`

## Sample app
We created a sample application to help in the integration and give an example. Find instructions for the build process <a href="https://github.com/emartech/react-native-emarsys-sdk/tree/master/sample" title="Sample app">here</a>.

### Manual installation

#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-emarsys-wrapper` and add `RNEmarsysWrapper.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNEmarsysWrapper.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Add to your Podfile in ios folder:
  	```
	platform :ios, '11.0'

	source 'https://github.com/CocoaPods/Specs.git'

	target "<TargetName>" do
	
	  # Add this line to your Podfile
	  pod 'RNEmarsysWrapper', :podspec => '../node_modules/react-native-emarsys-wrapper/ios/RNEmarsysWrapper.podspec'
	  
	end
  	```	
5. After creating/editing the Podfile, you need to execute the command below to download CocoaPods dependencies: pod install
6. Run your project (`Cmd+R`)

#### Android

1. Open up `android/app/src/main/java/[...]/MainApplication.java`
  - Add `import com.emarsys.rnwrapper.RNEmarsysWrapperPackage;` to the imports at the top of the file
  - Add `new RNEmarsysWrapperPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-emarsys-wrapper'
  	project(':react-native-emarsys-wrapper').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-emarsys-wrapper/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-emarsys-wrapper')
  	```

### Requirements

- Android version 0.60.0+
- The iOS target should be iOS 11 or higher.
- In order to be able to send push messages to your app, you need to have certifications from Apple Push Notification service (APNs).


> `Note`
>
> For further information about how to use our SDK please visit our [Documentation](https://github.com/emartech/react-native-emarsys-sdk/wiki "Wiki")
