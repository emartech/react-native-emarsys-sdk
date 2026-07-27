import { ExpoConfig } from 'expo/config';
import { type EMSOptions } from '../../../src/expo/withEmarsysPlugin';
import { withEmarsysSmallNotificationIcon } from '../../../src/expo/android/withEmarsysSmallNotificationIcon';

// Mock the expo/config-plugins module
jest.mock('expo/config-plugins', () => ({
  withDangerousMod: jest.fn((config, modConfig) => {
    const [platform, modFunction] = modConfig;
    if (platform === 'android' && typeof modFunction === 'function') {
      return modFunction(config);
    }
    return config;
  }),
  withAndroidManifest: jest.fn((config, modifyFunction) => {
    // Create a proper config structure for the Android manifest modifier
    const manifestConfig = {
      ...config,
      modRequest: config.modRequest || { projectRoot: '/test/project' },
      // Preserve existing modResults if they exist, otherwise provide default
      modResults: config.modResults || {
        manifest: {
          application: [{}]
        }
      }
    };
    const result = modifyFunction(manifestConfig);
    // Ensure we return a config that preserves the original properties
    return { ...config, ...result };
  }),
}));

// Mock the helper function
jest.mock('../../../src/expo/android/withEmarsysAndroidHelpers', () => ({
  setMetaData: jest.fn(),
}));

// Mock file system operations
const mockFs = {
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
  copyFileSync: jest.fn(),
};

jest.mock('fs', () => mockFs);

// Mock console methods
const mockConsoleLog = jest.fn();
const mockConsoleWarn = jest.fn();
global.console = {
  ...global.console,
  log: mockConsoleLog,
  warn: mockConsoleWarn,
};

// Type for config with modRequest and manifest
type ConfigWithModRequest = ExpoConfig & {
  modRequest: {
    projectRoot: string;
  };
  modResults?: {
    manifest: {
      application: Array<{
        'meta-data'?: Array<{
          $: {
            'android:name': string;
            'android:value': string;
          };
        }>;
      }>;
    };
  };
};

