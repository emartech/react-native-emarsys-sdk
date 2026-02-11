const { withDangerousMod, withXcodeProject } = require('expo/config-plugins');
const fs = require('fs');
const path = require('path');

const TEST_TARGET_NAME = 'RNEmarsysSDKTest';

// Copy test files from ios/test into the iOS project during prebuild
const withTestFiles = (config) => {
  return withDangerousMod(config, [
    'ios',
    (config) => {
      const projectRoot = config.modRequest.projectRoot;
      const packageDir = `${projectRoot}/node_modules/react-native-emarsys-sdk`;
      const sourceTestsDir = path.join(packageDir, 'ios', 'test');
      const targetTestsDir = path.join(projectRoot, 'ios', TEST_TARGET_NAME);

      if (!fs.existsSync(sourceTestsDir)) {
        return config;
      }

      if (!fs.existsSync(targetTestsDir)) {
        fs.mkdirSync(targetTestsDir, { recursive: true });
      }

      copyRecursive(sourceTestsDir, targetTestsDir);

      const podfilePath = path.join(projectRoot, 'ios', 'Podfile');
      if (fs.existsSync(podfilePath)) {
        let podfileContent = fs.readFileSync(podfilePath, 'utf8');
        
        if (!podfileContent.includes(`target '${TEST_TARGET_NAME}'`)) {
          const mainTargetRegex = /target\s+'reactnativeemarsyssdkexample'\s+do([\s\S]*?)(\nend)/;
          const match = podfileContent.match(mainTargetRegex);
          
          if (match) {
            const testTarget = `\n\n  target '${TEST_TARGET_NAME}' do\n    inherit! :complete\n  end`;
            const replacement = `target 'reactnativeemarsyssdkexample' do${match[1]}${testTarget}${match[2]}`;
            podfileContent = podfileContent.replace(mainTargetRegex, replacement);
            fs.writeFileSync(podfilePath, podfileContent, 'utf8');
          }
        }
      }

      return config;
    },
  ]);
};

const withTestTarget = (config) => {
  return withXcodeProject(config, (config) => {
    if (config.modResults.pbxGroupByName(TEST_TARGET_NAME)) {
      return config;
    }

    const projectRoot = config.modRequest.projectRoot;
    const targetTestsDir = path.join(projectRoot, 'ios', TEST_TARGET_NAME);
    const testFiles = collectFiles(targetTestsDir);

    const objects = config.modResults.hash.project.objects;
    objects['PBXTargetDependency'] = objects['PBXTargetDependency'] || {};
    objects['PBXContainerItemProxy'] = objects['PBXContainerItemProxy'] || {};

    const mainTargetKey = config.modResults.getFirstTarget().uuid;
    const mainTarget = objects['PBXNativeTarget'][mainTargetKey];
    const originalDependencies = mainTarget.dependencies ? [...mainTarget.dependencies] : [];

    const target = config.modResults.addTarget(
      TEST_TARGET_NAME,
      'unit_test_bundle',
      TEST_TARGET_NAME,
      `${config.ios?.bundleIdentifier}.${TEST_TARGET_NAME}`,
    );

    // Restore original dependencies
    mainTarget.dependencies = originalDependencies;

    const filesByDir = {};
    for (const file of testFiles) {
      const dir = path.dirname(file);
      if (!filesByDir[dir]) {
        filesByDir[dir] = [];
      }
      filesByDir[dir].push(path.basename(file));
    }
    
    const rootFiles = filesByDir['.'] || [];
    const subdirs = Object.keys(filesByDir).filter(d => d !== '.');

    const pbxGroup = config.modResults.addPbxGroup(
      rootFiles,
      TEST_TARGET_NAME,
      TEST_TARGET_NAME,
    );

    const groups = config.modResults.hash.project.objects['PBXGroup'];
    for (const key of Object.keys(groups)) {
      if (typeof groups[key] === 'object' && groups[key].name === undefined && groups[key].path === undefined) {
        config.modResults.addToPbxGroup(pbxGroup.uuid, key);
      }
    }

    const createdGroups = {};
    for (const dir of subdirs) {
      const files = filesByDir[dir];
      const dirParts = dir.split(path.sep);
      const dirName = dirParts[dirParts.length - 1];
      
      const subGroup = config.modResults.addPbxGroup(
        files,
        dirName,
        dirName
      );
      
      createdGroups[dir] = subGroup.uuid;
      
      if (dirParts.length === 1) {
        config.modResults.addToPbxGroup(subGroup.uuid, pbxGroup.uuid);
      } else {
        const parentDir = dirParts.slice(0, -1).join(path.sep);
        const parentGroupId = createdGroups[parentDir];
        if (parentGroupId) {
          config.modResults.addToPbxGroup(subGroup.uuid, parentGroupId);
        }
      }
    }

    const sourceFiles = testFiles.filter(file => file.endsWith('.m'));
    if (sourceFiles.length > 0) {
      const sourceFileNames = sourceFiles.map(f => path.basename(f));
      config.modResults.addBuildPhase(
        sourceFileNames,
        'PBXSourcesBuildPhase',
        'Sources',
        target.uuid
      );
    }

    const configurations = config.modResults.hash.project.objects['XCBuildConfiguration'];
    let existingBuildSettings;
    for (const key of Object.keys(configurations)) {
      const buildSettings = configurations[key].buildSettings;
      if (buildSettings && buildSettings.PRODUCT_NAME && buildSettings.PRODUCT_NAME !== `"${TEST_TARGET_NAME}"`) {
        existingBuildSettings = buildSettings;
        break;
      }
    }
    if (existingBuildSettings) {
      const settingsToCopy = [
        'CURRENT_PROJECT_VERSION', 'MARKETING_VERSION',
        'SWIFT_VERSION', 'TARGETED_DEVICE_FAMILY',
        'DEVELOPMENT_TEAM', 'CODE_SIGN_STYLE',
      ];
      for (const key of Object.keys(configurations)) {
        const buildSettings = configurations[key].buildSettings;
        if (buildSettings && buildSettings.PRODUCT_NAME === `"${TEST_TARGET_NAME}"`) {
          for (const setting of settingsToCopy) {
            if (existingBuildSettings[setting]) {
              buildSettings[setting] = existingBuildSettings[setting];
            }
          }
          buildSettings['INFOPLIST_FILE'] = `${TEST_TARGET_NAME}/Test-Info.plist`;
          buildSettings['IPHONEOS_DEPLOYMENT_TARGET'] = '15.1';
          buildSettings['TEST_HOST'] = '"$(BUILT_PRODUCTS_DIR)/reactnativeemarsyssdkexample.app/$(BUNDLE_EXECUTABLE_FOLDER_PATH)/reactnativeemarsyssdkexample"';
          buildSettings['BUNDLE_LOADER'] = '"$(TEST_HOST)"';
        }
      }
    }

    return config;
  });
}

const copyRecursive = (src, dest) => {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      if (!fs.existsSync(destPath)) fs.mkdirSync(destPath, { recursive: true });
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

const collectFiles = (dir, baseDir = dir) => {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...collectFiles(fullPath, baseDir));
    else results.push(path.relative(baseDir, fullPath));
  }
  return results;
};


module.exports = (config) => {
  config = withTestFiles(config);
  config = withTestTarget(config);
  return config;
};
