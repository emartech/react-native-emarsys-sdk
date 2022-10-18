#import "Emarsys.h"
#import "EMSCartItem.h"

#import "EMSLogic.h"
#import "EMSRecommendationFilter.h"
#import "EMSProduct.h"
#import "EMSProduct+Emarsys.h"
#import "EMSProductBuilder.h"

#import "EMSGeofence.h"
#import "EMSGeofenceTrigger.h"

#import "RNEmarsysWrapper.h"

#import "LogicParser.h"
#import "MapUtil.h"

@implementation MapUtil

+ (NSMutableDictionary *)convertProductToMap:(EMSProduct *)product {
    
    NSMutableDictionary<NSString *, NSObject *> *map = [[NSMutableDictionary alloc] init];
    
    [map setObject: product.productId forKeyedSubscript: @"productId"];
    [map setObject: product.title forKeyedSubscript: @"title"];
    [map setObject: product.linkUrl.absoluteString forKeyedSubscript: @"linkUrl"];
    [map setObject: product.feature forKeyedSubscript: @"feature"];
    [map setObject: product.cohort forKeyedSubscript: @"cohort"];
    [map setObject: product.imageUrl.absoluteString forKeyedSubscript: @"imageUrl"];
    [map setObject: product.zoomImageUrl.absoluteString forKeyedSubscript: @"zoomImageUrl"];
    [map setObject: product.categoryPath forKeyedSubscript: @"categoryPath"];
    [map setObject: product.productDescription forKeyedSubscript: @"productDescription"];
    [map setObject: product.album forKeyedSubscript: @"album"];
    [map setObject: product.actor forKeyedSubscript: @"actor"];
    [map setObject: product.artist forKeyedSubscript: @"artist"];
    [map setObject: product.author forKeyedSubscript: @"author"];
    [map setObject: product.brand forKeyedSubscript: @"brand"];
    [map setObject: product.available forKeyedSubscript: @"available"];
    [map setObject: product.price forKeyedSubscript: @"price"];
    [map setObject: product.msrp forKeyedSubscript: @"msrp"];
    [map setObject: product.year forKeyedSubscript: @"year"];
    [map setObject: product.customFields forKeyedSubscript: @"customFields"];
    
    return map;
    
}

