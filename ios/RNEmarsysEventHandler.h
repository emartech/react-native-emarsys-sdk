//
//  Copyright © 2020 Emarsys. All rights reserved.
//

#import <React/RCTEventEmitter.h>
#import <EmarsysSDK/EMSEventHandler.h>
#import <EmarsysSDK/Emarsys.h>
 
@interface RNEmarsysEventHandler : RCTEventEmitter <EMSEventHandler, RCTBridgeModule>

@end
