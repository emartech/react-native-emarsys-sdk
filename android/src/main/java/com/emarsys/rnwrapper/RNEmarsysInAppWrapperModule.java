package com.emarsys.rnwrapper;

import com.emarsys.Emarsys;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class RNEmarsysInAppWrapperModule extends ReactContextBaseJavaModule {

    private static final String TAG = "RNEmarsysInAppWrapper";

    private final ReactApplicationContext reactContext;

    public RNEmarsysInAppWrapperModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return TAG;
    }

    @ReactMethod
    public void pause(Promise promise) {
        try {
            Emarsys.getInApp().pause();
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject(TAG, "Error pause: ", e);
        }
    }

    @ReactMethod
    public void resume(Promise promise) {
        try {
            Emarsys.getInApp().resume();
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject(TAG, "Error resume: ", e);
        }
    }

}
