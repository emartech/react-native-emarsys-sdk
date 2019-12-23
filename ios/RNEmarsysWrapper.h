
#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

#import "EMSEventHandler.h"

@interface ArrayUtil : NSObject
+ (NSArray<EMSCartItem *> *)arrayToCartList:(NSArray *)array;
@end

@interface MapUtil : NSObject
+ (NSMutableDictionary *)convertProductToMap:(EMSProduct *)product;
+ (EMSProduct *)mapToProduct:(NSDictionary *)object;
+ (NSArray<EMSRecommendationFilter *> *)mapToRecommendationFilter:(NSDictionary *)map;
@end

@interface LogicParser : NSObject
+ (EMSLogic *)parseLogic:(NSString *)logic;
+ (EMSLogic *)parseLogic:(NSString *)logic cartItems:(NSArray *)cartItems;
+ (EMSLogic *)parseLogic:(NSString *)logic query:(NSString *)query;
@end

typedef void (^InAppHandlerBlock)(NSString *eventName, NSDictionary<NSString *, NSObject *> *payload);

@interface RNEmarsysWrapper : NSObject <RCTBridgeModule, EMSEventHandler>

@property(nonatomic, strong) InAppHandlerBlock handlerBlock;

@end
