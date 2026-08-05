import { ConfigPlugin, withDangerousMod } from 'expo/config-plugins';
import { type EMSOptions } from '../withEmarsysPlugin';

export const withEmarsysGoogleServicesJson: ConfigPlugin<EMSOptions> = (config, options) => {
  const DEFAULT_PATH = './assets/google-services.json'
  const androidGoogleServicesJsonPath = options.androidGoogleServicesJsonPath || DEFAULT_PATH;

  return withDangerousMod(config, [
    'android',
    async config => {
      const fs = require('fs');
      const path = require('path');
      const projectRoot = config.modRequest.projectRoot;
      const source = path.join(projectRoot, androidGoogleServicesJsonPath);
      const dest = path.join(projectRoot, 'android', 'app', 'google-services.json');

      if (!fs.existsSync(source)) {
        throw new Error(
          `File ${source} does not exist. Please review androidGoogleServicesJsonPath, or add file to default path ./assets/google-services.json`
        );
      }

      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(source, dest);

      return config;
    },
  ]);
};
