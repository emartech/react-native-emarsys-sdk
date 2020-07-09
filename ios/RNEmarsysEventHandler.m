//
//  Copyright © 2020 Emarsys. All rights reserved.
//

#import "RNEmarsysEventHandler.h"

static bool hasListeners = NO;
static NSDictionary<NSString *,NSObject *> *body = nil;
 
@implementation RNEmarsysEventHandler

+ (id)allocWithZone:(NSZone *)zone {
    static RNEmarsysEventHandler *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [super allocWithZone:zone];
    });
    return sharedInstance;
}

RCT_EXPORT_MODULE()

-(void)startObserving {
    hasListeners = YES;
    if (body != nil) {
      [self sendEventWithName:@"handleEvent" body: body];
    }
}

-(void)stopObserving {
    hasListeners = NO;
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"handleEvent"];
}
 
- (void)handleEvent:(nonnull NSString *)eventName payload:(nullable NSDictionary<NSString *,NSObject *> *)payload {
    if (hasListeners) {
      [self sendEventWithName:@"handleEvent" body:@{@"eventName": eventName, @"payload": payload}];
    } else {
      body = @{@"eventName": eventName, @"payload": payload};
    }
}

@end
