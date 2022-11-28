package com.emarsys.rnwrapper;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.emarsys.Emarsys;
import com.emarsys.core.api.result.CompletionListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;

import java.util.HashMap;
import java.util.Map;

public class RNEmarsysWrapperModule extends ReactContextBaseJavaModule {

    private static final String TAG = "RNEmarsysWrapper";

    private final ReactApplicationContext reactContext;

    public RNEmarsysWrapperModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return TAG;
    }

    // - Setup

    @ReactMethod
    public void setContact(@NonNull Integer contactFieldId, @NonNull final String contactFieldValue, final Promise promise) {
        try {
            Emarsys.setContact(contactFieldId, contactFieldValue, new CompletionListener() {
                @Override
                public void onCompleted(@Nullable Throwable errorCause) {
                    if (errorCause != null) {
                        promise.reject(TAG, "Error setContact: ", errorCause);
                    } else {
                        promise.resolve(true);
                    }
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error setContact: ", e);
        }
    }

    @ReactMethod
    public void clearContact(final Promise promise) {
        try {
            Emarsys.clearContact(new CompletionListener() {
                @Override
                public void onCompleted(@Nullable Throwable errorCause) {
                    if (errorCause != null) {
                        promise.reject(TAG, "Error clearContact: ", errorCause);
                    } else {
                        promise.resolve(true);
                    }
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error clearContact: ", e);
        }
    }

    @ReactMethod
    public void trackCustomEvent(@NonNull final String eventName, @Nullable final ReadableMap eventAttributes, final Promise promise) {
        try {
            Map<String, String> eventAttributesMap = new HashMap<String, String>();
            ReadableMapKeySetIterator iterator = eventAttributes.keySetIterator();

            while (iterator.hasNextKey()) {
                String key = iterator.nextKey();
                ReadableType type = eventAttributes.getType(key);
                switch (type) {
                    case String:
                        eventAttributesMap.put(key, eventAttributes.getString(key));
                        break;
                    default:
                        throw new IllegalArgumentException("Could not convert object with key: " + key + ".");
                }
            }

            Emarsys.trackCustomEvent(eventName, eventAttributesMap, new CompletionListener() {
                @Override
                public void onCompleted(@Nullable Throwable errorCause) {
                    if (errorCause != null) {
                        promise.reject(TAG, "Error trackCustomEvent: ", errorCause);
                    } else {
                        promise.resolve(true);
                    }
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error trackCustomEvent: ", e);
        }
    }

    @ReactMethod
    public void setEventHandler() {
        RNEmarsysEventHandler.getInstance().provideReactContext(reactContext);
    }

    // - DeepLink

    @ReactMethod
    public void trackDeepLink(@Nullable final String userActivity, final Promise promise) {
        try {
            Activity activity = getCurrentActivity();
            Intent intent = activity.getIntent();
            Uri data = intent.getData();
            String URL = "";

            if (data != null) {
                URL = data.toString();
            }

            if (userActivity != null && userActivity.equals(URL)) {
                Emarsys.trackDeepLink(activity, intent, new CompletionListener() {
                    @Override
                    public void onCompleted(@Nullable Throwable errorCause) {
                        if (errorCause != null) {
                            promise.reject(TAG, "Error trackDeepLink: ", errorCause);
                        } else {
                            promise.resolve(true);
                        }
                    }
                });
            }
        } catch (Exception e) {
            promise.reject(TAG, "Error trackDeepLink: ", e);
        }
    }

    // - Config

    @ReactMethod
    public void changeApplicationCode(@Nullable final String applicationCode, final Promise promise) {
        try {
            Emarsys.getConfig().changeApplicationCode(applicationCode, new CompletionListener() {
                @Override
                public void onCompleted(@Nullable Throwable errorCause) {
                    if (errorCause != null) {
                        promise.reject(TAG, "Error changeApplicationCode: ", errorCause);
                    } else {
                        promise.resolve(true);
                    }
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error changeApplicationCode: ", e);
        }
    }

    @ReactMethod
    public void changeMerchantId(@NonNull final String merchantId, Promise promise) {
        try {
            Emarsys.getConfig().changeMerchantId(merchantId);
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject(TAG, "Error changeMerchantId: ", e);
        }
    }

    @ReactMethod
    public void getApplicationCode(Promise promise) {
        try {
            String applicationCode = Emarsys.getConfig().getApplicationCode();
            promise.resolve(applicationCode);
        } catch (Exception e) {
            promise.reject(TAG, "Error getApplicationCode: ", e);
        }
    }

    @ReactMethod
    public void getMerchantId(Promise promise) {
        try {
            String merchantId = Emarsys.getConfig().getMerchantId();
            promise.resolve(merchantId);
        } catch (Exception e) {
            promise.reject(TAG, "Error getMerchantId: ", e);
        }
    }

    @ReactMethod
    public void getContactFieldId(Promise promise) {
        try {
            int contactFieldId = Emarsys.getConfig().getContactFieldId();
            promise.resolve(contactFieldId);
        } catch (Exception e) {
            promise.reject(TAG, "Error getContactFieldId: ", e);
        }
    }

    @ReactMethod
    public void getHardwareId(Promise promise) {
        try {
            String hardwareId = Emarsys.getConfig().getHardwareId();
            promise.resolve(hardwareId);
        } catch (Exception e) {
            promise.reject(TAG, "Error getHardwareId: ", e);
        }
    }

    @ReactMethod
    public void getLanguageCode(Promise promise) {
        try {
            String languageCode = Emarsys.getConfig().getLanguageCode();
            promise.resolve(languageCode);
        } catch (Exception e) {
            promise.reject(TAG, "Error getLanguageCode: ", e);
        }
    }

    @ReactMethod
    public void getSdkVersion(Promise promise) {
        try {
            String sdkVersion = Emarsys.getConfig().getSdkVersion();
            promise.resolve(sdkVersion);
        } catch (Exception e) {
            promise.reject(TAG, "Error getSdkVersion: ", e);
        }
    }

}
