const fs = require('fs').promises;

(async () => {
  // Disable expo plugin files
  // Package postinstall works fine in customer's projects,
  // but doesn't work in this example, since it will find expo in the parent node_modules.
  const expoPluginFiles = [
    '../../android/build.gradle',
    '../../android/src/main/java/com/emarsys/reactnative/expo/EmarsysPackage.kt',
    '../../android/src/main/java/com/emarsys/reactnative/expo/EmarsysApplicationLifecycleListener.kt',
    '../../ios/expo/EmarsysAppDelegateSubscriber.swift'
  ];
  const enableStart = '// Expo plugin - START';
  const disableStart = '/* Expo plugin - START';
  for (let file of expoPluginFiles) {
    let content = await fs.readFile(file, { encoding: 'utf8' });
    content = content.replace(enableStart, disableStart);
    await fs.writeFile(file, content);
  }
})();