describe('withEmarsysSmallNotificationIcon', () => {
  let mockConfig: ConfigWithModRequest;
  let mockOptions: EMSOptions;
  const { setMetaData } = require('../../../src/expo/android/withEmarsysAndroidHelpers');

  beforeEach(() => {
    mockConfig = {
      name: 'test-app',
      slug: 'test-app',
      modRequest: {
        projectRoot: '/test/project'
      },
      modResults: {
        manifest: {
          application: [{}]
        }
      }
    };
    mockOptions = {
      applicationCode: 'TEST_APP_CODE',
      androidSmallNotificationIconPath: './custom/assets/path/notification_icon.png'
    };
    jest.clearAllMocks();
    
    // Reset all mocks to default behavior
    mockFs.existsSync.mockReturnValue(true);
    mockFs.mkdirSync.mockImplementation(() => {});
    mockFs.copyFileSync.mockImplementation(() => {});
    setMetaData.mockImplementation(() => {});
  });

  it('should be a function', () => {
    expect(typeof withEmarsysSmallNotificationIcon).toBe('function');
  });

  it('should accept config and options parameters', () => {
    expect(withEmarsysSmallNotificationIcon.length).toBe(2);
  });

  describe('file operations', () => {
    it('should copy icon file when source file exists', async () => {
      mockFs.existsSync.mockReturnValue(true);

      const result = await withEmarsysSmallNotificationIcon(mockConfig, mockOptions);

      expect(mockFs.existsSync).toHaveBeenCalledWith('/test/project/custom/assets/path/notification_icon.png');
      expect(mockFs.mkdirSync).toHaveBeenCalledWith('/test/project/android/app/src/main/res/drawable', { recursive: true });
      expect(mockFs.copyFileSync).toHaveBeenCalledWith(
        '/test/project/custom/assets/path/notification_icon.png',
        '/test/project/android/app/src/main/res/drawable/notification_icon.png'
      );
      // Function should return some config object
      expect(result).toBeDefined();
    });

    it('should skip file operations and warn when source file does not exist', async () => {
      mockFs.existsSync.mockReturnValue(false);

      const result = await withEmarsysSmallNotificationIcon(mockConfig, mockOptions);

      expect(mockFs.existsSync).toHaveBeenCalledWith('/test/project/custom/assets/path/notification_icon.png');
      expect(mockFs.mkdirSync).not.toHaveBeenCalled();
      expect(mockFs.copyFileSync).not.toHaveBeenCalled();
      expect(mockConsoleWarn).toHaveBeenCalledWith('File /test/project/custom/assets/path/notification_icon.png does not exist. Skipping copy.');
      // Function should return some config object
      expect(result).toBeDefined();
    });

    it('should skip file operations when path is not available', async () => {
      const result = await withEmarsysSmallNotificationIcon(mockConfig, { applicationCode: 'TEST_APP_CODE' });

      expect(mockConsoleWarn).toHaveBeenCalledWith('androidNotificationIconPath not available. Skipping configuration.');
      expect(mockFs.existsSync).not.toHaveBeenCalled();
      expect(mockFs.mkdirSync).not.toHaveBeenCalled();
      expect(mockFs.copyFileSync).not.toHaveBeenCalled();
      // Function should return some config object
      expect(result).toBeDefined();
    });

    it('should create destination directory recursively', async () => {
      mockFs.existsSync.mockReturnValue(true);

      await withEmarsysSmallNotificationIcon(mockConfig, mockOptions);

      expect(mockFs.mkdirSync).toHaveBeenCalledWith('/test/project/android/app/src/main/res/drawable', { recursive: true });
    });
  });

  describe('android manifest modifications', () => {
    it('should add meta-data to android manifest when source file exists', async () => {
      mockFs.existsSync.mockReturnValue(true);

      const result = await withEmarsysSmallNotificationIcon(mockConfig, mockOptions);

      expect(setMetaData).toHaveBeenCalledWith(
        mockConfig.modResults?.manifest.application[0],
        'com.emarsys.mobileengage.small_notification_icon',
        { resource: '@drawable/notification_icon' }
      );
      // Function should return some config object
      expect(result).toBeDefined();
    });

    it('should skip manifest modification and warn when source file does not exist', async () => {
      mockFs.existsSync
        .mockReturnValueOnce(false) // for dangerous mod
        .mockReturnValueOnce(false); // for manifest mod

      const result = await withEmarsysSmallNotificationIcon(mockConfig, mockOptions);

      expect(setMetaData).not.toHaveBeenCalled();
      expect(mockConsoleWarn).toHaveBeenCalledWith('File /test/project/android/app/src/main/res/drawable/notification_icon.png does not exist. Skipping AndroidManifest update.');
      // Function should return some config object
      expect(result).toBeDefined();
    });

    it('should skip manifest modification when path is not available', async () => {
      const result = await withEmarsysSmallNotificationIcon(mockConfig, { applicationCode: 'TEST_APP_CODE' });

      expect(mockConsoleWarn).toHaveBeenCalledWith('androidNotificationIconPath not available. Skipping configuration.');
      expect(setMetaData).not.toHaveBeenCalled();
      // Function should return some config object
      expect(result).toBeDefined();
    });

    it('should handle empty application array in manifest', async () => {
      // Mock withAndroidManifest to use the actual empty array
      const { withAndroidManifest } = require('expo/config-plugins');
      withAndroidManifest.mockImplementationOnce((config: any, modifyFunction: any) => {
        const manifestConfig = {
          ...config,
          modRequest: { projectRoot: '/test/project' },
          modResults: {
            manifest: {
              application: [] // Empty array
            }
          }
        };
        const result = modifyFunction(manifestConfig);
        return { ...config, ...result };
      });

      const configWithEmptyApp = {
        ...mockConfig,
        modResults: {
          manifest: {
            application: []
          }
        }
      };

      mockFs.existsSync.mockReturnValue(true);

      const result = await withEmarsysSmallNotificationIcon(configWithEmptyApp, mockOptions);

      expect(setMetaData).not.toHaveBeenCalled();
      // Function should return some config object
      expect(result).toBeDefined();
    });

    it('should handle non-array application in manifest', async () => {
      // Mock withAndroidManifest to use a non-array application
      const { withAndroidManifest } = require('expo/config-plugins');
      withAndroidManifest.mockImplementationOnce((config: any, modifyFunction: any) => {
        const manifestConfig = {
          ...config,
          modRequest: { projectRoot: '/test/project' },
          modResults: {
            manifest: {
              application: {} as any // Non-array
            }
          }
        };
        const result = modifyFunction(manifestConfig);
        return { ...config, ...result };
      });

      const configWithNonArrayApp = {
        ...mockConfig,
        modResults: {
          manifest: {
            application: {} as any
          }
        }
      };

      mockFs.existsSync.mockReturnValue(true);

      const result = await withEmarsysSmallNotificationIcon(configWithNonArrayApp, mockOptions);

      expect(setMetaData).not.toHaveBeenCalled();
      // Function should return some config object
      expect(result).toBeDefined();
    });

    it('should handle missing modResults in config', async () => {
      const configWithoutModResults = {
        ...mockConfig,
        modResults: undefined
      };

      mockFs.existsSync.mockReturnValue(true);

      // This should not throw an error
      expect(() => withEmarsysSmallNotificationIcon(configWithoutModResults, mockOptions)).not.toThrow();
    });
  });

  describe('integration tests', () => {
    it('should perform both file operations and manifest modifications when source exists', async () => {
      mockFs.existsSync.mockReturnValue(true);

      const result = await withEmarsysSmallNotificationIcon(mockConfig, mockOptions);

      // Verify file operations
      expect(mockFs.copyFileSync).toHaveBeenCalled();
      
      // Verify manifest modifications
      expect(setMetaData).toHaveBeenCalledWith(
        mockConfig.modResults?.manifest.application[0],
        'com.emarsys.mobileengage.small_notification_icon',
        { resource: '@drawable/notification_icon' }
      );
      
      // Function should return some config object
      expect(result).toBeDefined();
    });

    it('should skip both operations when source file does not exist', async () => {
      mockFs.existsSync.mockReturnValue(false);

      const result = await withEmarsysSmallNotificationIcon(mockConfig, mockOptions);

      // Verify file operations were skipped
      expect(mockFs.copyFileSync).not.toHaveBeenCalled();
      expect(mockConsoleWarn).toHaveBeenCalledWith('File /test/project/custom/assets/path/notification_icon.png does not exist. Skipping copy.');
      
      // Verify manifest modifications were skipped
      expect(setMetaData).not.toHaveBeenCalled();
      expect(mockConsoleWarn).toHaveBeenCalledWith('File /test/project/android/app/src/main/res/drawable/notification_icon.png does not exist. Skipping AndroidManifest update.');
      
      // Function should return some config object
      expect(result).toBeDefined();
    });

    it('should skip both operations when path is not available', async () => {
      const result = await withEmarsysSmallNotificationIcon(mockConfig, { applicationCode: 'TEST_APP_CODE' });

      expect(mockConsoleWarn).toHaveBeenCalledWith('androidNotificationIconPath not available. Skipping configuration.');
      expect(mockFs.copyFileSync).not.toHaveBeenCalled();
      expect(setMetaData).not.toHaveBeenCalled();
      // Function should return some config object
      expect(result).toBeDefined();
    });
  });

  describe('path construction', () => {
    it('should construct correct source and destination paths', async () => {
      mockFs.existsSync.mockReturnValue(true);

      const path = require('path');
      const joinSpy = jest.spyOn(path, 'join');

      await withEmarsysSmallNotificationIcon(mockConfig, mockOptions);

      // Check source path construction
      expect(joinSpy).toHaveBeenCalledWith('/test/project', './custom/assets/path/notification_icon.png');

      // Check destination path construction
      expect(joinSpy).toHaveBeenCalledWith('/test/project', 'android', 'app', 'src', 'main', 'res', 'drawable', 'notification_icon.png');
      
      joinSpy.mockRestore();
    });

    it('should use correct drawable reference in meta-data', async () => {
      mockFs.existsSync.mockReturnValue(true);

      await withEmarsysSmallNotificationIcon(mockConfig, mockOptions);

      expect(setMetaData).toHaveBeenCalledWith(
        expect.any(Object),
        'com.emarsys.mobileengage.small_notification_icon',
        { resource: '@drawable/notification_icon' }
      );
    });
  });
});
