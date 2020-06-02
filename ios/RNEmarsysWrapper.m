
#import "Emarsys.h"
#import "EMSCartItem.h"

#import "EMSProduct.h"
#import "EMSProduct+Emarsys.h"
#import "EMSProductBuilder.h"

#import "EMSEventHandler.h"
#import "EMSInAppProtocol.h"

#import "EMSLogic.h"
#import "EMSRecommendationFilter.h"

#import "RNEmarsysWrapper.h"

@implementation NSMutableDictionary (JSONString)

- (NSString*) jsonStringWithPrettyPrint:(BOOL) prettyPrint {
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:self
                                                       options:(NSJSONWritingOptions)    (prettyPrint ? NSJSONWritingPrettyPrinted : 0)
                                                         error:&error];
    
    if (! jsonData) {
        NSLog(@"error");
        return @"{}";
    } else {
        return [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    }
}

@end

@implementation NSArray (JSONString)

- (NSString*) jsonStringWithPrettyPrint:(BOOL) prettyPrint {
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:self
                                                       options:(NSJSONWritingOptions) (prettyPrint ? NSJSONWritingPrettyPrinted : 0)
                                                         error:&error];
    
    if (! jsonData) {
        return @"[]";
    } else {
        return [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    }
}

@end

@implementation ArrayUtil

+ (NSArray<EMSCartItem *> *)arrayToCartList:(NSArray *)array {
    
    NSMutableArray<EMSCartItem *> *items = [NSMutableArray array];
    
    for (NSDictionary *i in array) {
        if ([i isKindOfClass:[NSDictionary class]]) {
            NSString *itemId = @"";
            double price = 0.0;
            double quantity = 0.0;
            
            if ([[i objectForKey:@"itemId"] isKindOfClass:[NSString class]]){
                itemId = [i objectForKey:@"itemId"];
            }
            if ([[i objectForKey:@"price"] isKindOfClass:[NSNumber class]]){
                price = [[i objectForKey:@"price"] doubleValue];
            }
            if ([[i objectForKey:@"quantity"] isKindOfClass:[NSNumber class]]){
                quantity = [[i objectForKey:@"quantity"] doubleValue];
            }
            
            id item = [[EMSCartItem alloc] initWithItemId:itemId price:price quantity:quantity];
            [items addObject:item];
        }
    }
    return items;
}

@end


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


@implementation LogicParser

+(EMSLogic *)parseLogic:(NSString *)logic {
    EMSLogic *recommendedLogic;
    
    if([logic isEqualToString:@"CART"]) {
        recommendedLogic = EMSLogic.cart;
    }
    else if([logic isEqualToString:@"RELATED"]) {
        recommendedLogic = EMSLogic.related;
    }
    else if([logic isEqualToString:@"CATEGORY"]) {
        recommendedLogic = EMSLogic.category;
    }
    else if([logic isEqualToString:@"ALSO_BOUGHT"]) {
        recommendedLogic = EMSLogic.alsoBought;
    }
    else if([logic isEqualToString:@"POPULAR"]) {
        recommendedLogic = EMSLogic.popular;
    }
    
    return recommendedLogic;
}

+(EMSLogic *)parseLogic:(NSString *)logic cartItems:(NSArray *)cartItems  {
    EMSLogic *recommendedLogic;
    
    if([logic isEqualToString:@"CART"]) {
        NSArray<EMSCartItem *> *items = [ArrayUtil arrayToCartList:cartItems];
        recommendedLogic = [EMSLogic cartWithCartItems:[items copy]];
    }
    
    else if([logic isEqualToString:@"RELATED"]) {
        recommendedLogic = EMSLogic.related;
    }
    
    return recommendedLogic;
}

