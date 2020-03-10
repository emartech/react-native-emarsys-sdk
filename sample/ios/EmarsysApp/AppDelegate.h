//
//  Copyright © 2019 Emarsys. All rights reserved.
//

#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <EmarsysSDK/EMSEventHandler.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, EMSEventHandler>

@property (nonatomic, strong) UIWindow *window;

@end
 
