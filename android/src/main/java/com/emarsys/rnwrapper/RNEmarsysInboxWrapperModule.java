package com.emarsys.rnwrapper;

import static com.emarsys.rnwrapper.MapUtil.mapPutNullable;
import static com.emarsys.rnwrapper.MapUtil.toWritableMap;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.emarsys.Emarsys;
import com.emarsys.core.api.result.CompletionListener;
import com.emarsys.core.api.result.ResultListener;
import com.emarsys.core.api.result.Try;
import com.emarsys.mobileengage.api.inbox.InboxResult;
import com.emarsys.mobileengage.api.inbox.Message;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RNEmarsysInboxWrapperModule extends ReactContextBaseJavaModule {

    private static final String TAG = "RNEmarsysInboxWrapper";

    private final ReactApplicationContext reactContext;

    public RNEmarsysInboxWrapperModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return TAG;
    }

    @ReactMethod
    public void fetchMessages(final Promise promise) {
        try {
            Emarsys.getMessageInbox().fetchMessages(new ResultListener<Try<InboxResult>>() {
                @Override
                public void onResult(@NonNull Try<InboxResult> result) {
                    resolveMessages(promise, result, "fetchMessages");
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error fetchMessages: ", e);
        }
    }

    @ReactMethod
    public void addTag(@NonNull String tag, @NonNull String messageId, final Promise promise) {
        try {
            Emarsys.getMessageInbox().addTag(tag, messageId, new CompletionListener() {
                @Override
                public void onCompleted(@Nullable Throwable errorCause) {
                    if (errorCause != null) {
                        promise.reject(TAG, "Error addTag: ", errorCause);
                    } else {
                        promise.resolve(true);
                    }
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error trackPurchase: ", e);
        }
    }

    @ReactMethod
    public void removeTag(@NonNull String tag, @NonNull String messageId, final Promise promise) {
        try {
            Emarsys.getMessageInbox().removeTag(tag, messageId, new CompletionListener() {
                @Override
                public void onCompleted(@Nullable Throwable errorCause) {
                    if (errorCause != null) {
                        promise.reject(TAG, "Error removeTag: ", errorCause);
                    } else {
                        promise.resolve(true);
                    }
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error trackPurchase: ", e);
        }
    }

    private void resolveMessages(final Promise promise, @NonNull Try<InboxResult> result, String methodName) {
        if (result.getResult() != null) {
            List<Message> inboxMessages = result.getResult().getMessages();
            WritableArray messages = Arguments.createArray();
            for (Message message : inboxMessages) {
                WritableMap recMessage = convertMessageToMap(message);
                messages.pushMap(recMessage);
            }
            promise.resolve(messages);
        }
        if (result.getErrorCause() != null) {
            promise.reject(TAG, "Error " + methodName + ": ", result.getErrorCause());
        }
    }

    private WritableMap convertMessageToMap(Message message) {
        WritableMap map = Arguments.createMap();

        mapPutNullable(map, "id", message.getId());
        mapPutNullable(map, "campaignId", message.getCampaignId());
        mapPutNullable(map, "collapseId", message.getCollapseId());
        mapPutNullable(map, "title", message.getTitle());
        mapPutNullable(map, "body", message.getBody());
        mapPutNullable(map, "imageUrl", message.getImageUrl());
        mapPutNullable(map, "receivedAt", message.getReceivedAt());
        mapPutNullable(map, "updatedAt", message.getUpdatedAt());
        mapPutNullable(map, "expiresAt", message.getExpiresAt());

        WritableArray tags = Arguments.fromList(message.getTags());
        map.putArray("tags", tags);

        Map<String, Object> properties = new HashMap<String, Object>(message.getProperties());
        map.putMap("properties", toWritableMap(properties));

        return map;
    }

}
