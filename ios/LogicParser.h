//
//  LogicParser.h
//  DoubleConversion
//
//  Created by Eduardo Zatoni on 10/07/2020.
//

@interface LogicParser : NSObject
+ (EMSLogic *)parseLogic:(NSString *)logic;
+ (EMSLogic *)parseLogic:(NSString *)logic cartItems:(NSArray *)cartItems;
+ (EMSLogic *)parseLogic:(NSString *)logic query:(NSString *)query;
@end

