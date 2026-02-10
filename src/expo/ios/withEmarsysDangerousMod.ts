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
      // TODO - get packageDir with require.resolve
      const packageDir = `${projectRoot}/node_modules/react-native-emarsys-sdk`;
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

  pod 'EmarsysNotificationService'
end
`       );
      }

      return config;
    },
  ]);
