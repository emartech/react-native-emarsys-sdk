#import <EmarsysSDK/Emarsys.h>
#import <NativeEmarsys/NativeEmarsys.h>
#import "EventUtils.h"
#import "WrapperUtils.h"

#define NAME @"NativeEmarsys"

@interface NativeEmarsys : NativeEmarsysSpecBase <NativeEmarsysSpec>

@end

@implementation NativeEmarsys

RCT_EXPORT_MODULE()

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeEmarsysSpecJSI>(params);
}

- (void)setEventHandler:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  [EventUtils setEventHandler:^(NSString *eventName, NSDictionary<NSString *, id> *payload) {
    [self emitOnEvent:@{@"name": eventName, @"payload": payload ?: [NSNull null]}];
  }];
  resolve(nil);
}

- (void)setSilentMessageEventHandler:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  [EventUtils setSilentMessageEventHandler:^(NSString *eventName, NSDictionary<NSString *, id> *payload) {
    [self emitOnSilentMessageEvent:@{@"name": eventName, @"payload": payload ?: [NSNull null]}];
  }];
  resolve(nil);
}

- (void)setContact:(double)contactFieldId contactFieldValue:(NSString *)contactFieldValue
  resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  @try {
    [Emarsys setContactWithContactFieldId:@((int)contactFieldId) contactFieldValue:contactFieldValue
      completionBlock:^(NSError *error) {
      if (error == nil) {
        resolve(nil);
      } else {
        reject(NAME, @"setContact", error);
      }
    }];
  } @catch (NSException *exception) {
    reject(NAME, @"setContact", [NSError errorWithException:exception]);
  }
}

- (void)clearContact:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  @try {
    [Emarsys clearContactWithCompletionBlock:^(NSError *error) {
      if (error == nil) {
        resolve(nil);
      } else {
        reject(NAME, @"clearContact", error);
      }
    }];
  } @catch (NSException *exception) {
    reject(NAME, @"clearContact", [NSError errorWithException:exception]);
  }
}

- (void)trackCustomEvent:(NSString *)eventName eventAttributes:(NSDictionary * _Nullable)eventAttributes
  resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  @try {
    [Emarsys trackCustomEventWithName:eventName eventAttributes:eventAttributes
      completionBlock:^(NSError *error) {
      if (error == nil) {
        resolve(nil);
      } else {
        reject(NAME, @"trackCustomEvent", error);
      }
    }];
  } @catch (NSException *exception) {
    reject(NAME, @"trackCustomEvent", [NSError errorWithException:exception]);
  }
}

- (void)trackDeepLink:(NSString *)url resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  @try {
    NSUserActivity *userActivity = [[NSUserActivity alloc] initWithActivityType:NSUserActivityTypeBrowsingWeb];
    userActivity.webpageURL = [NSURL URLWithString:url];
    [Emarsys trackDeepLinkWithUserActivity:userActivity sourceHandler:^(NSString *source) {
      resolve(source);
    }];
  } @catch (NSException *exception) {
    reject(NAME, @"trackDeepLink", [NSError errorWithException:exception]);
  }
}

@end
