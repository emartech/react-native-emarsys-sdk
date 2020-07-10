//
//  Copyright © 2020 Emarsys. All rights reserved.
//

#import "RNEmarsysEventHandler.h"
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

- (void)handleEvent:(nonnull NSString *)eventName payload:(nullable NSDictionary<NSString *,NSObject *> *)payload {
    RNEmarsysWrapper *wrapper = [RNEmarsysWrapper allocWithZone: nil];
    [wrapper sendEvent:@{@"eventName": eventName, @"payload": payload}];
}

@end
