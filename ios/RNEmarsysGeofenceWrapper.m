#import "RNEmarsysGeofenceWrapper.h"

#import "Emarsys.h"
#import "EMSGeofence.h"
#import "EMSGeofenceTrigger.h"

@implementation RNEmarsysGeofenceWrapper

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(requestAlwaysAuthorization:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        [Emarsys.geofence requestAlwaysAuthorization];
        resolve([NSNumber numberWithBool:YES]);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(geofenceEnable:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        [Emarsys.geofence enableWithCompletionBlock:^(NSError * _Nullable error) {
            if (NULL != error) {
                reject(@"RNEmarsysWrapper", @"geofence.enable: ", error);
            } else {
                resolve([NSNumber numberWithBool:YES]);
            }
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(geofenceDisable:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        [Emarsys.geofence disable];
        resolve([NSNumber numberWithBool:YES]);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(geofenceIsEnabled:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        bool isEnabled = [Emarsys.geofence isEnabled];
        resolve([NSNumber numberWithBool:isEnabled]);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(geofenceSetInitialEnterTriggerEnabled:(BOOL)enabled resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        Emarsys.geofence.initialEnterTriggerEnabled = enabled;
        resolve([NSNumber numberWithBool:YES]);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(registeredGeofences:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSArray<EMSGeofence *> *registeredGeofences = Emarsys.geofence.registeredGeofences;
        [self resolveGeofences:registeredGeofences resolver:resolve];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

- (void) resolveGeofences:(NSArray * _Nonnull)geofences resolver:(RCTPromiseResolveBlock)resolve {
    NSMutableArray *recGeofences = [NSMutableArray array];
    for (EMSGeofence *geofence in geofences) {
        NSMutableDictionary<NSString *, NSString *> *recGeofence = [self convertGeofenceToMap:geofence];
        [recGeofences addObject:recGeofence];
    }
    resolve(recGeofences);
}

- (NSMutableDictionary *)convertGeofenceToMap:(EMSGeofence *)geofence {
    NSMutableDictionary<NSString *, NSObject *> *map = [[NSMutableDictionary alloc] init];
    
    [map setObject: geofence.id forKey: @"geofenceId"];
    [map setObject: @(geofence.lat) forKey: @"lat"];
    [map setObject: @(geofence.lon) forKey: @"lon"];
    [map setObject: @(geofence.r) forKey: @"r"];
    [map setObject: @(geofence.waitInterval) forKey: @"waitInterval"];
    
    NSMutableArray *recTriggers = [NSMutableArray array];
    for (EMSGeofenceTrigger *trigger in geofence.triggers) {
        NSMutableDictionary<NSString *, NSString *> *recTrigger = [self convertGeofenceTriggerToMap:trigger];
        [recTriggers addObject:recTrigger];
    }
    [map setObject: recTriggers forKey: @"triggers"];
    
    return map;
}

- (NSMutableDictionary *)convertGeofenceTriggerToMap:(EMSGeofenceTrigger *)trigger {
    NSMutableDictionary<NSString *, NSObject *> *map = [[NSMutableDictionary alloc] init];
    
    [map setObject: trigger.id forKey: @"triggerId"];
    [map setObject: trigger.type forKey: @"type"];
    [map setObject: @(trigger.loiteringDelay) forKey: @"loiteringDelay"];
    [map setObject: trigger.action forKey: @"action"];
    
    return map;
}

@end
