package com.emarsys.rnwrapper;

import static com.emarsys.rnwrapper.MapUtil.jsonToWritableMap;
import static com.emarsys.rnwrapper.MapUtil.mapPutNullable;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.emarsys.Emarsys;
import com.emarsys.core.api.result.CompletionListener;
import com.emarsys.mobileengage.api.geofence.Geofence;
import com.emarsys.mobileengage.api.geofence.Trigger;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.List;

public class RNEmarsysGeofenceWrapperModule extends ReactContextBaseJavaModule {

    private static final String TAG = "RNEmarsysGeofenceWrapper";

    private final ReactApplicationContext reactContext;

    public RNEmarsysGeofenceWrapperModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return TAG;
    }

    @ReactMethod
    public void geofenceEnable(final Promise promise) {
        try {
            Emarsys.getGeofence().enable(new CompletionListener() {
                @Override
                public void onCompleted(@Nullable Throwable errorCause) {
                    if (errorCause != null) {
                        promise.reject(TAG, "Error geofenceEnable: ", errorCause);
                    } else {
                        promise.resolve(true);
                    }
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error geofenceEnable: ", e);
        }
    }

    @ReactMethod
    public void geofenceDisable(final Promise promise) {
        try {
            Emarsys.getGeofence().disable();
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject(TAG, "Error geofenceDisable: ", e);
        }
    }

    @ReactMethod
    public void geofenceIsEnabled(final Promise promise) {
        try {
            boolean isEnabled = Emarsys.getGeofence().isEnabled();
            promise.resolve(isEnabled);
        } catch (Exception e) {
            promise.reject(TAG, "Error geofenceIsEnabled: ", e);
        }
    }

    @ReactMethod
    public void geofenceSetInitialEnterTriggerEnabled(boolean enabled, final Promise promise) {
        try {
            Emarsys.getGeofence().setInitialEnterTriggerEnabled(enabled);
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject(TAG, "Error geofenceSetInitialEnterTriggerEnabled: ", e);
        }
    }

    @ReactMethod
    public void registeredGeofences(final Promise promise) {
        try {
            List<Geofence> registeredGeofences = Emarsys.getGeofence().getRegisteredGeofences();
            resolveGeofences(promise, registeredGeofences);
        } catch (Exception e) {
            promise.reject(TAG, "Error registeredGeofences: ", e);
        }
    }

    private void resolveGeofences(final Promise promise, @NonNull List<Geofence> result) {
        WritableArray geofences = Arguments.createArray();
        for (Geofence geofence : result) {
            WritableMap recGeofence = convertGeofenceToMap(geofence);
            geofences.pushMap(recGeofence);
        }
        promise.resolve(geofences);
    }

    private WritableMap convertGeofenceToMap(Geofence geofence) {
        WritableMap map = Arguments.createMap();

        mapPutNullable(map, "id", geofence.getId());
        mapPutNullable(map, "lat", geofence.getLat());
        mapPutNullable(map, "lon", geofence.getLon());
        mapPutNullable(map, "radius", geofence.getRadius());
        mapPutNullable(map, "waitInterval", geofence.getWaitInterval());

        WritableArray triggers = Arguments.createArray();
        for (Trigger trigger : geofence.getTriggers()) {
            WritableMap recTrigger = convertGeofenceTriggerToMap(trigger);
            triggers.pushMap(recTrigger);
        }
        map.putArray("triggers", triggers);

        return map;
    }

    private WritableMap convertGeofenceTriggerToMap(Trigger trigger) {
        WritableMap map = Arguments.createMap();

        mapPutNullable(map, "id", trigger.getId());
        mapPutNullable(map, "type", trigger.getType());
        mapPutNullable(map, "loiteringDelay", trigger.getLoiteringDelay());
        map.putMap("action", jsonToWritableMap(trigger.getAction()));

        return map;
    }

}
