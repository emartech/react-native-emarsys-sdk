#import "Emarsys.h"
#import "EMSCartItem.h"

#import "LogicParser.h"
#import "ArrayUtil.h"

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
