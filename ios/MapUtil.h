//
//  MapUtil.h
//  RNEmarsysWrapper
//
//  Created by Eduardo Zatoni on 10/07/2020.
//

@interface MapUtil : NSObject
+ (NSMutableDictionary *)convertProductToMap:(EMSProduct *)product;
+ (EMSProduct *)mapToProduct:(NSDictionary *)object;
+ (NSArray<EMSRecommendationFilter *> *)mapToRecommendationFilter:(NSDictionary *)map;
@end
