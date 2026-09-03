#import "EventUtils.h"

@implementation EventUtils

static NSMutableArray<NSDictionary *> *eventsCache;

+ (void)setEventHandler:(EMSEventHandlerBlock)eventHandler {
  EMSEventHandlerBlock _eventHandler = eventHandler ?: ^(NSString *eventName, NSDictionary<NSString *, id> *payload) {
    if (eventsCache == nil) {
      eventsCache = [[NSMutableArray alloc] init];
    }
    [eventsCache addObject:@{@"eventName": eventName, @"payload": payload}];
  };
  Emarsys.push.notificationEventHandler = _eventHandler;
  Emarsys.inApp.eventHandler = _eventHandler;
  Emarsys.geofence.eventHandler = _eventHandler;
  Emarsys.onEventAction.eventHandler = _eventHandler;

  if (eventHandler != nil && eventsCache != nil) {
    for (NSDictionary *event in eventsCache) {
      eventHandler([event objectForKey:@"eventName"], [event objectForKey:@"payload"]);
    }
    [eventsCache removeAllObjects];
  }
}

+ (void)setSilentMessageEventHandler:(EMSEventHandlerBlock)eventHandler {
  Emarsys.push.silentMessageEventHandler = eventHandler;
}

@end
