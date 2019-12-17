
# react-native-emarsys-wrapper

## React Native wrapper for Emarsys SDK

## Getting started

`$ npm install react-native-emarsys-wrapper --save`

### Mostly automatic installation

`$ react-native link react-native-emarsys-wrapper`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-emarsys-wrapper` and add `RNEmarsysWrapper.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNEmarsysWrapper.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
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


## Usage
```javascript
import RNEmarsysWrapper from 'react-native-emarsys-wrapper';

// TODO: What to do with the module?
RNEmarsysWrapper;
```
  
