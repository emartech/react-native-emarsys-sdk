import { ConfigPlugin } from 'expo/config-plugins';
import { type EMSOptions } from '../withEmarsysPlugin';
import { withEmarsysInfoPlist } from './withEmarsysInfoPlist';
import { withEmarsysDangerousMod } from './withEmarsysDangerousMod';
import { withEmarsysXcodeProject } from './withEmarsysXcodeProject';
import { withEmarsysEntitlements } from './withEmarsysEntitlements';

export const withEmarsysiOS: ConfigPlugin<EMSOptions> = (config, options) => {
  config = withEmarsysInfoPlist(config, options);
  config = withEmarsysDangerousMod(config, options);
  config = withEmarsysXcodeProject(config, options);
  config = withEmarsysEntitlements(config, options);
  return config;
};
