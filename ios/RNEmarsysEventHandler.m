//
//  Copyright © 2020 Emarsys. All rights reserved.
//

#import "RNEmarsysEventHandler.h"

#import "Emarsys.h"

#import "RNEmarsysWrapper.h"

@implementation RNEmarsysEventHandler

+ (id)allocWithZone:(NSZone *)zone {
    static RNEmarsysEventHandler *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [super allocWithZone:zone];
    });
    return sharedInstance;
}

- (void)setPushNotificationEventHandler {
    Emarsys.push.notificationEventHandler = ^(NSString * _Nonnull eventName, NSDictionary<NSString *,id> * _Nullable payload) {
        [self handleEvent:eventName payload:payload];
    };
}

- (void)setInAppEventHandler {
    Emarsys.inApp.eventHandler = ^(NSString * _Nonnull eventName, NSDictionary<NSString *,id> * _Nullable payload) {
        [self handleEvent:eventName payload:payload];
    };
}

- (void)setPushSilentMessageEventHandler {
    Emarsys.push.silentMessageEventHandler = ^(NSString * _Nonnull eventName, NSDictionary<NSString *,id> * _Nullable payload) {
        [self handleEvent:eventName payload:payload];
    };
}

- (void)setGeofenceEventHandler {
    Emarsys.geofence.eventHandler = ^(NSString * _Nonnull eventName, NSDictionary<NSString *,id> * _Nullable payload) {
        [self handleEvent:eventName payload:payload];
    };
}

- (void)setOnEventActionEventHandler {
    Emarsys.onEventAction.eventHandler = ^(NSString * _Nonnull eventName, NSDictionary<NSString *,id> * _Nullable payload) {
        [self handleEvent:eventName payload:payload];
    };
}

- (void)setEventHandlers {
    [self setPushNotificationEventHandler];
    [self setPushSilentMessageEventHandler];
    [self setInAppEventHandler];
    [self setGeofenceEventHandler];
    [self setOnEventActionEventHandler];
}

- (void)handleEvent:(nonnull NSString *)eventName payload:(nullable NSDictionary<NSString *,NSObject *> *)payload {
    RNEmarsysWrapper *wrapper = [RNEmarsysWrapper allocWithZone: nil];
    [wrapper sendEvent:@{@"eventName": eventName, @"payload": payload}];
}

@end
