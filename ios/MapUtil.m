#import "Emarsys.h"
#import "EMSCartItem.h"

#import "EMSLogic.h"
#import "EMSRecommendationFilter.h"
#import "EMSProduct.h"
#import "EMSProduct+Emarsys.h"
#import "EMSProductBuilder.h"

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
    [map setObject: product.price forKeyedSubscript: @"price"];
    [map setObject: product.msrp forKeyedSubscript: @"msrp"];
    [map setObject: product.year forKeyedSubscript: @"year"];
    
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
    NSMutableArray<EMSRecommendationFilter *> *filters = [NSMutableArray array];
    NSString *type = @"";
    NSString *field = @"";
    NSString *comprasion = @"";
    NSString *expectation = @"";
    
    NSMutableArray<NSString *> *expectations = [NSMutableArray array];
    
    EMSRecommendationFilter *filter = [[EMSRecommendationFilter alloc] init];
    
    if ([map objectForKey:@"type"]) {
        type = [map objectForKey:@"type"];
    }
    else if ([map objectForKey:@"field"]) {
        type = [map objectForKey:@"field"];
    }
    else if ([map objectForKey:@"comprasion"]) {
        type = [map objectForKey:@"comprasion"];
    }
    
    if ([map objectForKey:@"expectations"] && [[map objectForKey:@"expectations"] isMemberOfClass:[NSArray class]]) {
        NSArray *expArray = [map mutableArrayValueForKey: @"expectations"];
        for (NSString *item in expArray) {
            expectation = item;
            [expectations addObject:item];
        }
    }
    
    if ([map objectForKey:@"expectations"] && [[map objectForKey:@"expectations"] isMemberOfClass:[NSArray class]]) {
        NSArray *expArray = [map mutableArrayValueForKey: @"expectations"];
        for (NSString *item in expArray) {
            expectation = item;
            [expectations addObject:item];
        }
    }
    
    if ([type caseInsensitiveCompare:@"include"]) {
        if ([comprasion caseInsensitiveCompare:@"IS"]) {
            filter = [EMSRecommendationFilter includeFilterWithField:(field) isValue: (expectation)];
        }
        else if ([comprasion caseInsensitiveCompare:@"IN"]) {
            filter = [EMSRecommendationFilter includeFilterWithField:(field) inValues: (expectations)];
        }
        else if ([comprasion caseInsensitiveCompare:@"HAS"]) {
            filter = [EMSRecommendationFilter includeFilterWithField:(field) hasValue: (expectation)];
        }
        else if ([comprasion caseInsensitiveCompare:@"OVERLAPS"]) {
            filter = [EMSRecommendationFilter includeFilterWithField:(field) overlapsValues: (expectations)];
        }
        else {
            NSLog(@"Not correct comparison value!");
        }
    }
    else if ([type caseInsensitiveCompare:@"exclude"]) {
        if ([comprasion caseInsensitiveCompare:@"IS"]) {
            filter = [EMSRecommendationFilter excludeFilterWithField:(field) isValue: (expectation)];
        }
        else if ([comprasion caseInsensitiveCompare:@"IN"]) {
            filter = [EMSRecommendationFilter excludeFilterWithField:(field) inValues: (expectations)];
        }
        else if ([comprasion caseInsensitiveCompare:@"HAS"]) {
            filter = [EMSRecommendationFilter excludeFilterWithField:(field) hasValue: (expectation)];
        }
        else if ([comprasion caseInsensitiveCompare:@"OVERLAPS"]) {
            filter = [EMSRecommendationFilter excludeFilterWithField:(field) overlapsValues: (expectations)];
        }
        else {
            NSLog(@"Not correct comparison value!");
        }
    } else {
        NSLog(@"Not correct type");
    }
    
    if (filter != nil) {
        [filters addObject: filter];
    }
    
    return filters;
}

@end
