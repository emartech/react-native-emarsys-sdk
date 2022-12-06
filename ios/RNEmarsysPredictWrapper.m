#import "RNEmarsysPredictWrapper.h"

#import "Emarsys.h"
#import "EMSCartItem.h"
#import "EMSProduct.h"
#import "EMSProduct+Emarsys.h"
#import "EMSProductBuilder.h"
#import "EMSLogic.h"
#import "EMSRecommendationFilter.h"

#import "LogicParser.h"

@implementation RNEmarsysPredictWrapper

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(trackCart:(NSArray * _Nonnull)cartItems resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSArray<EMSCartItem *> *items = [self arrayToCartList:cartItems];
        [Emarsys.predict trackCartWithCartItems:[items copy]];
        resolve([NSNumber numberWithBool:YES]);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(trackPurchase:(NSString * _Nonnull)orderId items:(NSArray * _Nonnull)cartItems
                  resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSArray<EMSCartItem *> *items = [self arrayToCartList:cartItems];
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

RCT_EXPORT_METHOD(trackTag:(NSString * _Nonnull)tag withAttributes:(NSDictionary * _Nullable)attributes
                  resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        [Emarsys.predict trackTag:tag withAttributes:attributes];
        resolve([NSNumber numberWithBool:YES]);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(recommendProducts:(NSString * _Nonnull)logic logicOptions:(NSDictionary * _Nullable)logicOptions recommendationOptions:(NSDictionary * _Nullable)recommendationOptions
                  resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        EMSLogic *recLogic = [self parseLogic:logic options:logicOptions];
        
        NSString *availabilityZone = [recommendationOptions valueForKey:@"availabilityZone"];
        NSNumber *limit = @([[recommendationOptions valueForKey:@"limit"] intValue]);
        NSArray *filters = [self arrayToRecommendationFilters:[recommendationOptions objectForKey:@"filters"]];
        
        [Emarsys.predict recommendProductsWithLogic:recLogic filters:filters limit:limit availabilityZone:availabilityZone
                                      productsBlock:^(NSArray<EMSProduct * >* products, NSError *error) {
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
        NSArray<EMSCartItem *> *items = [self arrayToCartList:cartItems];
        EMSLogic *recLogic = [LogicParser parseLogic:logic cartItems:[items copy]];
        [Emarsys.predict recommendProductsWithLogic:recLogic productsBlock:^(NSArray<EMSProduct *> *products, NSError *error) {
            [self resolveProducts:products resolver:resolve rejecter:reject methodName:@"recommendProductsCartItems" withError:error];
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(recommendProductsVariants :(NSString * _Nonnull)logic variants:(NSArray * _Nonnull)variants resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        EMSLogic *recLogic = [LogicParser parseLogic:logic variants:[variants copy]];
        [Emarsys.predict recommendProductsWithLogic:recLogic productsBlock:^(NSArray<EMSProduct *> *products, NSError *error) {
            [self resolveProducts:products resolver:resolve rejecter:reject methodName:@"recommendProductsVariants" withError:error];
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
        NSArray<EMSCartItem *> *items = [self arrayToCartList:cartItems];
        EMSLogic *recLogic = [LogicParser parseLogic:logic cartItems:[items copy]];
        [Emarsys.predict recommendProductsWithLogic:recLogic limit:limit productsBlock:^(NSArray<EMSProduct *> *products, NSError *error) {
            [self resolveProducts:products resolver:resolve rejecter:reject methodName:@"recommendProductsCartItemsLimit" withError:error];
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(recommendProductsVariantsLimit:(NSString * _Nonnull)logic variants:(NSArray * _Nonnull)variants limit:(NSNumber * _Nonnull)limit resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        EMSLogic *recLogic = [LogicParser parseLogic:logic variants:[variants copy]];
        [Emarsys.predict recommendProductsWithLogic:recLogic limit:limit productsBlock:^(NSArray<EMSProduct *> *products, NSError *error) {
            [self resolveProducts:products resolver:resolve rejecter:reject methodName:@"recommendProductsVariantsLimit" withError:error];
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(recommendProductsFilters:(NSString * _Nonnull)logic filters:(NSDictionary * _Nonnull)filters resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        EMSLogic *recLogic = [LogicParser parseLogic:logic];
        NSArray<EMSRecommendationFilter *> *recFilters = [self mapToRecommendationFilter:filters];
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
        NSArray<EMSRecommendationFilter *> *recFilters = [self mapToRecommendationFilter:filters];
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
        NSArray<EMSCartItem *> *items = [self arrayToCartList:cartItems];
        EMSLogic *recLogic = [LogicParser parseLogic:logic cartItems:[items copy]];
        NSArray<EMSRecommendationFilter *> *recFilters = [self mapToRecommendationFilter:filters];
        [Emarsys.predict recommendProductsWithLogic:recLogic filters:recFilters productsBlock:^(NSArray<EMSProduct *> *products, NSError *error) {
            [self resolveProducts:products resolver:resolve rejecter:reject methodName:@"recommendProductsCartItemsFilters" withError:error];
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(recommendProductsVariantsFilters:(NSString * _Nonnull)logic variants:(NSArray * _Nonnull)variants filters:(NSDictionary * _Nonnull)filters resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        EMSLogic *recLogic = [LogicParser parseLogic:logic variants:[variants copy]];
        NSArray<EMSRecommendationFilter *> *recFilters = [self mapToRecommendationFilter:filters];
        [Emarsys.predict recommendProductsWithLogic:recLogic filters:recFilters productsBlock:^(NSArray<EMSProduct *> *products, NSError *error) {
            [self resolveProducts:products resolver:resolve rejecter:reject methodName:@"recommendProductsVariantsFilters" withError:error];
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(recommendProductsLimitFilters:(NSString * _Nonnull)logic limit:(NSNumber * _Nonnull)limit filters:(NSDictionary * _Nonnull)filters resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        EMSLogic *recLogic = [LogicParser parseLogic:logic];
        NSArray<EMSRecommendationFilter *> *recFilters = [self mapToRecommendationFilter:filters];
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
        NSArray<EMSRecommendationFilter *> *recFilters = [self mapToRecommendationFilter:filters];
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
        NSArray<EMSCartItem *> *items = [self arrayToCartList:cartItems];
        EMSLogic *recLogic = [LogicParser parseLogic:logic cartItems:[items copy]];
        NSArray<EMSRecommendationFilter *> *recFilters = [self mapToRecommendationFilter:filters];
        [Emarsys.predict recommendProductsWithLogic:recLogic filters:recFilters limit:limit productsBlock:^(NSArray<EMSProduct *> *products, NSError *error) {
            [self resolveProducts:products resolver:resolve rejecter:reject methodName:@"recommendProductsCartItemsLimitFilters" withError:error];
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(recommendProductsVariantsLimitFilters:(NSString * _Nonnull)logic variants:(NSArray * _Nonnull)variants limit:(NSNumber * _Nonnull)limit filters:(NSDictionary * _Nonnull)filters resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        EMSLogic *recLogic = [LogicParser parseLogic:logic variants:[variants copy]];
        NSArray<EMSRecommendationFilter *> *recFilters = [self mapToRecommendationFilter:filters];
        [Emarsys.predict recommendProductsWithLogic:recLogic filters:recFilters limit:limit productsBlock:^(NSArray<EMSProduct *> *products, NSError *error) {
            [self resolveProducts:products resolver:resolve rejecter:reject methodName:@"recommendProductsVariantsLimitFilters" withError:error];
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(trackRecommendationClick:(NSDictionary * _Nonnull)product resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        EMSProduct *items = [self mapToProduct:product];
        [Emarsys.predict trackRecommendationClick:items];
        resolve([NSNumber numberWithBool:YES]);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

- (NSArray<EMSCartItem *> *)arrayToCartList:(NSArray *)array {
    
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

- (EMSLogic *)parseLogic:(NSString *)logic options:(NSDictionary * _Nullable)options {
    NSString *query = [options valueForKey:@"query"];
    NSArray *cartItems = [options objectForKey:@"cartItems"];
    NSArray *variants = [options objectForKey:@"variants"];
    
    if ([logic isEqualToString:@"SEARCH"]) {
        if (query) { return [EMSLogic searchWithSearchTerm:query]; }
        return EMSLogic.search;
    }
    else if ([logic isEqualToString:@"CART"]) {
        if (cartItems) { return [EMSLogic cartWithCartItems:[self arrayToCartList:cartItems]]; }
        return EMSLogic.cart;
    }
    else if ([logic isEqualToString:@"RELATED"]) {
        if (query) { return [EMSLogic relatedWithViewItemId:query]; }
        return EMSLogic.related;
    }
    else if ([logic isEqualToString:@"CATEGORY"]) {
        if (query) { return [EMSLogic categoryWithCategoryPath:query]; }
        return EMSLogic.category;
    }
    else if ([logic isEqualToString:@"ALSO_BOUGHT"]) {
        if (query) { return [EMSLogic alsoBoughtWithViewItemId:query]; }
        return EMSLogic.alsoBought;
    }
    else if ([logic isEqualToString:@"POPULAR"]) {
        if (query) { return [EMSLogic popularWithCategoryPath:query]; }
        return EMSLogic.popular;
    }
    else if ([logic isEqualToString:@"HOME"]) {
        if (variants) { return [EMSLogic homeWithVariants:variants]; }
        return EMSLogic.home;
    }
    else if ([logic isEqualToString:@"PERSONAL"]) {
        if (variants) { return [EMSLogic personalWithVariants:variants]; }
        return EMSLogic.personal;
    }
    else {
        return EMSLogic.search;
    }
}

- (NSArray<EMSRecommendationFilter *> *)arrayToRecommendationFilters:(NSArray *)array {
    if (!array) { return nil; };
    
    NSMutableArray<EMSRecommendationFilter *> *filters = [NSMutableArray array];
    
    for (NSDictionary *map in array) {
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
        
        EMSRecommendationFilter *filter = nil;
        
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
        
        if (filter) {
            [filters addObject:filter];
        }
    }
    
    return filters;
}

- (void)resolveProducts:(NSArray * _Nonnull)products resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject
             methodName: (NSString *) methodName withError: (NSError *) error {
    if (products) {
        NSMutableArray *recProducts = [NSMutableArray array];
        for (EMSProduct *product in products) {
            NSMutableDictionary<NSString *, NSString *> *recProduct = [self convertProductToMap:product];
            [recProducts addObject:recProduct];
        }
        resolve(recProducts);
    } else {
        reject(@"RNEmarsysWrapper", [NSString stringWithFormat:@"%@", methodName], error);
    }
}

- (NSMutableDictionary *)convertProductToMap:(EMSProduct *)product {
    
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

- (EMSProduct *)mapToProduct:(NSDictionary *)object {
    
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

- (NSArray<EMSRecommendationFilter *> *)mapToRecommendationFilter:(NSDictionary *)map {
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

@end
