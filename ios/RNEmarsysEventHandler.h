//
//  Copyright © 2020 Emarsys. All rights reserved.
//

@interface RNEmarsysEventHandler : NSObject

- (void)setPushNotificationEventHandler;
- (void)setInAppEventHandler;
- (void)setPushSilentMessageEventHandler;
- (void)setGeofenceEventHandler;
- (void)setOnEventActionEventHandler;
- (void)setEventHandlers;

@end