+(EMSLogic *)parseLogic:(NSString *)logic query:(NSString *)query  {
    EMSLogic *recommendedLogic;
    
    if([logic isEqualToString:@"SEARCH"]) {
        recommendedLogic = [EMSLogic searchWithSearchTerm:query];
    }
    else if([logic isEqualToString:@"RELATED"]) {
        recommendedLogic = [EMSLogic relatedWithViewItemId:query];
    }
    else if([logic isEqualToString:@"CATEGORY"]) {
        recommendedLogic = [EMSLogic categoryWithCategoryPath:query];
    }
    else if([logic isEqualToString:@"ALSO_BOUGHT"]) {
        recommendedLogic = [EMSLogic alsoBoughtWithViewItemId:query];
    }
    else if([logic isEqualToString:@"POPULAR"]) {
        recommendedLogic = [EMSLogic popularWithCategoryPath:query];
    } else {
        recommendedLogic = [EMSLogic searchWithSearchTerm:query];
    }
    
    return recommendedLogic;
}

@end


@implementation RNEmarsysWrapper

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

- (void)resolveProducts:(NSArray * _Nonnull)products resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject methodName: (NSString *) methodName withError: (NSError *) error {
    if (products) {
		NSMutableArray *recProducts = [NSMutableArray array];
        for (EMSProduct *product in products) {
            NSMutableDictionary<NSString *, NSString *> *recProduct = [MapUtil convertProductToMap:product];
            [recProduct jsonStringWithPrettyPrint:true];
            [recProducts addObject:recProduct];
        }
        resolve(recProducts);
    } else {
        reject(@"RNEmarsysWrapper", [NSString stringWithFormat:@"%@", methodName], error);
    }
}

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(setContact:(NSString * _Nonnull)contactFieldValue resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject ) {
    @try {
        [Emarsys setContactWithContactFieldValue:contactFieldValue completionBlock:^(NSError *error) {
            if (NULL != error) {
                reject(@"RNEmarsysWrapper", @"setContact: ", error);
            } else {
                resolve([NSNumber numberWithBool:YES]);
            }
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(clearContact:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        [Emarsys clearContactWithCompletionBlock:^(NSError *error) {
            if (NULL != error) {
                reject(@"RNEmarsysWrapper", @"clearContact: ", error);
            } else {
                resolve([NSNumber numberWithBool:YES]);
            }
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(trackCustomEvent:(NSString * _Nonnull)eventName eventAttributes:(NSDictionary * _Nullable)eventAttributes resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject ) {
    @try {
        [Emarsys trackCustomEventWithName:eventName eventAttributes:eventAttributes completionBlock:^(NSError *error) {
            if (NULL != error) {
                reject(@"RNEmarsysWrapper", @"trackCustomEvent: ", error);
            } else {
                resolve([NSNumber numberWithBool:YES]);
            }
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(setPushToken:(NSData * _Nonnull)deviceToken resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject ) {
    @try {
        [Emarsys.push setPushToken:deviceToken completionBlock:^(NSError *error) {
            if (NULL != error) {
                reject(@"RNEmarsysWrapper", @"setPushToken: ", error);
            } else {
                resolve([NSNumber numberWithBool:YES]);
            }
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(clearPushToken:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject ) {
    @try {
        [Emarsys.push clearPushTokenWithCompletionBlock:^(NSError *error) {
            if (NULL != error) {
                reject(@"RNEmarsysWrapper", @"clearPushToken: ", error);
            } else {
                resolve([NSNumber numberWithBool:YES]);
            }
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(trackMessageOpen:(NSString * _Nonnull)messageId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject ) {
    @try {
        NSDictionary *userData = @{@"sid":messageId};
        NSDictionary *userInfo = @{@"u": userData};
        
        [Emarsys.push trackMessageOpenWithUserInfo:userInfo completionBlock:^(NSError *error) {
            if (NULL != error) {
                reject(@"RNEmarsysWrapper", @"trackMessageOpen: ", error);
            } else {
                resolve([NSNumber numberWithBool:YES]);
            }
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(pause:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject ) {
    @try {
        [Emarsys.inApp pause];
        resolve([NSNumber numberWithBool:YES]);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(resume:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject ) {
    @try {
        [Emarsys.inApp resume];
        resolve([NSNumber numberWithBool:YES]);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(setEventHandler:(RCTResponseSenderBlock)callback) {
    [Emarsys.inApp setEventHandler:self];
        
    self.handlerBlock = ^(NSString *eventName, NSDictionary<NSString *,NSObject *> *payload) {
        callback(@[eventName, payload]);
    };
}

RCT_EXPORT_METHOD(trackCart:(NSArray * _Nonnull)cartItems resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSArray<EMSCartItem *> *items = [ArrayUtil arrayToCartList:cartItems];
        [Emarsys.predict trackCartWithCartItems:[items copy]];
        resolve([NSNumber numberWithBool:YES]);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(trackPurchase:(NSString * _Nonnull)orderId items:(NSArray * _Nonnull)cartItems resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSArray<EMSCartItem *> *items = [ArrayUtil arrayToCartList:cartItems];
        [Emarsys.predict trackPurchaseWithOrderId:orderId items:[items copy]];
        resolve([NSNumber numberWithBool:YES]);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(trackItemView:(NSString * _Nonnull)itemId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        [Emarsys.predict trackItemViewWithItemId:itemId];
        resolve([NSNumber numberWithBool:YES]);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(trackCategoryView:(NSString * _Nonnull)categoryPath resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        [Emarsys.predict trackCategoryViewWithCategoryPath:categoryPath];
        resolve([NSNumber numberWithBool:YES]);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(trackSearchTerm:(NSString * _Nonnull)searchTerm resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        [Emarsys.predict trackSearchWithSearchTerm:searchTerm];
        resolve([NSNumber numberWithBool:YES]);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(trackTag:(NSString * _Nonnull)tag withAttributes:(NSDictionary * _Nullable)attributes resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        [Emarsys.predict trackTag:tag withAttributes:attributes];
        resolve([NSNumber numberWithBool:YES]);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}


RCT_EXPORT_METHOD(recommendProducts:(NSString * _Nonnull)logic resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        EMSLogic *recLogic = [LogicParser parseLogic:logic];
        [Emarsys.predict recommendProductsWithLogic:recLogic productsBlock:^(NSArray<EMSProduct * >* products, NSError *error) {
            [self resolveProducts:products resolver:resolve rejecter:reject methodName:@"recommendProducts" withError:error];
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(recommendProductsQuery:(NSString * _Nonnull)logic query:(NSString * _Nonnull)query resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        EMSLogic *recLogic = [LogicParser parseLogic:logic query:query];
        [Emarsys.predict recommendProductsWithLogic:recLogic productsBlock:^(NSArray<EMSProduct * >* products, NSError *error) {
            [self resolveProducts:products resolver:resolve rejecter:reject methodName:@"recommendProductsQuery" withError:error];
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(recommendProductsCartItems:(NSString * _Nonnull)logic cartItems:(NSArray * _Nonnull)cartItems resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSArray<EMSCartItem *> *items = [ArrayUtil arrayToCartList:cartItems];
        EMSLogic *recLogic = [LogicParser parseLogic:logic cartItems:[items copy]];
        [Emarsys.predict recommendProductsWithLogic:recLogic productsBlock:^(NSArray<EMSProduct *> *products, NSError *error) {
            [self resolveProducts:products resolver:resolve rejecter:reject methodName:@"recommendProductsCartItems" withError:error];
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(recommendProductsLimit:(NSString * _Nonnull)logic limit:(NSNumber * _Nonnull)limit resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        EMSLogic *recLogic = [LogicParser parseLogic:logic];
        [Emarsys.predict recommendProductsWithLogic:recLogic limit:limit productsBlock:^(NSArray<EMSProduct *> *products, NSError *error) {
            [self resolveProducts:products resolver:resolve rejecter:reject methodName:@"recommendProductsLimit" withError:error];
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(recommendProductsQueryLimit:(NSString * _Nonnull)logic query:(NSString * _Nonnull)query limit:(NSNumber * _Nonnull)limit resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        EMSLogic *recLogic = [LogicParser parseLogic:logic query:query ];
        [Emarsys.predict recommendProductsWithLogic:recLogic limit:limit productsBlock:^(NSArray<EMSProduct *> *products, NSError *error) {
            [self resolveProducts:products resolver:resolve rejecter:reject methodName:@"recommendProductsQueryLimit" withError:error];
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(recommendProductsCartItemsLimit:(NSString * _Nonnull)logic cartItems:(NSArray * _Nonnull)cartItems limit:(NSNumber * _Nonnull)limit resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSArray<EMSCartItem *> *items = [ArrayUtil arrayToCartList:cartItems];
        EMSLogic *recLogic = [LogicParser parseLogic:logic cartItems:[items copy]];
        [Emarsys.predict recommendProductsWithLogic:recLogic limit:limit productsBlock:^(NSArray<EMSProduct *> *products, NSError *error) {
            [self resolveProducts:products resolver:resolve rejecter:reject methodName:@"recommendProductsCartItemsLimit" withError:error];
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(recommendProductsFilters:(NSString * _Nonnull)logic filters:(NSDictionary * _Nonnull)filters resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        EMSLogic *recLogic = [LogicParser parseLogic:logic];
        NSArray<EMSRecommendationFilter *> *recFilters = [MapUtil mapToRecommendationFilter:filters];
        [Emarsys.predict recommendProductsWithLogic:recLogic filters:recFilters productsBlock:^(NSArray<EMSProduct *> *products, NSError *error) {
            [self resolveProducts:products resolver:resolve rejecter:reject methodName:@"recommendProductsFilters" withError:error];
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(recommendProductsQueryFilters:(NSString * _Nonnull)logic query:(NSString * _Nonnull)query filters:(NSDictionary * _Nonnull)filters resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        EMSLogic *recLogic = [LogicParser parseLogic:logic query:query ];
        NSArray<EMSRecommendationFilter *> *recFilters = [MapUtil mapToRecommendationFilter:filters];
        [Emarsys.predict recommendProductsWithLogic:recLogic filters:recFilters productsBlock:^(NSArray<EMSProduct *> *products, NSError *error) {
            [self resolveProducts:products resolver:resolve rejecter:reject methodName:@"recommendProductsQueryFilters" withError:error];
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(recommendProductsCartItemsFilters:(NSString * _Nonnull)logic cartItems:(NSArray * _Nonnull)cartItems filters:(NSDictionary * _Nonnull)filters resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSArray<EMSCartItem *> *items = [ArrayUtil arrayToCartList:cartItems];
        EMSLogic *recLogic = [LogicParser parseLogic:logic cartItems:[items copy]];
        NSArray<EMSRecommendationFilter *> *recFilters = [MapUtil mapToRecommendationFilter:filters];
        [Emarsys.predict recommendProductsWithLogic:recLogic filters:recFilters productsBlock:^(NSArray<EMSProduct *> *products, NSError *error) {
            [self resolveProducts:products resolver:resolve rejecter:reject methodName:@"recommendProductsCartItemsFilters" withError:error];
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(recommendProductsLimitFilters:(NSString * _Nonnull)logic limit:(NSNumber * _Nonnull)limit filters:(NSDictionary * _Nonnull)filters resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        EMSLogic *recLogic = [LogicParser parseLogic:logic];
        NSArray<EMSRecommendationFilter *> *recFilters = [MapUtil mapToRecommendationFilter:filters];
        [Emarsys.predict recommendProductsWithLogic:recLogic filters:recFilters limit:limit productsBlock:^(NSArray<EMSProduct *> *products, NSError *error) {
            [self resolveProducts:products resolver:resolve rejecter:reject methodName:@"recommendProductsLimitFilters" withError:error];
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(recommendProductsQueryLimitFilters:(NSString * _Nonnull)logic query:(NSString * _Nonnull)query limit:(NSNumber * _Nonnull)limit filters:(NSDictionary * _Nonnull)filters resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        EMSLogic *recLogic = [LogicParser parseLogic:logic query:query ];
        NSArray<EMSRecommendationFilter *> *recFilters = [MapUtil mapToRecommendationFilter:filters];
        [Emarsys.predict recommendProductsWithLogic:recLogic filters:recFilters limit:limit productsBlock:^(NSArray<EMSProduct *> *products, NSError *error) {
            [self resolveProducts:products resolver:resolve rejecter:reject methodName:@"recommendProductsQueryLimitFilters" withError:error];
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(recommendProductsCartItemsLimitFilters:(NSString * _Nonnull)logic cartItems:(NSArray * _Nonnull)cartItems limit:(NSNumber * _Nonnull)limit filters:(NSDictionary * _Nonnull)filters resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSArray<EMSCartItem *> *items = [ArrayUtil arrayToCartList:cartItems];
        EMSLogic *recLogic = [LogicParser parseLogic:logic cartItems:[items copy]];
        NSArray<EMSRecommendationFilter *> *recFilters = [MapUtil mapToRecommendationFilter:filters];
        [Emarsys.predict recommendProductsWithLogic:recLogic filters:recFilters limit:limit productsBlock:^(NSArray<EMSProduct *> *products, NSError *error) {
            [self resolveProducts:products resolver:resolve rejecter:reject methodName:@"recommendProductsCartItemsLimitFilters" withError:error];
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(trackRecommendationClick:(NSDictionary * _Nonnull)product resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        EMSProduct *items = [MapUtil mapToProduct:product];
        [Emarsys.predict trackRecommendationClick:items];
        resolve([NSNumber numberWithBool:YES]);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(trackDeepLink:(NSString * _Nullable)userActivity resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        if ( userActivity != nil ) {
            NSUserActivity* activity = [[NSUserActivity alloc] initWithActivityType:NSUserActivityTypeBrowsingWeb];
            NSURL *activityURL = [NSURL URLWithString:userActivity];
            @try {
                activity.webpageURL = activityURL;
                
                [Emarsys trackDeepLinkWithUserActivity:activity sourceHandler:^(NSString *source) {
                    NSLog(@"trackDeepLink. Source url: %@", source);
                    resolve([NSNumber numberWithBool:YES]);
                }];
            }
            @catch (NSException *ex) {
                NSLog(@"RNEmarsysWrapper trackDeepLink: %@ %@", ex.name, ex.reason);
            }
        }
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(changeApplicationCode:(NSString * _Nullable)applicationCode customerFieldId:(NSNumber * _Nullable)customerFieldId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject ) {
    @try {
        [Emarsys.config changeApplicationCode:applicationCode
                               contactFieldId:customerFieldId
                              completionBlock:^(NSError *error) {
            if (NULL != error) {
                reject(@"RNEmarsysWrapper", @"changeApplicationCode: ", error);
            } else {
                resolve([NSNumber numberWithBool:YES]);
            }
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(changeMerchantId:(NSString * _Nullable)merchantId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject ) {
    @try {
        [Emarsys.config changeMerchantId:merchantId ];
        resolve([NSNumber numberWithBool:YES]);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(getApplicationCode:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject ) {
    @try {
        NSString *applicationCode = [Emarsys.config applicationCode];
        resolve(applicationCode);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(getMerchantId:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSString *merchantId = [Emarsys.config merchantId];
        resolve(merchantId);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(getContactFieldId:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSNumber *contactFieldId = [Emarsys.config contactFieldId];
        resolve(contactFieldId);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

@end
