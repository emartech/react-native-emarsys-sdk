
#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif
#import <React/RCTEventEmitter.h>

#import "EMSEventHandler.h"

typedef void (^InAppHandlerBlock)(NSString *eventName, NSDictionary<NSString *, NSObject *> *payload);

@interface RNEmarsysWrapper : RCTEventEmitter <RCTBridgeModule>

@property(nonatomic, strong) InAppHandlerBlock handlerBlock;
- (void)sendEvent:(NSDictionary<NSString *, NSObject *> *)body;
@end
