import { ConfigPlugin } from 'expo/config-plugins';
import { type EMSOptions } from '../withEmarsysPlugin';
import { withEmarsysProjectBuildGradle } from './withEmarsysProjectBuildGradle';
import { withEmarsysAppBuildGradle } from './withEmarsysAppBuildGradle';
import { withEmarsysAndroidManifest } from './withEmarsysAndroidManifest';
import { withEmarsysSmallNotificationIcon } from './withEmarsysSmallNotificationIcon';
import { withEmarsysGoogleServicesJson } from './withEmarsysGoogleServicesJson';

export const withEmarsysAndroid: ConfigPlugin<EMSOptions> = (config, options) => {
  config = withEmarsysProjectBuildGradle(config);
  config = withEmarsysAppBuildGradle(config);
  config = withEmarsysAndroidManifest(config, options);
  config = withEmarsysGoogleServicesJson(config, options);
  config = withEmarsysSmallNotificationIcon(config, options);
  return config;
};
