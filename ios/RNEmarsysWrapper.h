
#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

#import "EMSEventHandler.h"

@interface ArrayUtil : NSObject
@end

@interface MapUtil : NSObject
@end

@interface LogicParser : NSObject
@end

typedef void (^InAppHandlerBlock)(NSString *eventName, NSDictionary<NSString *, NSObject *> *payload);

@interface RNEmarsysWrapper : NSObject <RCTBridgeModule, EMSEventHandler>

@property(nonatomic, strong) InAppHandlerBlock handlerBlock;

@end
