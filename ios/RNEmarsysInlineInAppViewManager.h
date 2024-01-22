#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>

#import "EMSInlineInAppView.h"

@interface RNEmarsysInlineInAppView: EMSInlineInAppView

@property (nonatomic, copy) RCTBubblingEventBlock onAppEvent;
@property (nonatomic, copy) RCTBubblingEventBlock onCompleted;
@property (nonatomic, copy) RCTBubblingEventBlock onClose;

@end


@interface RNEmarsysInlineInAppViewManager : RCTViewManager

@end
