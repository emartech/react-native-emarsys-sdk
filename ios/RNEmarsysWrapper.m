#import "RNEmarsysWrapper.h"

#import "Emarsys.h"

static bool hasListeners = NO;
static NSDictionary<NSString *,NSObject *> *_body = nil;

@implementation RNEmarsysWrapper

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE()

// MARK: - Setup

RCT_EXPORT_METHOD(setContact:(NSNumber * _Nonnull)contactFieldId contactFieldValue:(NSString * _Nonnull)contactFieldValue
                  resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject ) {
    @try {
        [Emarsys setContactWithContactFieldId:contactFieldId contactFieldValue:contactFieldValue completionBlock:^(NSError * _Nullable error) {
            if (NULL != error) {
                reject(@"RNEmarsysWrapper", @"setContact: ", error);
            } else {
                resolve([NSNumber numberWithBool:YES]);
            }
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(clearContact:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        [Emarsys clearContactWithCompletionBlock:^(NSError *error) {
            if (NULL != error) {
                reject(@"RNEmarsysWrapper", @"clearContact: ", error);
            } else {
                resolve([NSNumber numberWithBool:YES]);
            }
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(trackCustomEvent:(NSString * _Nonnull)eventName eventAttributes:(NSDictionary * _Nullable)eventAttributes
                  resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject ) {
    @try {
        [Emarsys trackCustomEventWithName:eventName eventAttributes:eventAttributes completionBlock:^(NSError *error) {
            if (NULL != error) {
                reject(@"RNEmarsysWrapper", @"trackCustomEvent: ", error);
            } else {
                resolve([NSNumber numberWithBool:YES]);
            }
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(setEventHandler) {
    
}

// MARK: - DeepLink

RCT_EXPORT_METHOD(trackDeepLink:(NSString * _Nonnull)userActivity resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        if ( userActivity != nil ) {
            NSUserActivity* activity = [[NSUserActivity alloc] initWithActivityType:NSUserActivityTypeBrowsingWeb];
            NSURL *activityURL = [NSURL URLWithString:userActivity];
            @try {
                activity.webpageURL = activityURL;
                
                [Emarsys trackDeepLinkWithUserActivity:activity sourceHandler:^(NSString *source) {
                    resolve([NSNumber numberWithBool:YES]);
                }];
            }
            @catch (NSException *ex) {
                reject(ex.name, ex.reason, nil);
            }
        }
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

// MARK: - Config

RCT_EXPORT_METHOD(changeApplicationCode:(NSString * _Nullable)applicationCode resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject ) {
    @try {
        [Emarsys.config changeApplicationCode:applicationCode completionBlock:^(NSError * _Nullable error) {
            if (NULL != error) {
                reject(@"RNEmarsysWrapper", @"changeApplicationCode: ", error);
            } else {
                resolve([NSNumber numberWithBool:YES]);
            }
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(changeMerchantId:(NSString * _Nonnull)merchantId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject ) {
    @try {
        [Emarsys.config changeMerchantId:merchantId ];
        resolve([NSNumber numberWithBool:YES]);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(getApplicationCode:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject ) {
    @try {
        NSString *applicationCode = [Emarsys.config applicationCode];
        resolve(applicationCode);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(getMerchantId:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSString *merchantId = [Emarsys.config merchantId];
        resolve(merchantId);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(getContactFieldId:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSNumber *contactFieldId = [Emarsys.config contactFieldId];
        resolve(contactFieldId);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(getHardwareId:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSString *hardwareId = [Emarsys.config hardwareId];
        resolve(hardwareId);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(getLanguageCode:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSString *languageCode = [Emarsys.config languageCode];
        resolve(languageCode);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(getSdkVersion:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSString *sdkVersion = [Emarsys.config sdkVersion];
        resolve(sdkVersion);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

// MARK: -

- (NSArray<NSString *> *)supportedEvents {
    return @[@"handleEvent"];
}

- (void)startObserving {
    hasListeners = YES;
    if (_body != nil) {
        [self sendEventWithName:@"handleEvent" body: _body];
    }
}

- (void)stopObserving {
    hasListeners = NO;
}

- (void)sendEvent:(NSDictionary<NSString *, NSObject *> *)body {
    if (hasListeners) {
        [self sendEventWithName:@"handleEvent" body: body];
    } else {
        _body = body;
    }
}

+ (id)allocWithZone:(NSZone *)zone {
    static RNEmarsysWrapper *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [super allocWithZone:zone];
    });
    return sharedInstance;
}

@end
