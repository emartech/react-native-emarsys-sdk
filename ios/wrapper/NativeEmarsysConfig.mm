#import <EmarsysSDK/Emarsys.h>
#import <NativeEmarsys/NativeEmarsys.h>
#import "StorageUtils.h"
#import "WrapperUtils.h"

#define NAME @"NativeEmarsysConfig"

@interface NativeEmarsysConfig : NSObject <NativeEmarsysConfigSpec>

@end

@implementation NativeEmarsysConfig

RCT_EXPORT_MODULE()

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeEmarsysConfigSpecJSI>(params);
}

- (void)changeApplicationCode:(NSString * _Nullable)applicationCode
  resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  @try {
    [Emarsys.config changeApplicationCode:applicationCode completionBlock:^(NSError *error) {
      if (error == nil) {
        [StorageUtils setUserDefaultsString:(applicationCode ?: @"") forKey:@"applicationCode"];
        resolve(nil);
      } else {
        reject(NAME, @"changeApplicationCode", error);
      }
    }];
  } @catch (NSException *exception) {
    reject(NAME, @"changeApplicationCode", [NSError errorWithException:exception]);
  }
}

- (void)changeMerchantId:(NSString * _Nullable)merchantId
  resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  @try {
    [Emarsys.config changeMerchantId:merchantId completionBlock:^(NSError *error) {
      if (error == nil) {
        [StorageUtils setUserDefaultsString:(merchantId ?: @"") forKey:@"merchantId"];
        resolve(nil);
      } else {
        reject(NAME, @"changeMerchantId", error);
      }
    }];
  } @catch (NSException *exception) {
    reject(NAME, @"changeMerchantId", [NSError errorWithException:exception]);
  }
}

- (void)getApplicationCode:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  @try {
    NSString *applicationCode = [Emarsys.config applicationCode];
    resolve(applicationCode);
  } @catch (NSException *exception) {
    reject(NAME, @"getApplicationCode", [NSError errorWithException:exception]);
  }
}

- (void)getMerchantId:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  @try {
    NSString *merchantId = [Emarsys.config merchantId];
    resolve(merchantId);
  } @catch (NSException *exception) {
    reject(NAME, @"getMerchantId", [NSError errorWithException:exception]);
  }
}

- (void)getContactFieldId:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  @try {
    NSNumber *contactFieldId = [Emarsys.config contactFieldId];
    resolve(contactFieldId);
  } @catch (NSException *exception) {
    reject(NAME, @"getContactFieldId", [NSError errorWithException:exception]);
  }
}

- (void)getClientId:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  @try {
    NSString *clientId = [Emarsys.config clientId];
    resolve(clientId);
  } @catch (NSException *exception) {
    reject(NAME, @"getClientId", [NSError errorWithException:exception]);
  }
}

- (void)getLanguageCode:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  @try {
    NSString *languageCode = [Emarsys.config languageCode];
    resolve(languageCode);
  } @catch (NSException *exception) {
    reject(NAME, @"getLanguageCode", [NSError errorWithException:exception]);
  }
}

- (void)getSdkVersion:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  @try {
    NSString *sdkVersion = [Emarsys.config sdkVersion];
    resolve(sdkVersion);
  } @catch (NSException *exception) {
    reject(NAME, @"getSdkVersion", [NSError errorWithException:exception]);
  }
}

- (void)getRNWrapperVersion:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  // Overridden and implemented in src/wrapper/config.ts
}

@end
