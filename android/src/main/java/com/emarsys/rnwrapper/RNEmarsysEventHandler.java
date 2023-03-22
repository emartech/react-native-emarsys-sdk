package com.emarsys.rnwrapper;

import com.emarsys.Emarsys;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.json.JSONObject;

import java.util.LinkedList;

public class RNEmarsysEventHandler implements LifecycleEventListener {

    private static RNEmarsysEventHandler instance = new RNEmarsysEventHandler();
    private ReactContext reactContext;
    private LinkedList<WritableMap> eventQueue = new LinkedList<>();
    private DeviceEventManagerModule.RCTDeviceEventEmitter eventEmitter = null;

    private RNEmarsysEventHandler() {
    }

    public static RNEmarsysEventHandler getInstance() {
        return instance;
    }

    public void setPushNotificationEventHandler() {
        Emarsys.getPush().setNotificationEventHandler((context, s, jsonObject) -> {
            handleEvent(s, jsonObject);
        });
    }

    public void setInAppEventHandler() {
        Emarsys.getInApp().setEventHandler((context, name, payload) -> {
            handleEvent(name, payload);
        });
    }

    public void setPushSilentMessageEventHandler() {
        Emarsys.getPush().setSilentMessageEventHandler((context, s, jsonObject) -> {
            handleEvent(s, jsonObject);
        });
    }

    public void setGeofenceEventHandler() {
        Emarsys.getGeofence().setEventHandler((context, s, jsonObject) -> {
            handleEvent(s, jsonObject);
        });
    }

    public void setOnEventActionEventHandler() {
        Emarsys.getOnEventAction().setOnEventActionEventHandler((context, s, jsonObject) -> {
            handleEvent(s, jsonObject);
        });
    }

    public void setEventHandlers() {
        setPushNotificationEventHandler();
        setInAppEventHandler();
        setPushSilentMessageEventHandler();
        setGeofenceEventHandler();
        setOnEventActionEventHandler();
    }

    private void sendEvents() {
        while (eventEmitter != null && !this.eventQueue.isEmpty()) {
            eventEmitter.emit("handleEvent", eventQueue.remove());
        }
    }

    public void provideReactContext(ReactContext reactContext) {
        this.reactContext = reactContext;
        eventEmitter = reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
        reactContext.addLifecycleEventListener(this);
    }

    private void handleEvent(String eventName, JSONObject eventPayload) {
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
