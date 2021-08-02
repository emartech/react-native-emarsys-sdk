#import "Emarsys.h"
#import "EMSCartItem.h"

#import "EMSLogic.h"
#import "EMSRecommendationFilter.h"

#import "LogicParser.h"
#import "ArrayUtil.h"

@implementation LogicParser

+(EMSLogic *)parseLogic:(NSString *)logic {
    EMSLogic *recommendedLogic;
    
    if([logic isEqualToString:@"SEARCH"]) {
        recommendedLogic = EMSLogic.search;
    }
    else if([logic isEqualToString:@"CART"]) {
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
    else if ([logic isEqualToString:@"HOME"]) {
        recommendedLogic = EMSLogic.home;
    }
    else if ([logic isEqualToString:@"PERSONAL"]) {
        recommendedLogic = EMSLogic.personal;
    }
    else {
        recommendedLogic = EMSLogic.search;
    }
    
    return recommendedLogic;
}

+(EMSLogic *)parseLogic:(NSString *)logic variants:(NSArray<NSString *> *)variants  {
    EMSLogic *recommendedLogic;
    
    if([logic isEqualToString:@"HOME"]) {
        recommendedLogic = [EMSLogic homeWithVariants:variants];
    }
    else if([logic isEqualToString:@"PERSONAL"]) {
        recommendedLogic = [EMSLogic personalWithVariants:variants];
    }
    else {
        recommendedLogic = EMSLogic.search;
    }
    
    return recommendedLogic;
}

+(EMSLogic *)parseLogic:(NSString *)logic cartItems:(NSArray *)cartItems  {
    EMSLogic *recommendedLogic;
    
    if([logic isEqualToString:@"CART"]) {
        NSArray<EMSCartItem *> *items = [ArrayUtil arrayToCartList:cartItems];
        recommendedLogic = [EMSLogic cartWithCartItems:[items copy]];
    }
    else {
        recommendedLogic = EMSLogic.search;
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
    }
    else {
        recommendedLogic = EMSLogic.search;
    }
    
    return recommendedLogic;
}

@end
