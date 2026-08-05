import { ConfigPlugin, withXcodeProject } from 'expo/config-plugins';
import { type EMSOptions } from '../withEmarsysPlugin';

const NOTIFICATION_SERVICE_TARGET = 'NotificationService';
const NOTIFICATION_SERVICE_FILES = [
  'NotificationService.swift',
  'NotificationService-Info.plist'
];

export const withEmarsysXcodeProject: ConfigPlugin<EMSOptions> = (config, _options) =>
  withXcodeProject(config, (config) => {
    // Notification Service Extension
    if (config.modResults.pbxGroupByName(NOTIFICATION_SERVICE_TARGET)) {
      return config;
    }

    // Initialize project objects
    const objects = config.modResults.hash.project.objects;
    objects['PBXTargetDependency'] = objects['PBXTargetDependency'] || {};
    objects['PBXContainerItemProxy'] = objects['PBXContainerItemProxy'] || {};

    // Add target
    const target = config.modResults.addTarget(
      NOTIFICATION_SERVICE_TARGET,
      'app_extension',
      NOTIFICATION_SERVICE_TARGET,
      `${config.ios?.bundleIdentifier}.${NOTIFICATION_SERVICE_TARGET}`,
    );

    // Add PBX group
    const pbxGroup = config.modResults.addPbxGroup(
      NOTIFICATION_SERVICE_FILES,
      NOTIFICATION_SERVICE_TARGET,
      NOTIFICATION_SERVICE_TARGET,
    );
    const groups = config.modResults.hash.project.objects['PBXGroup'];
    for (const key of Object.keys(groups)) {
      if (typeof groups[key] === 'object' && groups[key].name === undefined && groups[key].path === undefined) {
        config.modResults.addToPbxGroup(pbxGroup.uuid, key);
      }
    };

    // Add build phase
    config.modResults.addBuildPhase(
      ['NotificationService.swift',],
      'PBXSourcesBuildPhase',
      'Sources',
      target.uuid
    );

    // Set build settings
    const configurations = config.modResults.hash.project.objects['XCBuildConfiguration'];
    let existingBuildSettings;
    for (const key of Object.keys(configurations)) {
      const buildSettings = configurations[key].buildSettings;
      if (buildSettings && buildSettings.PRODUCT_NAME && buildSettings.PRODUCT_NAME !== `"${NOTIFICATION_SERVICE_TARGET}"`) {
        existingBuildSettings = buildSettings;
        break;
      }
    }
    if (existingBuildSettings) {
      const settingsToCopy = [
        'CURRENT_PROJECT_VERSION', 'MARKETING_VERSION',
        'IPHONEOS_DEPLOYMENT_TARGET', 'SWIFT_VERSION', 'TARGETED_DEVICE_FAMILY',
        'DEVELOPMENT_TEAM', 'PROVISIONING_PROFILE_SPECIFIER',
        'CODE_SIGN_STYLE', 'CODE_SIGN_IDENTITY', 'OTHER_CODE_SIGN_FLAGS'
      ]
      for (const key of Object.keys(configurations)) {
        const buildSettings = configurations[key].buildSettings;
        if (buildSettings && buildSettings.PRODUCT_NAME === `"${NOTIFICATION_SERVICE_TARGET}"`) {
          for (const setting of settingsToCopy) {
            if (existingBuildSettings[setting]) { buildSettings[setting] = existingBuildSettings[setting] };
          }
        }
      }
    }

    return config;
  });
