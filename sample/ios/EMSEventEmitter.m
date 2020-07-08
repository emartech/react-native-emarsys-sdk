//
//  Copyright © 2020 Emarsys. All rights reserved.
//

#import "EMSEventEmitter.h"
 
@implementation EMSEventEmitter
{
  bool hasListeners;
  NSDictionary<NSString *,NSObject *> *body;
}

- (instancetype)init
{
  self = [super init];
  if (self) {
    UNUserNotificationCenter.currentNotificationCenter.delegate = Emarsys.notificationCenterDelegate;
    Emarsys.inApp.eventHandler = self;
    Emarsys.notificationCenterDelegate.eventHandler = self;
    Emarsys.push.silentMessageEventHandler = self;
    Emarsys.geofence.eventHandler = self;
  }
  return self;
}

RCT_EXPORT_MODULE()

// Will be called when this module's first listener is added.
-(void)startObserving {
    hasListeners = YES;
    // Set up any upstream listeners or background tasks as necessary
    if (body != nil) {
      [self sendEventWithName:@"handleEvent" body: body];
    }
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
    hasListeners = NO;
    // Remove upstream listeners, stop unnecessary background tasks
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"handleEvent"];
}
 
- (void)handleEvent:(nonnull NSString *)eventName payload:(nullable NSDictionary<NSString *,NSObject *> *)payload {
    if (hasListeners) { // Only send events if anyone is listening
      [self sendEventWithName:@"handleEvent" body:@{@"eventName": eventName, @"payload": payload}];
    } else {
      body = @{@"eventName": eventName, @"payload": payload};
    }
}

@end