+ (EMSProduct *)mapToProduct:(NSDictionary *)object {
    
    NSString *productId = @"";
    NSString *title = @"";
    NSString *linkUrl = @"";
    NSString *feature = @"";
    NSString *cohort = @"";
    
    NSString *imageUrl = nil;
    NSString *zoomImageUrl = nil;
    NSString *categoryPath = nil;
    NSString *productDescription = nil;
    NSString *album = nil;
    NSString *actor = nil;
    NSString *artist = nil;
    NSString *author = nil;
    NSString *brand = nil;
    
    NSDictionary<NSString *, NSString *> *customFields = [[NSDictionary alloc] init];
    
    Boolean available = true;
    
    NSNumber *price = 0;
    NSNumber *msrp = 0;
    
    NSNumber *year = 0;
    
    if ([[object objectForKey:@"productId"] isKindOfClass:[NSString class]]){
        productId = [object objectForKey:@"productId"];
    }
    if ([[object objectForKey:@"title"] isKindOfClass:[NSString class]]){
        title = [object objectForKey:@"title"];
    }
    if ([[object objectForKey:@"linkUrl"] isKindOfClass:[NSString class]]){
        linkUrl = [object objectForKey:@"linkUrl"];
    }
    if ([[object objectForKey:@"feature"] isKindOfClass:[NSString class]]){
        feature = [object objectForKey:@"feature"];
    }
    if ([[object objectForKey:@"cohort"] isKindOfClass:[NSString class]]){
        cohort = [object objectForKey:@"cohort"];
    }
    if ([[object objectForKey:@"imageUrl"] isKindOfClass:[NSString class]]){
        imageUrl = [object objectForKey:@"imageUrl"];
    }
    if ([[object objectForKey:@"zoomImageUrl"] isKindOfClass:[NSString class]]){
        zoomImageUrl = [object objectForKey:@"zoomImageUrl"];
    }
    if ([[object objectForKey:@"categoryPath"] isKindOfClass:[NSString class]]){
        categoryPath = [object objectForKey:@"categoryPath"];
    }
    if ([[object objectForKey:@"productDescription"] isKindOfClass:[NSString class]]){
        productDescription = [object objectForKey:@"productDescription"];
    }
    if ([[object objectForKey:@"album"] isKindOfClass:[NSString class]]){
        album = [object objectForKey:@"album"];
    }
    if ([[object objectForKey:@"actor"] isKindOfClass:[NSString class]]){
        actor = [object objectForKey:@"actor"];
    }
    if ([[object objectForKey:@"artist"] isKindOfClass:[NSString class]]){
        artist = [object objectForKey:@"artist"];
    }
    if ([[object objectForKey:@"author"] isKindOfClass:[NSString class]]){
        author = [object objectForKey:@"author"];
    }
    if ([[object objectForKey:@"brand"] isKindOfClass:[NSString class]]){
        brand = [object objectForKey:@"brand"];
    }
    if ([[object objectForKey:@"customFields"] isKindOfClass:[NSDictionary<NSString *, NSString *> class]]){
        customFields = [object objectForKey:@"customFields"];
    }
    if ([[object objectForKey:@"available"] isKindOfClass:[NSNumber class]]){
        available = [[object objectForKey:@"available"] boolValue];
    }
    if ([[object objectForKey:@"price"] isKindOfClass:[NSNumber class]]){
        price = [object objectForKey:@"price"];
    }
    if ([[object objectForKey:@"msrp"] isKindOfClass:[NSNumber class]]){
        msrp = [object objectForKey:@"msrp"];
    }
    if ([[object objectForKey:@"year"] isKindOfClass:[NSNumber class]]){
        year = [object objectForKey:@"year"];
    }
    
    EMSProduct *product = [EMSProduct makeWithBuilder:^(EMSProductBuilder *builder) {
        [builder setRequiredFieldsWithProductId:productId
                                          title:title
                                        linkUrl:[[NSURL alloc] initWithString:linkUrl]
                                        feature:feature
                                         cohort:cohort];
        [builder setCustomFields:customFields];
        [builder setImageUrl:[[NSURL alloc] initWithString:imageUrl]];
        [builder setZoomImageUrl:[[NSURL alloc] initWithString:zoomImageUrl]];
        [builder setCategoryPath:categoryPath];
        [builder setAvailable:[NSNumber numberWithBool:available]];
        [builder setProductDescription:productDescription];
        [builder setPrice:price];
        [builder setMsrp:msrp];
        [builder setAlbum:album];
        [builder setActor:actor];
        [builder setArtist:artist];
        [builder setAuthor:author];
        [builder setBrand:brand];
        [builder setYear:year];
    }];
    
    return product;
}

