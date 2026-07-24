import { ConfigPlugin, createRunOncePlugin } from "expo/config-plugins";
import { withEmarsysAndroid } from "./android/withEmarsysAndroid";
import { withEmarsysiOS } from "./ios/withEmarsysiOS";

const withEmarsysPlugin: ConfigPlugin<EMSOptions> = (
  config,
  options
) => {
  config = withEmarsysAndroid(config, options);
  config = withEmarsysiOS(config, options);
  return config;
};

const pkg = require("../../package.json");

export default createRunOncePlugin(
  withEmarsysPlugin,
  pkg.name,
  pkg.version
);

export type EMSOptions = {
  applicationCode?: string;
  merchantId?: string;
  enableConsoleLogging?: boolean;
  androidSmallNotificationIconPath?: string;
  androidSharedPackageNames?: string[];
  androidSharedSecret?: string;
  iosSharedKeychainAccessGroup?: string;
};
