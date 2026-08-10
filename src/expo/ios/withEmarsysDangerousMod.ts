import { ConfigPlugin, withDangerousMod } from 'expo/config-plugins';
import { type EMSOptions } from '../withEmarsysPlugin';

const NOTIFICATION_SERVICE_TARGET = 'NotificationService';
const NOTIFICATION_SERVICE_FILES = [
  'NotificationService.swift',
  'NotificationService-Info.plist'
];

export const withEmarsysDangerousMod: ConfigPlugin<EMSOptions> = (config, _options) =>
  withDangerousMod(config, [
    'ios',
    (config) => {
      const fs = require('fs');
      const path = require('path');
      const projectRoot = config.modRequest.projectRoot;

      // Notification Service Extension
      // Copy files
      let packageDir;
      try {
        packageDir = path.dirname(require.resolve('react-native-emarsys-sdk/package.json'));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // Fallback when require.resolve failed, e.g. in example project
        packageDir = `${projectRoot}/node_modules/react-native-emarsys-sdk`;
      }
      const sourceDir = path.join(packageDir, 'ios', 'expo', NOTIFICATION_SERVICE_TARGET);
      const destDir = path.join(projectRoot, 'ios', NOTIFICATION_SERVICE_TARGET);
      if (!fs.existsSync(`${destDir}`)) {
        fs.mkdirSync(`${destDir}`);
      }
      for (const file of NOTIFICATION_SERVICE_FILES) {
        fs.copyFileSync(path.join(sourceDir, file), path.join(destDir, file));
      }

      // Update Podfile
      const podfilePath = path.join(projectRoot, 'ios', 'Podfile')
      const podfile = fs.readFileSync(podfilePath);
      if (!podfile.includes(`target '${NOTIFICATION_SERVICE_TARGET}'`)) {
        fs.appendFileSync(podfilePath, `
target '${NOTIFICATION_SERVICE_TARGET}' do
  use_frameworks!

  pod 'EmarsysNotificationService', '~> 3.9.0'
end
`       );
      }

      return config;
    },
  ]);