+(NSArray<EMSRecommendationFilter *> *)mapToRecommendationFilter:(NSDictionary *)map {
    NSString *type = @"";
    NSString *field = @"";
    NSString *comparison = @"";
    NSString *expectation = @"";
    NSMutableArray<NSString *> *expectations = [NSMutableArray array];
    
    if ([map objectForKey:@"type"]) {
        type = [map objectForKey:@"type"];
    }
    if ([map objectForKey:@"field"]) {
        field = [map objectForKey:@"field"];
    }
    if ([map objectForKey:@"comparison"]) {
        comparison = [map objectForKey:@"comparison"];
    }
    
    if ([[map objectForKey:@"expectations"] isKindOfClass:[NSString class]]) {
        expectation = [map objectForKey:@"expectations"];
    } else if ([[map objectForKey:@"expectations"] isKindOfClass:[NSArray class]]) {
        NSArray *expArray = [map mutableArrayValueForKey: @"expectations"];
        for (NSString *item in expArray) {
            [expectations addObject:item];
        }
    }
    
    EMSRecommendationFilter *filter = [[EMSRecommendationFilter alloc] init];
    
    if ([type caseInsensitiveCompare:@"include"] == NSOrderedSame) {
        if ([comparison caseInsensitiveCompare:@"IS"] == NSOrderedSame) {
            filter = [EMSRecommendationFilter includeFilterWithField:(field) isValue: (expectation)];
        }
        else if ([comparison caseInsensitiveCompare:@"IN"] == NSOrderedSame) {
            filter = [EMSRecommendationFilter includeFilterWithField:(field) inValues: (expectations)];
        }
        else if ([comparison caseInsensitiveCompare:@"HAS"] == NSOrderedSame) {
            filter = [EMSRecommendationFilter includeFilterWithField:(field) hasValue: (expectation)];
        }
        else if ([comparison caseInsensitiveCompare:@"OVERLAPS"] == NSOrderedSame) {
            filter = [EMSRecommendationFilter includeFilterWithField:(field) overlapsValues: (expectations)];
        }
        else {
            NSLog(@"Not correct comparison value!");
        }
    }
    else if ([type caseInsensitiveCompare:@"exclude"] == NSOrderedSame) {
        if ([comparison caseInsensitiveCompare:@"IS"] == NSOrderedSame) {
            filter = [EMSRecommendationFilter excludeFilterWithField:(field) isValue: (expectation)];
        }
        else if ([comparison caseInsensitiveCompare:@"IN"] == NSOrderedSame) {
            filter = [EMSRecommendationFilter excludeFilterWithField:(field) inValues: (expectations)];
        }
        else if ([comparison caseInsensitiveCompare:@"HAS"] == NSOrderedSame) {
            filter = [EMSRecommendationFilter excludeFilterWithField:(field) hasValue: (expectation)];
        }
        else if ([comparison caseInsensitiveCompare:@"OVERLAPS"] == NSOrderedSame) {
            filter = [EMSRecommendationFilter excludeFilterWithField:(field) overlapsValues: (expectations)];
        }
        else {
            NSLog(@"Not correct comparison value!");
        }
    } else {
        NSLog(@"Not correct type");
    }
    
    NSMutableArray<EMSRecommendationFilter *> *filters = [NSMutableArray array];
    
    if (filter != nil) {
        [filters addObject: filter];
    }
    
    return filters;
}

+ (NSMutableDictionary *)convertMessageToMap:(EMSMessage *)message {
    
    NSMutableDictionary<NSString *, NSObject *> *map = [[NSMutableDictionary alloc] init];
    
    [map setObject: message.id forKey: @"messageId"];
    [map setObject: message.campaignId forKey: @"campaignId"];
    [map setObject: message.collapseId ?: @"" forKey: @"collapseId"];
    [map setObject: message.title forKey: @"title"];
    [map setObject: message.body forKey: @"body"];
    [map setObject: message.imageUrl ?: @"" forKey: @"imageUrl"];
    [map setObject: message.receivedAt forKey: @"receivedAt"];
    [map setObject: message.updatedAt ?: @"" forKey: @"updatedAt"];
    [map setObject: message.expiresAt ?: @"" forKey: @"expiresAt"];
    [map setObject: message.tags ?: @"" forKey: @"tags"];
    [map setObject: message.properties ?: @"" forKey: @"properties"];
    
    return map;
}

+ (NSMutableDictionary *)convertGeofenceToMap:(EMSGeofence *)geofence {
    
    NSMutableDictionary<NSString *, NSObject *> *map = [[NSMutableDictionary alloc] init];
    
    [map setObject: geofence.id forKey: @"geofenceId"];
    [map setObject: @(geofence.lat) forKey: @"lat"];
    [map setObject: @(geofence.lon) forKey: @"lon"];
    [map setObject: @(geofence.r) forKey: @"r"];
    [map setObject: @(geofence.waitInterval) forKey: @"waitInterval"];
    
    NSMutableArray *recTriggers = [NSMutableArray array];
    for (EMSGeofenceTrigger *trigger in geofence.triggers) {
        NSMutableDictionary<NSString *, NSString *> *recTrigger = [MapUtil convertGeofenceTriggerToMap:trigger];
        [recTriggers addObject:recTrigger];
    }
    [map setObject: recTriggers forKey: @"triggers"];
    
    return map;
}

+ (NSMutableDictionary *)convertGeofenceTriggerToMap:(EMSGeofenceTrigger *)trigger {
    
    NSMutableDictionary<NSString *, NSObject *> *map = [[NSMutableDictionary alloc] init];
    
    [map setObject: trigger.id forKey: @"triggerId"];
    [map setObject: trigger.type forKey: @"type"];
    [map setObject: @(trigger.loiteringDelay) forKey: @"loiteringDelay"];
    [map setObject: trigger.action forKey: @"action"];
    
    return map;
}

@end
