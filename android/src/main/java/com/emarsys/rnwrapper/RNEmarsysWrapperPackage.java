package com.emarsys.rnwrapper;

import com.emarsys.Emarsys;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class RNEmarsysWrapperPackage implements ReactPackage {
	@Override
	public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
		return Arrays.asList(
				new RNEmarsysWrapperModule(reactContext),
				new RNEmarsysPushWrapperModule(reactContext),
				new RNEmarsysInAppWrapperModule(reactContext),
				new RNEmarsysInboxWrapperModule(reactContext),
				new RNEmarsysGeofenceWrapperModule(reactContext),
				new RNEmarsysPredictWrapperModule(reactContext));
	}

	@Override
	public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
		return Arrays.asList(
				new RNEmarsysInlineInAppViewManager(reactContext));
	}
}
