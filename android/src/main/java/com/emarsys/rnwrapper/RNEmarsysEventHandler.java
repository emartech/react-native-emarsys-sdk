package com.emarsys.rnwrapper;

import android.content.Context;
import android.util.Log;

import com.emarsys.mobileengage.api.event.EventHandler;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.json.JSONObject;

import java.util.LinkedList;

public class RNEmarsysEventHandler implements EventHandler, LifecycleEventListener {

    private static RNEmarsysEventHandler instance = new RNEmarsysEventHandler();
    private ReactContext reactContext;
    private LinkedList<WritableMap> eventQueue = new LinkedList<>();
    private DeviceEventManagerModule.RCTDeviceEventEmitter eventEmitter = null;

    private RNEmarsysEventHandler() {
    }

    public static RNEmarsysEventHandler getInstance() {
        return instance;
    }

    private void sendEvents() {
        while (eventEmitter != null && !this.eventQueue.isEmpty()) {
            eventEmitter.emit("handleEvent", eventQueue.remove());
        }
    }

    public void provideReactContext(ReactContext reactContext) {
        Log.d(this.getClass().getSimpleName(), "Registered for events.");
        this.reactContext = reactContext;
        eventEmitter = reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
        reactContext.addLifecycleEventListener(this);
    }


    @Override
    public void handleEvent(@NotNull Context context, @NotNull String eventName, @Nullable JSONObject eventPayload) {
        WritableMap event = Arguments.createMap();
        event.putString("eventName", eventName);
        event.putMap("payload", MapUtil.jsonToWritableMap(eventPayload));
        eventQueue.add(event);
        sendEvents();
    }

    @Override
    public void onHostResume() {
        eventEmitter = reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
        sendEvents();
    }

    @Override
    public void onHostPause() {
        eventEmitter = null;
    }

    @Override
    public void onHostDestroy() {
        eventEmitter = null;
    }
}
