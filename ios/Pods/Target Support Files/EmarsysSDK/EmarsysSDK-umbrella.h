#ifdef __OBJC__
#import <UIKit/UIKit.h>
#else
#ifndef FOUNDATION_EXPORT
#if defined(__cplusplus)
#define FOUNDATION_EXPORT extern "C"
#else
#define FOUNDATION_EXPORT extern
#endif
#endif
#endif

#import "Emarsys.h"
#import "EMSInAppProtocol.h"
#import "EMSInboxProtocol.h"
#import "EMSPredictProtocol.h"
#import "EMSGeofenceProtocol.h"
#import "EMSPushNotificationProtocol.h"
#import "EMSMessageInboxProtocol.h"
#import "EMSInboxResult.h"
#import "EMSMessage.h"
#import "EMSBlocks.h"
#import "EMSConfig.h"
#import "EMSConfigBuilder.h"
#import "EMSConfigProtocol.h"
#import "EMSAppDelegate.h"
#import "EMSCartItemProtocol.h"
#import "EMSCartItem.h"
#import "EMSProduct.h"
#import "EMSLogicProtocol.h"
#import "EMSLogic.h"
#import "EMSRecommendationFilter.h"
#import "EMSRecommendationFilterProtocol.h"
#import "EMSEventHandler.h"
#import "EMSNotification.h"
#import "EMSNotificationInboxStatus.h"
#import "EMSFlipperFeatures.h"
#import "EMSUserNotificationCenterDelegate.h"

FOUNDATION_EXPORT double EmarsysSDKVersionNumber;
FOUNDATION_EXPORT const unsigned char EmarsysSDKVersionString[];

