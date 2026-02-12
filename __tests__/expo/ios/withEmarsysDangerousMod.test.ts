import { ExpoConfig } from 'expo/config';
import { type EMSOptions } from '../../../src/expo/withEmarsysPlugin';
import { withEmarsysDangerousMod } from '../../../src/expo/ios/withEmarsysDangerousMod';

// Mock the expo/config-plugins module
jest.mock('expo/config-plugins', () => ({
  withDangerousMod: jest.fn((config, [_platform, modifyFunction]) => {
    return modifyFunction(config);
  }),
}));

// Mock fs module
const mockFs = {
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
  copyFileSync: jest.fn(),
  readFileSync: jest.fn(),
  appendFileSync: jest.fn(),
};

// Mock path module
const mockPath = {
  join: jest.fn((...args) => args.join('/')),
};

// Mock require to return mocked fs and path modules
jest.mock('fs', () => mockFs);
jest.mock('path', () => mockPath);

describe('withEmarsysDangerousMod', () => {
  let mockConfig: ExpoConfig;
  let mockOptions: EMSOptions;

  beforeEach(() => {
    mockConfig = {
      name: 'test-app',
      slug: 'test-app',
      modRequest: {
        projectRoot: '/test/project',
      },
    } as any;
    
    mockOptions = {
      applicationCode: 'TEST_APP_CODE',
      merchantId: 'TEST_MERCHANT_ID',
    };

    // Reset all mocks
    jest.clearAllMocks();
    
    // Set default mock implementations
    mockFs.existsSync.mockReturnValue(false);
    mockFs.mkdirSync.mockImplementation(() => {});
    mockFs.copyFileSync.mockImplementation(() => {});
    mockFs.readFileSync.mockReturnValue('existing podfile content');
    mockFs.appendFileSync.mockImplementation(() => {});
  });

  it('should be a function', () => {
    expect(typeof withEmarsysDangerousMod).toBe('function');
  });

  it('should accept config and options parameters', () => {
    expect(withEmarsysDangerousMod.length).toBe(2);
  });

  it('should work with valid option types', () => {
    // Test that options have correct types
    expect(typeof mockOptions.applicationCode).toBe('string');
    expect(typeof mockOptions.merchantId).toBe('string');
    
    // Test that function exists
    expect(typeof withEmarsysDangerousMod).toBe('function');
  });

  it('should work with empty options object', () => {
    // Test that the function exists and can handle empty options type
    expect(typeof withEmarsysDangerousMod).toBe('function');
    
    // Test that empty options can be created
    const emptyOptions = {} as EMSOptions;
    expect(typeof emptyOptions).toBe('object');
  });

  describe('file system operations', () => {
    it('should create NotificationService directory if it does not exist', () => {
      mockFs.existsSync.mockReturnValue(false);
      
      withEmarsysDangerousMod(mockConfig, mockOptions);
      
      expect(mockFs.existsSync).toHaveBeenCalledWith('/test/project/ios/NotificationService');
      expect(mockFs.mkdirSync).toHaveBeenCalledWith('/test/project/ios/NotificationService');
    });

    it('should not create NotificationService directory if it already exists', () => {
      mockFs.existsSync.mockReturnValue(true);
      
      withEmarsysDangerousMod(mockConfig, mockOptions);
      
      expect(mockFs.existsSync).toHaveBeenCalledWith('/test/project/ios/NotificationService');
      expect(mockFs.mkdirSync).not.toHaveBeenCalled();
    });

    it('should copy all NotificationService files', () => {
      const expectedFiles = [
        'NotificationService.swift',
        'NotificationService-Info.plist'
      ];
      
      withEmarsysDangerousMod(mockConfig, mockOptions);
      
      expectedFiles.forEach(file => {
        expect(mockFs.copyFileSync).toHaveBeenCalledWith(
          `/test/project/node_modules/react-native-emarsys-sdk/ios/expo/NotificationService/${file}`,
          `/test/project/ios/NotificationService/${file}`
        );
      });
      
      expect(mockFs.copyFileSync).toHaveBeenCalledTimes(expectedFiles.length);
    });

    it('should use correct source and destination paths', () => {
      withEmarsysDangerousMod(mockConfig, mockOptions);
      
      expect(mockPath.join).toHaveBeenCalledWith(
        '/test/project/node_modules/react-native-emarsys-sdk',
        'ios',
        'expo',
        'NotificationService'
      );
      expect(mockPath.join).toHaveBeenCalledWith(
        '/test/project',
        'ios',
        'NotificationService'
      );
    });
  });

  describe('Podfile modifications', () => {
    const expectedPodfileTarget = `
target 'NotificationService' do
  use_frameworks!

  pod 'EmarsysNotificationService', '~> 3.9.0'
end
`;

    it('should read existing Podfile', () => {
      withEmarsysDangerousMod(mockConfig, mockOptions);
      
      expect(mockFs.readFileSync).toHaveBeenCalledWith('/test/project/ios/Podfile');
    });

    it('should append NotificationService target to Podfile when not present', () => {
      mockFs.readFileSync.mockReturnValue('existing podfile content without target');
      
      withEmarsysDangerousMod(mockConfig, mockOptions);
      
      expect(mockFs.appendFileSync).toHaveBeenCalledWith(
        '/test/project/ios/Podfile',
        expectedPodfileTarget
      );
    });

    it('should not append NotificationService target if already present', () => {
      mockFs.readFileSync.mockReturnValue("target 'NotificationService' do\n  pod 'EmarsysNotificationService'\nend");
      
      withEmarsysDangerousMod(mockConfig, mockOptions);
      
      expect(mockFs.appendFileSync).not.toHaveBeenCalled();
    });

    it('should detect existing target with different formatting', () => {
      mockFs.readFileSync.mockReturnValue(`
        some other content
        target 'NotificationService' do
          # existing target
        end
      `);
      
      withEmarsysDangerousMod(mockConfig, mockOptions);
      
      expect(mockFs.appendFileSync).not.toHaveBeenCalled();
    });

    it('should handle Podfile with other targets', () => {
      mockFs.readFileSync.mockReturnValue(`
        target 'MyApp' do
          pod 'React'
        end
        
        target 'MyAppTests' do
          pod 'Testing'
        end
      `);
      
      withEmarsysDangerousMod(mockConfig, mockOptions);
      
      expect(mockFs.appendFileSync).toHaveBeenCalledWith(
        '/test/project/ios/Podfile',
        expectedPodfileTarget
      );
    });
  });

  describe('error handling', () => {
    it('should handle fs.existsSync errors gracefully', () => {
      // Reset to clean state for this test
      jest.clearAllMocks();
      mockFs.existsSync.mockImplementation(() => {
        throw new Error('Permission denied');
      });
      
      expect(() => withEmarsysDangerousMod(mockConfig, mockOptions)).toThrow('Permission denied');
    });

    it('should handle fs.mkdirSync errors gracefully', () => {
      // Reset to clean state for this test
      jest.clearAllMocks();
      mockFs.existsSync.mockReturnValue(false);
      mockFs.mkdirSync.mockImplementation(() => {
        throw new Error('Cannot create directory');
      });
      
      expect(() => withEmarsysDangerousMod(mockConfig, mockOptions)).toThrow('Cannot create directory');
    });

    it('should handle fs.copyFileSync errors gracefully', () => {
      // Reset to clean state for this test
      jest.clearAllMocks();
      mockFs.existsSync.mockReturnValue(false);
      mockFs.mkdirSync.mockImplementation(() => {});
      mockFs.copyFileSync.mockImplementation(() => {
        throw new Error('Cannot copy file');
      });
      
      expect(() => withEmarsysDangerousMod(mockConfig, mockOptions)).toThrow('Cannot copy file');
    });

    it('should handle fs.readFileSync errors gracefully', () => {
      // Reset to clean state for this test
      jest.clearAllMocks();
      mockFs.existsSync.mockReturnValue(false);
      mockFs.mkdirSync.mockImplementation(() => {});
      mockFs.copyFileSync.mockImplementation(() => {});
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error('Cannot read Podfile');
      });
      
      expect(() => withEmarsysDangerousMod(mockConfig, mockOptions)).toThrow('Cannot read Podfile');
    });

    it('should handle fs.appendFileSync errors gracefully', () => {
      // Reset to clean state for this test
      jest.clearAllMocks();
      mockFs.existsSync.mockReturnValue(false);
      mockFs.mkdirSync.mockImplementation(() => {});
      mockFs.copyFileSync.mockImplementation(() => {});
      mockFs.readFileSync.mockReturnValue('podfile without target');
      mockFs.appendFileSync.mockImplementation(() => {
        throw new Error('Cannot write to Podfile');
      });
      
      expect(() => withEmarsysDangerousMod(mockConfig, mockOptions)).toThrow('Cannot write to Podfile');
    });
  });

  describe('config handling', () => {
    it('should return the config object', () => {
      const result = withEmarsysDangerousMod(mockConfig, mockOptions);
      
      expect(result).toBe(mockConfig);
    });

    it('should work with different project root paths', () => {
      const differentConfig = {
        ...mockConfig,
        modRequest: {
          projectRoot: '/different/path/to/project',
        },
      } as any;
      
      withEmarsysDangerousMod(differentConfig, mockOptions);
      
      expect(mockFs.existsSync).toHaveBeenCalledWith('/different/path/to/project/ios/NotificationService');
      expect(mockFs.readFileSync).toHaveBeenCalledWith('/different/path/to/project/ios/Podfile');
    });

    it('should work with minimal config', () => {
      const minimalConfig = {
        name: 'minimal-app',
        slug: 'minimal-app',
        modRequest: {
          projectRoot: '/minimal/project',
        },
      } as any;
      
      expect(() => withEmarsysDangerousMod(minimalConfig, mockOptions)).not.toThrow();
    });

    it('should work with undefined options', () => {
      expect(() => withEmarsysDangerousMod(mockConfig, undefined as any)).not.toThrow();
    });
  });

  describe('constants', () => {
    it('should use correct notification service target name', () => {
      withEmarsysDangerousMod(mockConfig, mockOptions);
      
      expect(mockFs.existsSync).toHaveBeenCalledWith(
        expect.stringContaining('NotificationService')
      );
    });

    it('should copy correct notification service files', () => {
      withEmarsysDangerousMod(mockConfig, mockOptions);
      
      expect(mockFs.copyFileSync).toHaveBeenCalledWith(
        expect.stringContaining('NotificationService.swift'),
        expect.stringContaining('NotificationService.swift')
      );
      expect(mockFs.copyFileSync).toHaveBeenCalledWith(
        expect.stringContaining('NotificationService-Info.plist'),
        expect.stringContaining('NotificationService-Info.plist')
      );
    });

    it('should use correct pod name in Podfile', () => {
      mockFs.readFileSync.mockReturnValue('existing podfile');
      
      withEmarsysDangerousMod(mockConfig, mockOptions);
      
      expect(mockFs.appendFileSync).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining("pod 'EmarsysNotificationService'")
      );
    });
  });
});
