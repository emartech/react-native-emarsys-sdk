#import "RNEmarsysInlineInAppViewManager.h"

@implementation RNEmarsysInlineInAppView

@end


@implementation RNEmarsysInlineInAppViewManager

RCT_EXPORT_MODULE()

- (UIView *)view {
    RNEmarsysInlineInAppView *view = [[RNEmarsysInlineInAppView alloc] init];
    __weak RNEmarsysInlineInAppView *weakView = view;
    view.eventHandler = ^(NSString *eventName, NSDictionary<NSString *, NSObject *> *payload) {
        if (!weakView.onAppEvent) { return; }
        weakView.onAppEvent(@{ @"eventName": eventName, @"payload": payload });
    };
    view.completionBlock = ^(NSError *error) {
        if (!weakView.onCompleted) { return; }
        weakView.onCompleted(@{ @"error": error ? error.localizedDescription : [NSNull null] });
    };
    view.closeBlock = ^ {
        if (!weakView.onClose) { return; }
        weakView.onClose(@{ });
    };
    return view;
}

RCT_EXPORT_VIEW_PROPERTY(onAppEvent, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onCompleted, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onClose, RCTBubblingEventBlock)

RCT_EXPORT_METHOD(loadInApp:(NSNumber * _Nonnull)viewTag withViewId:(NSString * _Nonnull)viewId) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
        UIView *view = viewRegistry[viewTag];
        if (!view || ![view isKindOfClass:[EMSInlineInAppView class]]) { return; }
        [(EMSInlineInAppView *)view loadInAppWithViewId:viewId];
    }];
}

@end
