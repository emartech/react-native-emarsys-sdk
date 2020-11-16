//
//  Copyright © 2020 Emarsys. All rights reserved.
//

@interface LogicParser : NSObject
+ (EMSLogic *)parseLogic:(NSString *)logic;
+ (EMSLogic *)parseLogic:(NSString *)logic cartItems:(NSArray *)cartItems;
+ (EMSLogic *)parseLogic:(NSString *)logic variants:(NSArray *)variants;
+ (EMSLogic *)parseLogic:(NSString *)logic query:(NSString *)query;
@end
