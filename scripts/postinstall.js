const fs = require('fs').promises;

(async () => {
  // Copy podspec for react native
  let podspec = await fs.readFile('ios/RNEmarsysSDK.podspec', { encoding: 'utf8' });
  podspec = podspec.replace("'..', 'package.json'", "'package.json'");
  podspec = podspec.replace("s.dependency 'ExpoModulesCore'", "");
  podspec = podspec.replace("s.source_files = '", "s.source_files = 'ios/");
  podspec = podspec.replace("s.exclude_files = '", "s.exclude_files = 'ios/");
  await fs.writeFile('RNEmarsysSDK.podspec', podspec);

  // Check if expo exist
  let expoExist = true;
  try {
    require('expo/package.json');
    require('expo-modules-core/package.json');
    expoExist = true;
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    expoExist = false;
  }

  // Enable/disable expo plugin files
  const expoPluginFiles = [
    'android/build.gradle',
    'android/src/main/java/com/emarsys/reactnative/expo/EmarsysPackage.kt',
    'android/src/main/java/com/emarsys/reactnative/expo/EmarsysApplicationLifecycleListener.kt',
    'ios/expo/EmarsysAppDelegateSubscriber.swift'
  ];
  const enableStart = '// Expo plugin - START';
  const disableStart = '/* Expo plugin - START';
  for (let file of expoPluginFiles) {
    let content = await fs.readFile(file, { encoding: 'utf8' });
    content = expoExist ? content.replace(disableStart, enableStart) : content.replace(enableStart, disableStart);
    await fs.writeFile(file, content);
  }

})();
