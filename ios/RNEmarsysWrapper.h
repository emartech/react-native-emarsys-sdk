#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RNEmarsysWrapper : RCTEventEmitter <RCTBridgeModule>

- (void)sendEvent:(NSDictionary<NSString *, NSObject *> *)body;

@end
