package com.emarsys.rnwrapper;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.emarsys.Emarsys;
import com.emarsys.core.api.result.CompletionListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class RNEmarsysPushWrapperModule extends ReactContextBaseJavaModule {

    private static final String TAG = "RNEmarsysPushWrapper";

    private final ReactApplicationContext reactContext;

    public RNEmarsysPushWrapperModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return TAG;
    }

    @ReactMethod
    public void setPushToken(@NonNull final String pushToken, final Promise promise) {
        try {
            Emarsys.getPush().setPushToken(pushToken, new CompletionListener() {
                @Override
                public void onCompleted(@Nullable Throwable errorCause) {
                    if (errorCause != null) {
                        promise.reject(TAG, "Error setPushToken: ", errorCause);
                    } else {
                        promise.resolve(true);
                    }
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error setPushToken: ", e);
        }
    }

    @ReactMethod
    public void clearPushToken(final Promise promise) {
        try {
            Emarsys.getPush().clearPushToken(new CompletionListener() {
                @Override
                public void onCompleted(@Nullable Throwable errorCause) {
                    if (errorCause != null) {
                        promise.reject(TAG, "Error clearPushToken: ", errorCause);
                    } else {
                        promise.resolve(true);
                    }
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error clearPushToken: ", e);
        }
    }

    @ReactMethod
    public void getPushToken(Promise promise) {
        try {
            String pushToken = Emarsys.getPush().getPushToken();
            promise.resolve(pushToken);
        } catch (Exception e) {
            promise.reject(TAG, "Error getPushToken: ", e);
        }
    }

}
