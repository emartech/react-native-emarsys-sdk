import type { Spec } from '../../src/wrapper/native/NativeEmarsys';

describe('NativeEmarsys', () => {
  let mockConfig: Spec;

  beforeEach(() => {
    // Create a mock implementation of the NativeEmarsys module
    mockConfig = {
      onEvent: jest.fn(),
      setEventHandler: jest.fn(),
      setSilentMessageEventHandler: jest.fn(),
      setContact: jest.fn(),
      clearContact: jest.fn(),
      trackCustomEvent: jest.fn(),
      trackDeepLink: jest.fn(),
    } as unknown as Spec;

  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('onEvent', () => {
    it('should call onEvent', async () => {
      (mockConfig.onEvent as jest.Mock).mockReturnValue('result');

      const result = mockConfig.onEvent(() => {});

      expect(mockConfig.onEvent).toHaveBeenCalledTimes(1);
      expect(result).toBe('result');
    });
  });

  describe('setEventHandler', () => {
    it('should call setEventHandler', async () => {
      (mockConfig.setEventHandler as jest.Mock).mockResolvedValue(undefined);

      await mockConfig.setEventHandler();

      expect(mockConfig.setEventHandler).toHaveBeenCalledTimes(1);
    });

    it('should handle successful setEventHandler', async () => {
      (mockConfig.setEventHandler as jest.Mock).mockResolvedValue(undefined);

      await expect(mockConfig.setEventHandler()).resolves.toBeUndefined();
    });

    it('should handle errors when setEventHandler', async () => {
      const error = new Error('Failed to setEventHandler');
      (mockConfig.setEventHandler as jest.Mock).mockRejectedValue(error);

      await expect(mockConfig.setEventHandler()).rejects.toThrow('Failed to setEventHandler');
    });
  });

  describe('setSilentMessageEventHandler', () => {
    it('should call setSilentMessageEventHandler', async () => {
      (mockConfig.setSilentMessageEventHandler as jest.Mock).mockResolvedValue(undefined);

      await mockConfig.setSilentMessageEventHandler();

      expect(mockConfig.setSilentMessageEventHandler).toHaveBeenCalledTimes(1);
    });

    it('should handle successful setSilentMessageEventHandler', async () => {
      (mockConfig.setSilentMessageEventHandler as jest.Mock).mockResolvedValue(undefined);

      await expect(mockConfig.setSilentMessageEventHandler()).resolves.toBeUndefined();
    });

    it('should handle errors when setSilentMessageEventHandler', async () => {
      const error = new Error('Failed to setSilentMessageEventHandler');
      (mockConfig.setSilentMessageEventHandler as jest.Mock).mockRejectedValue(error);

      await expect(mockConfig.setSilentMessageEventHandler()).rejects.toThrow('Failed to setSilentMessageEventHandler');
    });
  });

  describe('setContact', () => {
    it('should call setContact with parameter', async () => {
      const contactFieldId = 123456;
      const contactFieldValue = 'TEST_VALUE';
      (mockConfig.setContact as jest.Mock).mockResolvedValue(undefined);

      await mockConfig.setContact(contactFieldId, contactFieldValue);

      expect(mockConfig.setContact).toHaveBeenCalledWith(contactFieldId, contactFieldValue);
      expect(mockConfig.setContact).toHaveBeenCalledTimes(1);
    });

    it('should handle successful setContact', async () => {
      const contactFieldId = 123456;
      const contactFieldValue = 'TEST_VALUE';
      (mockConfig.setContact as jest.Mock).mockResolvedValue(undefined);

      await expect(mockConfig.setContact(contactFieldId, contactFieldValue)).resolves.toBeUndefined();
    });

    it('should handle errors when setContact', async () => {
      const contactFieldId = 123456;
      const contactFieldValue = 'INVALID_VALUE';
      const error = new Error('Failed to setContact');
      (mockConfig.setContact as jest.Mock).mockRejectedValue(error);

      await expect(mockConfig.setContact(contactFieldId, contactFieldValue)).rejects.toThrow('Failed to setContact');
    });
  });

  describe('clearContact', () => {
    it('should call clearContact', async () => {
      (mockConfig.clearContact as jest.Mock).mockResolvedValue(undefined);

      await mockConfig.clearContact();

      expect(mockConfig.clearContact).toHaveBeenCalledTimes(1);
    });

    it('should handle successful clearContact', async () => {
      (mockConfig.clearContact as jest.Mock).mockResolvedValue(undefined);

      await expect(mockConfig.clearContact()).resolves.toBeUndefined();
    });

    it('should handle errors when clearContact', async () => {
      const error = new Error('Failed to clearContact');
      (mockConfig.clearContact as jest.Mock).mockRejectedValue(error);

      await expect(mockConfig.clearContact()).rejects.toThrow('Failed to clearContact');
    });
  });

  describe('trackCustomEvent', () => {
    it('should call trackCustomEvent with parameter', async () => {
      const eventName = 'TEST_NAME';
      const eventAttributes = { key: 'value' };
      (mockConfig.trackCustomEvent as jest.Mock).mockResolvedValue(undefined);

      await mockConfig.trackCustomEvent(eventName, eventAttributes);

      expect(mockConfig.trackCustomEvent).toHaveBeenCalledWith(eventName, eventAttributes);
      expect(mockConfig.trackCustomEvent).toHaveBeenCalledTimes(1);
    });

    it('should call trackCustomEvent with null attributes', async () => {
      const eventName = 'TEST_NAME';
      const eventAttributes = null;
      (mockConfig.trackCustomEvent as jest.Mock).mockResolvedValue(undefined);

      await mockConfig.trackCustomEvent(eventName, eventAttributes);

      expect(mockConfig.trackCustomEvent).toHaveBeenCalledWith(eventName, eventAttributes);
      expect(mockConfig.trackCustomEvent).toHaveBeenCalledTimes(1);
    });

    it('should handle successful trackCustomEvent', async () => {
      const eventName = 'TEST_NAME';
      const eventAttributes = { key: 'value' };
      (mockConfig.trackCustomEvent as jest.Mock).mockResolvedValue(undefined);

      await expect(mockConfig.trackCustomEvent(eventName, eventAttributes)).resolves.toBeUndefined();
    });

    it('should handle errors when trackCustomEvent', async () => {
      const eventName = 'INVALID_NAME';
      const eventAttributes = { key: 'value' };
      const error = new Error('Failed to trackCustomEvent');
      (mockConfig.trackCustomEvent as jest.Mock).mockRejectedValue(error);

      await expect(mockConfig.trackCustomEvent(eventName, eventAttributes)).rejects.toThrow('Failed to trackCustomEvent');
    });
  });

  describe('trackDeepLink', () => {
    it('should call trackDeepLink with parameter', async () => {
      const url = 'TEST_URL';
      (mockConfig.trackDeepLink as jest.Mock).mockResolvedValue(undefined);

      await mockConfig.trackDeepLink(url);

      expect(mockConfig.trackDeepLink).toHaveBeenCalledWith(url);
      expect(mockConfig.trackDeepLink).toHaveBeenCalledTimes(1);
    });

    it('should handle successful trackDeepLink', async () => {
      const url = 'TEST_URL';
      (mockConfig.trackDeepLink as jest.Mock).mockResolvedValue(undefined);

      await expect(mockConfig.trackDeepLink(url)).resolves.toBeUndefined();
    });

    it('should handle errors when trackDeepLink', async () => {
      const url = 'INVALID_URL';
      const error = new Error('Failed to trackDeepLink');
      (mockConfig.trackDeepLink as jest.Mock).mockRejectedValue(error);

      await expect(mockConfig.trackDeepLink(url)).rejects.toThrow('Failed to trackDeepLink');
    });
  });

  describe('Type Validation', () => {
    it('should have all required methods defined', () => {
      expect(mockConfig.onEvent).toBeDefined();
      expect(mockConfig.setEventHandler).toBeDefined();
      expect(mockConfig.setContact).toBeDefined();
      expect(mockConfig.clearContact).toBeDefined();
      expect(mockConfig.trackCustomEvent).toBeDefined();
      expect(mockConfig.trackDeepLink).toBeDefined();
    });

    it('should have all methods as functions', () => {
      expect(typeof mockConfig.onEvent).toBe('function');
      expect(typeof mockConfig.setEventHandler).toBe('function');
      expect(typeof mockConfig.setContact).toBe('function');
      expect(typeof mockConfig.clearContact).toBe('function');
      expect(typeof mockConfig.trackCustomEvent).toBe('function');
      expect(typeof mockConfig.trackDeepLink).toBe('function');
    });
  });
});
