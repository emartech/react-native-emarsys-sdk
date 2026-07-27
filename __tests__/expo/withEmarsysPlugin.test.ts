import withEmarsysPlugin, { type EMSOptions } from '../../src/expo/withEmarsysPlugin';

describe('withEmarsysPlugin', () => {
  const mockConfig = {
    name: 'test-app',
    slug: 'test-app',
  };

  const mockOptions: EMSOptions = {
    applicationCode: 'TEST_APP_CODE',
    merchantId: 'TEST_MERCHANT_ID',
    enableConsoleLogging: true,
    androidSmallNotificationIconPath: '',
    androidSharedPackageNames: [],
    androidSharedSecret: '',
    iosSharedKeychainAccessGroup: ''
  };

  it('should be a function', () => {
    expect(typeof withEmarsysPlugin).toBe('function');
  });

  it('should return a config object when called', () => {
    const result = withEmarsysPlugin(mockConfig, mockOptions);
    
    expect(result).toBeDefined();
    expect(typeof result).toBe('object');
    expect(result.name).toBe('test-app');
    expect(result.slug).toBe('test-app');
  });

  it('should handle valid options without throwing', () => {
    expect(() => {
      withEmarsysPlugin(mockConfig, mockOptions);
    }).not.toThrow();
  });

  it('should handle empty options without throwing', () => {
    const emptyOptions = {} as EMSOptions;
    
    expect(() => {
      withEmarsysPlugin(mockConfig, emptyOptions);
    }).not.toThrow();
  });

  it('should accept applicationCode as string', () => {
    expect(typeof mockOptions.applicationCode).toBe('string');
    expect(() => {
      withEmarsysPlugin(mockConfig, mockOptions);
    }).not.toThrow();
  });

  it('should accept merchantId as string', () => {
    expect(typeof mockOptions.merchantId).toBe('string');
    expect(() => {
      withEmarsysPlugin(mockConfig, mockOptions);
    }).not.toThrow();
  });
});
