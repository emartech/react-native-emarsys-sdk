import { ExpoConfig } from 'expo/config';
import { type EMSOptions } from '../../../src/expo/withEmarsysPlugin';
import { withEmarsysGoogleServicesJson } from '../../../src/expo/android/withEmarsysGoogleServicesJson';

// Mock the expo/config-plugins module
jest.mock('expo/config-plugins', () => ({
  withDangerousMod: jest.fn((config, modConfig) => {
    // Execute the dangerous mod function for testing
    const [platform, modFunction] = modConfig;
    if (platform === 'android' && typeof modFunction === 'function') {
      return modFunction(config);
    }
    return config;
  }),
}));

// Mock file system operations
const mockFs = {
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
  copyFileSync: jest.fn(),
};

jest.mock('fs', () => mockFs);

// Mock console.log to verify logging
const mockConsoleLog = jest.fn();
global.console = {
  ...global.console,
  log: mockConsoleLog,
};

// Type for config with modRequest
type ConfigWithModRequest = ExpoConfig & {
  modRequest: {
    projectRoot: string;
  };
};

describe('withGoogleServicesJson', () => {
  let mockConfig: ConfigWithModRequest;
  let mockOptions: EMSOptions;

  beforeEach(() => {
    mockConfig = {
      name: 'test-app',
      slug: 'test-app',
      modRequest: {
        projectRoot: '/test/project'
      }
    };
    mockOptions = {
      applicationCode: 'TEST_APP_CODE',
      androidGoogleServicesJsonPath: './custom/assets/path/test-google-services.json'
    };
    jest.clearAllMocks();

    // Reset all mocks to default behavior
    mockFs.existsSync.mockReturnValue(true);
    mockFs.mkdirSync.mockImplementation(() => {});
    mockFs.copyFileSync.mockImplementation(() => {});
  });

  it('should be a function', () => {
    expect(typeof withEmarsysGoogleServicesJson).toBe('function');
  });

  it('should accept config and options parameters', () => {
    expect(withEmarsysGoogleServicesJson.length).toBe(2);
  });

  it('should copy google-services.json when source file exists', async () => {
    mockFs.existsSync.mockReturnValue(true);

    const result = await withEmarsysGoogleServicesJson(mockConfig, mockOptions);

    expect(mockFs.existsSync).toHaveBeenCalledWith('/test/project/custom/assets/path/test-google-services.json');
    expect(mockFs.mkdirSync).toHaveBeenCalledWith('/test/project/android/app', { recursive: true });
    expect(mockFs.copyFileSync).toHaveBeenCalledWith(
      '/test/project/custom/assets/path/test-google-services.json',
      '/test/project/android/app/google-services.json'
    );
    expect(result).toBe(mockConfig);
  });

  it('should copy google-services.json when source file exists in default path', async () => {
    mockFs.existsSync.mockReturnValue(true);

    const result = await withEmarsysGoogleServicesJson(mockConfig, { applicationCode: 'TEST_APP_CODE' });

    expect(mockFs.existsSync).toHaveBeenCalledWith('/test/project/assets/google-services.json');
    expect(mockFs.mkdirSync).toHaveBeenCalledWith('/test/project/android/app', { recursive: true });
    expect(mockFs.copyFileSync).toHaveBeenCalledWith(
      '/test/project/assets/google-services.json',
      '/test/project/android/app/google-services.json'
    );
    expect(result).toBe(mockConfig);
  });

  it('should throw error when google-services.json does not exist', async () => {
    mockFs.existsSync.mockReturnValue(false);

    await expect(async () => {
      await withEmarsysGoogleServicesJson(mockConfig, mockOptions);
    }).rejects.toThrow('File /test/project/custom/assets/path/test-google-services.json does not exist. Please review androidGoogleServicesJsonPath, or add file to default path ./assets/google-services.json');

    expect(mockFs.existsSync).toHaveBeenCalledWith('/test/project/custom/assets/path/test-google-services.json');
    expect(mockFs.mkdirSync).not.toHaveBeenCalled();
    expect(mockFs.copyFileSync).not.toHaveBeenCalled();
    expect(mockConsoleLog).not.toHaveBeenCalled();
  });

  it('should throw error when google-services.json does not exist in default path', async () => {
    mockFs.existsSync.mockReturnValue(false);

    await expect(async () => {
      await withEmarsysGoogleServicesJson(mockConfig, { applicationCode: 'TEST_APP_CODE' });
    }).rejects.toThrow('File /test/project/assets/google-services.json does not exist. Please review androidGoogleServicesJsonPath, or add file to default path ./assets/google-services.json');

    expect(mockFs.existsSync).toHaveBeenCalledWith('/test/project/assets/google-services.json');
    expect(mockFs.mkdirSync).not.toHaveBeenCalled();
    expect(mockFs.copyFileSync).not.toHaveBeenCalled();
    expect(mockConsoleLog).not.toHaveBeenCalled();
  });

  it('should create destination directory recursively', async () => {
    mockFs.existsSync.mockReturnValue(true);

    await withEmarsysGoogleServicesJson(mockConfig, mockOptions);

    expect(mockFs.mkdirSync).toHaveBeenCalledWith('/test/project/android/app', { recursive: true });
  });

  it('should handle different project root paths', async () => {
    const configWithDifferentRoot: ConfigWithModRequest = {
      ...mockConfig,
      modRequest: {
        projectRoot: '/different/project/path'
      }
    };

    mockFs.existsSync.mockReturnValue(true);

    await withEmarsysGoogleServicesJson(configWithDifferentRoot, mockOptions);

    expect(mockFs.copyFileSync).toHaveBeenCalledWith(
      '/different/project/path/custom/assets/path/test-google-services.json',
      '/different/project/path/android/app/google-services.json'
    );
  });

  it('should use correct file paths', async () => {
    mockFs.existsSync.mockReturnValue(true);

    const path = require('path');
    const joinSpy = jest.spyOn(path, 'join');

    await withEmarsysGoogleServicesJson(mockConfig, mockOptions);

    expect(joinSpy).toHaveBeenCalledWith('/test/project', './custom/assets/path/test-google-services.json');
    expect(joinSpy).toHaveBeenCalledWith('/test/project', 'android', 'app', 'google-services.json');

    joinSpy.mockRestore();
  });

  it('should return the same config object', async () => {
    mockFs.existsSync.mockReturnValue(true);

    const result = await withEmarsysGoogleServicesJson(mockConfig, mockOptions);

    expect(result).toBe(mockConfig);
    expect(result.name).toBe('test-app');
    expect(result.slug).toBe('test-app');
  });

  it('should handle missing modRequest gracefully', async () => {
    const configWithoutModRequest = {
      name: 'test-app',
      slug: 'test-app'
    };

    // This should fail when trying to access config.modRequest.projectRoot
    await expect(async () => {
      await withEmarsysGoogleServicesJson(configWithoutModRequest, mockOptions);
    }).rejects.toThrow('Cannot read properties of undefined (reading \'projectRoot\')');
  });

  describe('Error scenarios', () => {
    it('should provide clear error message with file path', async () => {
      mockFs.existsSync.mockReturnValue(false);

      const customConfig: ConfigWithModRequest = {
        ...mockConfig,
        modRequest: {
          projectRoot: '/custom/path'
        }
      };

      await expect(async () => {
        await withEmarsysGoogleServicesJson(customConfig, mockOptions);
      }).rejects.toThrow('File /custom/path/custom/assets/path/test-google-services.json does not exist. Please review androidGoogleServicesJsonPath, or add file to default path ./assets/google-services.json');
    });

    it('should handle file system errors during copy', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.copyFileSync.mockImplementation(() => {
        throw new Error('Permission denied');
      });

      await expect(async () => {
        await withEmarsysGoogleServicesJson(mockConfig, mockOptions);
      }).rejects.toThrow('Permission denied');
    });

    it('should handle file system errors during directory creation', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.mkdirSync.mockImplementation(() => {
        throw new Error('Cannot create directory');
      });

      await expect(async () => {
        await withEmarsysGoogleServicesJson(mockConfig, mockOptions);
      }).rejects.toThrow('Cannot create directory');
    });
  });

  describe('Integration with withDangerousMod', () => {
    it('should call withDangerousMod with android platform', () => {
      const { withDangerousMod } = require('expo/config-plugins');

      withEmarsysGoogleServicesJson(mockConfig, mockOptions);

      expect(withDangerousMod).toHaveBeenCalledWith(mockConfig, ['android', expect.any(Function)]);
    });

    it('should be a ConfigPlugin', () => {
      // Test that it's a proper ConfigPlugin by checking its signature
      expect(typeof withEmarsysGoogleServicesJson).toBe('function');
      expect(withEmarsysGoogleServicesJson.length).toBe(2);
    });
  });
});
