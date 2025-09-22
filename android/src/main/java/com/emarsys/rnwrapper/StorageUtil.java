package com.emarsys.rnwrapper;

import android.content.Context;
import android.content.pm.PackageManager;

public class StorageUtil {

	private static final String STORE_NAME = "com.emarsys.rnwrapper";

	public static String getString (Context context, String key) {
		return context.getSharedPreferences(STORE_NAME, Context.MODE_PRIVATE)
			.getString(key, null);
	}

	public static String getStringWithApplicationMetaDataFallback (Context context, String key, boolean fallback) {
		String value = getString(context, key);
		if (value == null && fallback) {
			try {
				return context.getPackageManager()
					.getApplicationInfo(context.getPackageName(), PackageManager.GET_META_DATA).metaData
					.getString(STORE_NAME + "." + key);
			} catch (Exception e) {
				return null;
			}
		}
		return value;
	}

	public static void setString (Context context, String key, String value) {
		context.getSharedPreferences(STORE_NAME, Context.MODE_PRIVATE)
			.edit().putString(key, value)
			.apply();
	}

}
