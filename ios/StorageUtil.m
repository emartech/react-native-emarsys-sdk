#import "StorageUtil.h"

#define STORE_NAME @"com.emarsys.rnwrapper"

@implementation StorageUtil

+ (NSString *) stringForKey:(NSString *)key {
    return [[[NSUserDefaults alloc] initWithSuiteName:STORE_NAME] stringForKey:key];
}

+ (NSString *) stringForKey:(NSString *)key withInfoPListFallback:(BOOL) fallback {
    NSString * value = [StorageUtil stringForKey:key];
    if (value == nil && fallback) {
        return [[[NSBundle mainBundle] infoDictionary] objectForKey:[NSString stringWithFormat:@"%@.%@", STORE_NAME, key]];
    }
    return value;
}

+ (void) setString:(NSString *)value forKey:(NSString *)key {
    [[[NSUserDefaults alloc] initWithSuiteName:STORE_NAME] setObject:value forKey: key];
}

@end
