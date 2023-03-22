package com.emarsys.rnwrapper;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.emarsys.inapp.ui.InlineInAppView;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.Map;

public class RNEmarsysInlineInAppViewManager extends SimpleViewManager<InlineInAppView> {

    private static final String TAG = "RNEmarsysInlineInAppView";
    private final int COMMAND_LOAD_IN_APP = 1;

    private final ReactApplicationContext reactContext;

    public RNEmarsysInlineInAppViewManager(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
    }

    @Override
    public String getName() { return TAG; }

    @Override
    public InlineInAppView createViewInstance(ThemedReactContext context) {
        InlineInAppView view = new InlineInAppView(reactContext);
        view.setOnAppEventListener((property, json) -> {
            WritableMap event = Arguments.createMap();
            event.putString("eventName", property);
            event.putMap("payload", MapUtil.jsonToWritableMap(json).getMap("payload"));
            reactContext.getJSModule(RCTEventEmitter.class)
                    .receiveEvent(view.getId(), "onAppEvent", event);
            return null;
        });
        view.setOnCompletionListener((error) -> {
            WritableMap event = Arguments.createMap();
            event.putString("error", error == null ? null : error.getLocalizedMessage());
            reactContext.getJSModule(RCTEventEmitter.class)
                    .receiveEvent(view.getId(), "onCompleted", event);
        });
        view.setOnCloseListener(() -> {
            reactContext.getJSModule(RCTEventEmitter.class)
                    .receiveEvent(view.getId(), "onClose", null);
            return null;
        });
        return view;
    }

    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder().put(
                "onAppEvent",
                MapBuilder.of(
                        "phasedRegistrationNames",
                        MapBuilder.of("bubbled", "onAppEvent")
                )
        ).put(
                "onCompleted",
                MapBuilder.of(
                        "phasedRegistrationNames",
                        MapBuilder.of("bubbled", "onCompleted")
                )
        ).put(
                "onClose",
                MapBuilder.of(
                        "phasedRegistrationNames",
                        MapBuilder.of("bubbled", "onClose")
                )
        ).build();
    }

    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of("loadInApp", COMMAND_LOAD_IN_APP);
    }

    @Override
    public void receiveCommand(
            @NonNull InlineInAppView root,
            String commandId,
            @Nullable ReadableArray args
    ) {
        super.receiveCommand(root, commandId, args);

        int commandIdInt = Integer.parseInt(commandId);
        switch (commandIdInt) {
            case COMMAND_LOAD_IN_APP:
                String viewId = args.getString(0);
                root.loadInApp(viewId);
                break;
            default: { }
        }
    }

}
