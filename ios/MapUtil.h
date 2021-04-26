//
//  Copyright © 2020 Emarsys. All rights reserved.
//

@interface MapUtil : NSObject
+ (NSMutableDictionary *)convertProductToMap:(EMSProduct *)product;
+ (EMSProduct *)mapToProduct:(NSDictionary *)object;
+ (NSArray<EMSRecommendationFilter *> *)mapToRecommendationFilter:(NSDictionary *)map;
+ (NSMutableDictionary *)convertMessageToMap:(EMSMessage *)message;
@end
