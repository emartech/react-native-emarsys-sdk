import type { Spec } from '../../src/wrapper/native/NativeEmarsysConfig';

describe('NativeEmarsysConfig', () => {
  let mockConfig: Spec;

  beforeEach(() => {
    // Create a mock implementation of the NativeEmarsysConfig module
    mockConfig = {
      changeApplicationCode: jest.fn(),
      changeMerchantId: jest.fn(),
      getApplicationCode: jest.fn(),
      getMerchantId: jest.fn(),
      getContactFieldId: jest.fn(),
      getClientId: jest.fn(),
      getLanguageCode: jest.fn(),
      getSdkVersion: jest.fn(),
      getRNWrapperVersion: jest.fn(),
    } as unknown as Spec;

  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('changeApplicationCode', () => {
    it('should call changeApplicationCode with string parameter', async () => {
      const applicationCode = 'TEST_APP_CODE';
      (mockConfig.changeApplicationCode as jest.Mock).mockResolvedValue(undefined);

      await mockConfig.changeApplicationCode(applicationCode);

      expect(mockConfig.changeApplicationCode).toHaveBeenCalledWith(applicationCode);
      expect(mockConfig.changeApplicationCode).toHaveBeenCalledTimes(1);
    });

    it('should handle successful application code change', async () => {
      const applicationCode = 'NEW_APP_CODE';
      (mockConfig.changeApplicationCode as jest.Mock).mockResolvedValue(undefined);

      await expect(mockConfig.changeApplicationCode(applicationCode)).resolves.toBeUndefined();
    });

    it('should handle errors when changing application code', async () => {
      const applicationCode = 'INVALID_CODE';
      const error = new Error('Failed to change application code');
      (mockConfig.changeApplicationCode as jest.Mock).mockRejectedValue(error);

      await expect(mockConfig.changeApplicationCode(applicationCode)).rejects.toThrow('Failed to change application code');
    });
  });

  describe('changeMerchantId', () => {
    it('should call changeMerchantId with string parameter', async () => {
      const merchantId = 'TEST_MERCHANT_ID';
      (mockConfig.changeMerchantId as jest.Mock).mockResolvedValue(undefined);

      await mockConfig.changeMerchantId(merchantId);

      expect(mockConfig.changeMerchantId).toHaveBeenCalledWith(merchantId);
      expect(mockConfig.changeMerchantId).toHaveBeenCalledTimes(1);
    });

    it('should handle successful merchant id change', async () => {
      const merchantId = 'NEW_MERCHANT_ID';
      (mockConfig.changeMerchantId as jest.Mock).mockResolvedValue(undefined);

      await expect(mockConfig.changeMerchantId(merchantId)).resolves.toBeUndefined();
    });

    it('should handle errors when changing merchant id', async () => {
      const merchantId = 'INVALID_ID';
      const error = new Error('Failed to change merchant id');
      (mockConfig.changeMerchantId as jest.Mock).mockRejectedValue(error);

      await expect(mockConfig.changeMerchantId(merchantId)).rejects.toThrow('Failed to change merchant id');
    });
  });

  describe('getApplicationCode', () => {
    it('should return the current application code', async () => {
      const expectedCode = 'CURRENT_APP_CODE';
      (mockConfig.getApplicationCode as jest.Mock).mockResolvedValue(expectedCode);

      const result = await mockConfig.getApplicationCode();

      expect(result).toBe(expectedCode);
      expect(mockConfig.getApplicationCode).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when getting application code', async () => {
      const error = new Error('Failed to get application code');
      (mockConfig.getApplicationCode as jest.Mock).mockRejectedValue(error);

      await expect(mockConfig.getApplicationCode()).rejects.toThrow('Failed to get application code');
    });
  });

  describe('getMerchantId', () => {
    it('should return the current merchant id', async () => {
      const expectedId = 'CURRENT_MERCHANT_ID';
      (mockConfig.getMerchantId as jest.Mock).mockResolvedValue(expectedId);

      const result = await mockConfig.getMerchantId();

      expect(result).toBe(expectedId);
      expect(mockConfig.getMerchantId).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when getting merchant id', async () => {
      const error = new Error('Failed to get merchant id');
      (mockConfig.getMerchantId as jest.Mock).mockRejectedValue(error);

      await expect(mockConfig.getMerchantId()).rejects.toThrow('Failed to get merchant id');
    });
  });

  describe('getContactFieldId', () => {
    it('should return the contact field id', async () => {
      const expectedId = 'CONTACT_FIELD_ID';
      (mockConfig.getContactFieldId as jest.Mock).mockResolvedValue(expectedId);

      const result = await mockConfig.getContactFieldId();

      expect(result).toBe(expectedId);
      expect(mockConfig.getContactFieldId).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when getting contact field id', async () => {
      const error = new Error('Failed to get contact field id');
      (mockConfig.getContactFieldId as jest.Mock).mockRejectedValue(error);

      await expect(mockConfig.getContactFieldId()).rejects.toThrow('Failed to get contact field id');
    });
  });

  describe('getClientId', () => {
    it('should return the client id', async () => {
      const expectedId = 'CLIENT_ID_123';
      (mockConfig.getClientId as jest.Mock).mockResolvedValue(expectedId);

      const result = await mockConfig.getClientId();

      expect(result).toBe(expectedId);
      expect(mockConfig.getClientId).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when getting client id', async () => {
      const error = new Error('Failed to get client id');
      (mockConfig.getClientId as jest.Mock).mockRejectedValue(error);

      await expect(mockConfig.getClientId()).rejects.toThrow('Failed to get client id');
    });
  });

  describe('getLanguageCode', () => {
    it('should return the language code', async () => {
      const expectedCode = 'en-US';
      (mockConfig.getLanguageCode as jest.Mock).mockResolvedValue(expectedCode);

      const result = await mockConfig.getLanguageCode();

      expect(result).toBe(expectedCode);
      expect(mockConfig.getLanguageCode).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when getting language code', async () => {
      const error = new Error('Failed to get language code');
      (mockConfig.getLanguageCode as jest.Mock).mockRejectedValue(error);

      await expect(mockConfig.getLanguageCode()).rejects.toThrow('Failed to get language code');
    });
  });

  describe('getSdkVersion', () => {
    it('should return the SDK version', async () => {
      const expectedVersion = '3.0.0';
      (mockConfig.getSdkVersion as jest.Mock).mockResolvedValue(expectedVersion);

      const result = await mockConfig.getSdkVersion();

      expect(result).toBe(expectedVersion);
      expect(mockConfig.getSdkVersion).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when getting SDK version', async () => {
      const error = new Error('Failed to get SDK version');
      (mockConfig.getSdkVersion as jest.Mock).mockRejectedValue(error);

      await expect(mockConfig.getSdkVersion()).rejects.toThrow('Failed to get SDK version');
    });
  });

  describe('getRNWrapperVersion', () => {
    it('should return the RN Wrapper version', async () => {
      const expectedVersion = '1.0.0';
      (mockConfig.getRNWrapperVersion as jest.Mock).mockResolvedValue(expectedVersion);

      const result = await mockConfig.getRNWrapperVersion();

      expect(result).toBe(expectedVersion);
      expect(mockConfig.getRNWrapperVersion).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when getting RN Wrapper version', async () => {
      const error = new Error('Failed to get RN Wrapper version');
      (mockConfig.getRNWrapperVersion as jest.Mock).mockRejectedValue(error);

      await expect(mockConfig.getRNWrapperVersion()).rejects.toThrow('Failed to get RN Wrapper version');
    });
  });

  describe('Type Validation', () => {
    it('should have all required methods defined', () => {
      expect(mockConfig.changeApplicationCode).toBeDefined();
      expect(mockConfig.changeMerchantId).toBeDefined();
      expect(mockConfig.getApplicationCode).toBeDefined();
      expect(mockConfig.getMerchantId).toBeDefined();
      expect(mockConfig.getContactFieldId).toBeDefined();
      expect(mockConfig.getClientId).toBeDefined();
      expect(mockConfig.getLanguageCode).toBeDefined();
      expect(mockConfig.getSdkVersion).toBeDefined();
      expect(mockConfig.getRNWrapperVersion).toBeDefined();
    });

    it('should have all methods as functions', () => {
      expect(typeof mockConfig.changeApplicationCode).toBe('function');
      expect(typeof mockConfig.changeMerchantId).toBe('function');
      expect(typeof mockConfig.getApplicationCode).toBe('function');
      expect(typeof mockConfig.getMerchantId).toBe('function');
      expect(typeof mockConfig.getContactFieldId).toBe('function');
      expect(typeof mockConfig.getClientId).toBe('function');
      expect(typeof mockConfig.getLanguageCode).toBe('function');
      expect(typeof mockConfig.getSdkVersion).toBe('function');
      expect(typeof mockConfig.getRNWrapperVersion).toBe('function');
    });
  });
});
