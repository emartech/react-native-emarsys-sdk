
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

#import "MapUtil.h"
#import "LogicParser.h"
#import "ArrayUtil.h"

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

static bool hasListeners = NO;
static NSDictionary<NSString *,NSObject *> *_body = nil;

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

RCT_EXPORT_METHOD(setEventHandler) {
    
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

RCT_EXPORT_METHOD(recommendProductsVariantsFilters:(NSString * _Nonnull)logic variants:(NSArray * _Nonnull)variants filters:(NSDictionary * _Nonnull)filters resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        EMSLogic *recLogic = [LogicParser parseLogic:logic variants:[variants copy]];
        NSArray<EMSRecommendationFilter *> *recFilters = [MapUtil mapToRecommendationFilter:filters];
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

RCT_EXPORT_METHOD(recommendProductsVariantsLimitFilters:(NSString * _Nonnull)logic variants:(NSArray * _Nonnull)variants limit:(NSNumber * _Nonnull)limit filters:(NSDictionary * _Nonnull)filters resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        EMSLogic *recLogic = [LogicParser parseLogic:logic variants:[variants copy]];
        NSArray<EMSRecommendationFilter *> *recFilters = [MapUtil mapToRecommendationFilter:filters];
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

RCT_EXPORT_METHOD(changeApplicationCode:(NSString * _Nullable)applicationCode customerFieldId:(nonnull NSNumber *)customerFieldId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject ) {
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

RCT_EXPORT_METHOD(getHardwareId:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSString *hardwareId = [Emarsys.config hardwareId];
        resolve(hardwareId);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(getLanguageCode:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSString *languageCode = [Emarsys.config languageCode];
        resolve(languageCode);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(getSdkVersion:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSString *sdkVersion = [Emarsys.config sdkVersion];
        resolve(sdkVersion);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(getPushToken:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSData *pushTokenData = [Emarsys.push pushToken];
        NSString * pushToken = [self stringWithDeviceToken:pushTokenData];

        resolve(pushToken);
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

- (NSString *)stringWithDeviceToken:(NSData *)deviceToken {
    const char *data = [deviceToken bytes];
    NSMutableString *token = [NSMutableString string];

    for (NSUInteger i = 0; i < [deviceToken length]; i++) {
        [token appendFormat:@"%02.2hhX", data[i]];
    }

    return [token copy];
}

- (void) resolveMessages:(NSArray * _Nonnull)messages resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject methodName: (NSString *) methodName withError: (NSError *) error {
    if (messages) {
        NSMutableArray *recMessages = [NSMutableArray array];
        for (EMSMessage *message in messages) {
            NSMutableDictionary<NSString *, NSString *> *recMessage = [MapUtil convertMessageToMap:message];
            [recMessage jsonStringWithPrettyPrint:true];
            [recMessages addObject:recMessage];
        }
        resolve(recMessages);
    } else {
        reject(@"RNEmarsysWrapper", [NSString stringWithFormat:@"%@", methodName], error);
    }
}

RCT_EXPORT_METHOD(fetchMessages:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        [Emarsys.messageInbox fetchMessagesWithResultBlock:^(EMSInboxResult * _Nullable inboxResult, NSError * _Nullable error) {
            if (NULL != error) {
                reject(@"RNEmarsysWrapper", @"fetchMessages: ", error);
            } else {
                [self resolveMessages:inboxResult.messages resolver:resolve rejecter:reject methodName:@"fetchMessages" withError:error];
            }
        }];
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(addTag:(NSString * _Nonnull)tag messageId:(NSString * _Nonnull)messageId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        [Emarsys.messageInbox addTag:tag forMessage:messageId completionBlock:^(NSError * _Nullable error) {
            if (NULL != error) {
                reject(@"RNEmarsysWrapper", @"addTag: ", error);
            } else {
                resolve([NSNumber numberWithBool:YES]);
            }
        }];
        
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(removeTag:(NSString * _Nonnull)tag messageId:(NSString * _Nonnull)messageId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        [Emarsys.messageInbox removeTag:tag fromMessage:messageId completionBlock:^(NSError * _Nullable error) {
            if (NULL != error) {
                reject(@"RNEmarsysWrapper", @"removeTag: ", error);
            } else {
                resolve([NSNumber numberWithBool:YES]);
            }
        }];
        
    }
    @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"handleEvent"];
}

-(void)startObserving {
    hasListeners = YES;
    if (_body != nil) {
        [self sendEventWithName:@"handleEvent" body: _body];
    }
}

-(void)stopObserving {
    hasListeners = NO;
}

- (void)sendEvent:(NSDictionary<NSString *, NSObject *> *)body {
    if (hasListeners) {
        [self sendEventWithName:@"handleEvent" body: body];
    } else {
        _body = body;
    }
}

+ (id)allocWithZone:(NSZone *)zone {
    static RNEmarsysWrapper *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [super allocWithZone:zone];
    });
    return sharedInstance;
}

@end
