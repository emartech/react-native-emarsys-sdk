#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#else
#import "RCTBridgeModule.h"
#endif
#import <React/RCTEventEmitter.h>

@interface RNEmarsysWrapper : RCTEventEmitter <RCTBridgeModule>

- (void)sendEvent:(NSDictionary<NSString *, NSObject *> *)body;

@end
