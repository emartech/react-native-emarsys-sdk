import { setMetaData, addEmarsysMessagingService } from '../../../src/expo/android/withEmarsysAndroidHelpers';

describe('withEmarsysAndroidHelpers', () => {
  describe('setMetaData', () => {
    it('should add meta-data to empty application', () => {
      const app: any = {};
      
      setMetaData(app, 'TEST_NAME', { value: 'TEST_VALUE'});
      
      expect(app['meta-data']).toHaveLength(1);
      expect(app['meta-data'][0]).toEqual({
        $: {
          'android:name': 'TEST_NAME',
          'android:value': 'TEST_VALUE'
        }
      });
    });

    it('should add meta-data to existing meta-data array', () => {
      const app: any = {
        'meta-data': [
          {
            $: {
              'android:name': 'EXISTING_NAME',
              'android:value': 'EXISTING_VALUE'
            }
          }
        ]
      };
      
      setMetaData(app, 'NEW_NAME', { value: 'NEW_VALUE' });
      
      expect(app['meta-data']).toHaveLength(2);
      expect(app['meta-data'][1]).toEqual({
        $: {
          'android:name': 'NEW_NAME',
          'android:value': 'NEW_VALUE'
        }
      });
    });

    it('should update existing meta-data entries', () => {
      const app: any = {
        'meta-data': [
          {
            $: {
              'android:name': 'EXISTING_NAME',
              'android:value': 'OLD_VALUE'
            }
          }
        ]
      };
      
      // Update the existing entry
      setMetaData(app, 'EXISTING_NAME', { value: 'NEW_VALUE' });
      
      expect(app['meta-data']).toHaveLength(1);
      expect(app['meta-data'][0]).toEqual({
        $: {
          'android:name': 'EXISTING_NAME',
          'android:value': 'NEW_VALUE'
        }
      });
    });

    it('should handle malformed meta-data entries gracefully', () => {
      const app: any = {
        'meta-data': [
          { /* malformed entry without $ property */ },
          {
            $: {
              'android:name': 'VALID_NAME',
              'android:value': 'VALID_VALUE'
            }
          }
        ]
      };
      
      setMetaData(app, 'NEW_NAME', { value: 'NEW_VALUE' });
      
      expect(app['meta-data']).toHaveLength(3);
      expect(app['meta-data'][2]).toEqual({
        $: {
          'android:name': 'NEW_NAME',
          'android:value': 'NEW_VALUE'
        }
      });
    });

    it('should add EMSApplicationCode correctly', () => {
      const app: any = {};
      
      setMetaData(app, 'EMSApplicationCode', { value: 'TEST123' });
      
      expect(app['meta-data'][0].$['android:name']).toBe('EMSApplicationCode');
      expect(app['meta-data'][0].$['android:value']).toBe('TEST123');
    });

    it('should add EMSMerchantId correctly', () => {
      const app: any = {};
      
      setMetaData(app, 'EMSMerchantId', { value: 'MERCHANT456' });
      
      expect(app['meta-data'][0].$['android:name']).toBe('EMSMerchantId');
      expect(app['meta-data'][0].$['android:value']).toBe('MERCHANT456');
    });

    it('should handle array values by joining them with commas', () => {
      const app: any = {};
      
      setMetaData(app, 'EMSSharedPackageNames', { value: ['com.example.app1', 'com.example.app2', 'com.example.app3'] });
      
      expect(app['meta-data'][0].$['android:name']).toBe('EMSSharedPackageNames');
      expect(app['meta-data'][0].$['android:value']).toBe('com.example.app1,com.example.app2,com.example.app3');
    });

    it('should handle single element array correctly', () => {
      const app: any = {};
      
      setMetaData(app, 'EMSSharedPackageNames', { value: ['com.example.app'] });
      
      expect(app['meta-data'][0].$['android:name']).toBe('EMSSharedPackageNames');
      expect(app['meta-data'][0].$['android:value']).toBe('com.example.app');
    });

    it('should handle empty array correctly', () => {
      const app: any = {};
      
      setMetaData(app, 'EMSSharedPackageNames', { value: [] });
      
      expect(app['meta-data'][0].$['android:name']).toBe('EMSSharedPackageNames');
      expect(app['meta-data'][0].$['android:value']).toBe('');
    });

    it('should update existing array values correctly', () => {
      const app: any = {
        'meta-data': [{
          $: {
            'android:name': 'EMSSharedPackageNames',
            'android:value': 'old.package.name'
          }
        }]
      };
      
      setMetaData(app, 'EMSSharedPackageNames', { value: ['new.package.one', 'new.package.two'] });
      
      expect(app['meta-data']).toHaveLength(1);
      expect(app['meta-data'][0].$['android:name']).toBe('EMSSharedPackageNames');
      expect(app['meta-data'][0].$['android:value']).toBe('new.package.one,new.package.two');
    });
  });

  describe('setMetaData resource', () => {
    it('should add meta-data to empty application', () => {
      const app: any = {};
      
      setMetaData(app, 'TEST_NAME', { resource: 'TEST_RESOURCE'});
      
      expect(app['meta-data']).toHaveLength(1);
      expect(app['meta-data'][0]).toEqual({
        $: {
          'android:name': 'TEST_NAME',
          'android:resource': 'TEST_RESOURCE'
        }
      });
    });

    it('should add meta-data to existing meta-data array', () => {
      const app: any = {
        'meta-data': [
          {
            $: {
              'android:name': 'EXISTING_NAME',
              'android:resource': 'EXISTING_RESOURCE'
            }
          }
        ]
      };
      
      setMetaData(app, 'NEW_NAME', { resource: 'NEW_RESOURCE' });
      
      expect(app['meta-data']).toHaveLength(2);
      expect(app['meta-data'][1]).toEqual({
        $: {
          'android:name': 'NEW_NAME',
          'android:resource': 'NEW_RESOURCE'
        }
      });
    });

    it('should update existing meta-data entry', () => {
      const app: any = {
        'meta-data': [
          {
            $: {
              'android:name': 'EXISTING_NAME',
              'android:resource': 'OLD_RESOURCE'
            }
          }
        ]
      };
      
      // Update the existing entry
      setMetaData(app, 'EXISTING_NAME', { resource: 'NEW_RESOURCE' });
      
      expect(app['meta-data']).toHaveLength(1);
      expect(app['meta-data'][0]).toEqual({
        $: {
          'android:name': 'EXISTING_NAME',
          'android:resource': 'NEW_RESOURCE'
        }
      });
    });

    it('should update existing meta-data entry', () => {
      const app: any = {
        'meta-data': [
          {
            $: {
              'android:name': 'EXISTING_NAME',
              'android:value': 'OLD_VALUE'
            }
          }
        ]
      };
      
      // Update the existing entry
      setMetaData(app, 'EXISTING_NAME', { resource: 'NEW_RESOURCE' });
      
      expect(app['meta-data']).toHaveLength(1);
      expect(app['meta-data'][0]).toEqual({
        $: {
          'android:name': 'EXISTING_NAME',
          'android:resource': 'NEW_RESOURCE'
        }
      });
    });
  });

  describe('setMetaData advanced scenarios', () => {
    it('should add meta-data to empty application', () => {
      const app: any = {};
      
      setMetaData(app, 'TEST_NAME', { value: 'TEST_VALUE' });
      
      expect(app['meta-data']).toHaveLength(1);
      expect(app['meta-data'][0]).toEqual({
        $: {
          'android:name': 'TEST_NAME',
          'android:value': 'TEST_VALUE'
        }
      });
    });

    it('should add meta-data to existing meta-data array', () => {
      const app: any = {
        'meta-data': [
          {
            $: {
              'android:name': 'EXISTING_NAME',
              'android:value': 'EXISTING_VALUE'
            }
          }
        ]
      };
      
      setMetaData(app, 'NEW_NAME', { value: 'NEW_VALUE' });
      
      expect(app['meta-data']).toHaveLength(2);
      expect(app['meta-data'][1]).toEqual({
        $: {
          'android:name': 'NEW_NAME',
          'android:value': 'NEW_VALUE'
        }
      });
    });

    it('should update existing meta-data entry', () => {
      const app: any = {
        'meta-data': [
          {
            $: {
              'android:name': 'EXISTING_NAME',
              'android:value': 'OLD_VALUE'
            }
          }
        ]
      };
      
      setMetaData(app, 'EXISTING_NAME', { value: 'NEW_VALUE' });
      
      expect(app['meta-data']).toHaveLength(1);
      expect(app['meta-data'][0]).toEqual({
        $: {
          'android:name': 'EXISTING_NAME',
          'android:value': 'NEW_VALUE'
        }
      });
    });

    it('should update existing entry among multiple meta-data entries', () => {
      const app: any = {
        'meta-data': [
          {
            $: {
              'android:name': 'FIRST_NAME',
              'android:value': 'FIRST_VALUE'
            }
          },
          {
            $: {
              'android:name': 'EXISTING_NAME',
              'android:value': 'OLD_VALUE'
            }
          },
          {
            $: {
              'android:name': 'THIRD_NAME',
              'android:value': 'THIRD_VALUE'
            }
          }
        ]
      };
      
      setMetaData(app, 'EXISTING_NAME', { value: 'NEW_VALUE' });
      
      expect(app['meta-data']).toHaveLength(3);
      expect(app['meta-data'][0]).toEqual({
        $: {
          'android:name': 'FIRST_NAME',
          'android:value': 'FIRST_VALUE'
        }
      });
      expect(app['meta-data'][1]).toEqual({
        $: {
          'android:name': 'EXISTING_NAME',
          'android:value': 'NEW_VALUE'
        }
      });
      expect(app['meta-data'][2]).toEqual({
        $: {
          'android:name': 'THIRD_NAME',
          'android:value': 'THIRD_VALUE'
        }
      });
    });

    it('should handle meta-data entries without valid $ property', () => {
      const app: any = {
        'meta-data': [
          {
            // Invalid entry without $ property
            'android:name': 'INVALID_ENTRY'
          },
          {
            $: {
              'android:name': 'VALID_ENTRY',
              'android:value': 'VALID_VALUE'
            }
          }
        ]
      };
      
      setMetaData(app, 'NEW_NAME', { value: 'NEW_VALUE' });
      
      expect(app['meta-data']).toHaveLength(3);
      expect(app['meta-data'][2]).toEqual({
        $: {
          'android:name': 'NEW_NAME',
          'android:value': 'NEW_VALUE'
        }
      });
    });

    it('should add EMSEnableConsoleLogging correctly', () => {
      const app: any = {};
      
      setMetaData(app, 'EMSEnableConsoleLogging', { value: 'true' });
      
      expect(app['meta-data'][0].$['android:name']).toBe('EMSEnableConsoleLogging');
      expect(app['meta-data'][0].$['android:value']).toBe('true');
    });

    it('should update EMSEnableConsoleLogging correctly', () => {
      const app: any = {
        'meta-data': [
          {
            $: {
              'android:name': 'EMSEnableConsoleLogging',
              'android:value': 'false'
            }
          }
        ]
      };
      
      setMetaData(app, 'EMSEnableConsoleLogging', { value: 'true' });
      
      expect(app['meta-data']).toHaveLength(1);
      expect(app['meta-data'][0].$['android:name']).toBe('EMSEnableConsoleLogging');
      expect(app['meta-data'][0].$['android:value']).toBe('true');
    });
  });

  describe('addEmarsysMessagingService', () => {
    it('should add Emarsys messaging service to empty application', () => {
      const app: any = {};
      
      addEmarsysMessagingService(app);
      
      expect(app.service).toHaveLength(1);
      expect(app.service[0]).toEqual({
        $: {
          'android:name': 'com.emarsys.service.EmarsysFirebaseMessagingService',
          'android:exported': 'false'
        },
        'intent-filter': [
          {
            action: [
              {
                $: {
                  'android:name': 'com.google.firebase.MESSAGING_EVENT'
                }
              }
            ]
          }
        ]
      });
    });

    it('should add service to existing services array', () => {
      const app: any = {
        service: [
          {
            $: {
              'android:name': 'com.example.ExistingService',
              'android:exported': 'true'
            }
          }
        ]
      };
      
      addEmarsysMessagingService(app);
      
      expect(app.service).toHaveLength(2);
      expect(app.service[1].$['android:name']).toBe('com.emarsys.service.EmarsysFirebaseMessagingService');
    });

    it('should not add duplicate Emarsys messaging service', () => {
      const app: any = {
        service: [
          {
            $: {
              'android:name': 'com.emarsys.service.EmarsysFirebaseMessagingService',
              'android:exported': 'false'
            },
            'intent-filter': [
              {
                action: [
                  {
                    $: {
                      'android:name': 'com.google.firebase.MESSAGING_EVENT'
                    }
                  }
                ]
              }
            ]
          }
        ]
      };
      
      addEmarsysMessagingService(app);
      
      expect(app.service).toHaveLength(1);
    });

    it('should not add service if MESSAGING_EVENT intent filter already exists', () => {
      const app: any = {
        service: [
          {
            $: {
              'android:name': 'com.example.SomeOtherService',
              'android:exported': 'true'
            },
            'intent-filter': [
              {
                action: [
                  {
                    $: {
                      'android:name': 'com.google.firebase.MESSAGING_EVENT'
                    }
                  }
                ]
              }
            ]
          }
        ]
      };
      
      addEmarsysMessagingService(app);
      
      expect(app.service).toHaveLength(1);
      expect(app.service[0].$['android:name']).toBe('com.example.SomeOtherService');
    });

    it('should handle services with malformed intent filters', () => {
      const app: any = {
        service: [
          {
            $: {
              'android:name': 'com.example.MalformedService',
              'android:exported': 'true'
            },
            'intent-filter': [
              {
                // Missing action array
              }
            ]
          }
        ]
      };
      
      addEmarsysMessagingService(app);
      
      expect(app.service).toHaveLength(2);
      expect(app.service[1].$['android:name']).toBe('com.emarsys.service.EmarsysFirebaseMessagingService');
    });

    it('should handle services with malformed actions', () => {
      const app: any = {
        service: [
          {
            $: {
              'android:name': 'com.example.MalformedService',
              'android:exported': 'true'
            },
            'intent-filter': [
              {
                action: [
                  {
                    // Missing $ property
                    'android:name': 'com.google.firebase.MESSAGING_EVENT'
                  }
                ]
              }
            ]
          }
        ]
      };
      
      addEmarsysMessagingService(app);
      
      expect(app.service).toHaveLength(2);
      expect(app.service[1].$['android:name']).toBe('com.emarsys.service.EmarsysFirebaseMessagingService');
    });

    it('should create service array if it does not exist', () => {
      const app: any = {};
      
      addEmarsysMessagingService(app);
      
      expect(Array.isArray(app.service)).toBe(true);
      expect(app.service).toHaveLength(1);
    });
  });
});
