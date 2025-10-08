//
//  Copyright © 2025 Emarsys. All rights reserved.
//

@interface StorageUtil : NSObject

+ (NSString *) stringForKey:(NSString *)key;
+ (NSString *) stringForKey:(NSString *)key withInfoPListFallback:(BOOL) fallback;
+ (void) setString:(NSString *)value forKey:(NSString *)key;

@end
