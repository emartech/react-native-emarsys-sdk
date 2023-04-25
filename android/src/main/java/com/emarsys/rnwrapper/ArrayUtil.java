package com.emarsys.rnwrapper;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Map;

public class ArrayUtil {

	public static JSONArray toJSONArray(ReadableArray readableArray) throws JSONException {
		JSONArray jsonArray = new JSONArray();

		for (int i = 0; i < readableArray.size(); i++) {
			ReadableType type = readableArray.getType(i);

			switch (type) {
				case Null:
					jsonArray.put(i, null);
					break;
				case Boolean:
					jsonArray.put(i, readableArray.getBoolean(i));
					break;
				case Number:
					jsonArray.put(i, readableArray.getDouble(i));
					break;
				case String:
					jsonArray.put(i, readableArray.getString(i));
					break;
				case Map:
					jsonArray.put(i, MapUtil.toJSONObject(readableArray.getMap(i)));
					break;
				case Array:
					jsonArray.put(i, ArrayUtil.toJSONArray(readableArray.getArray(i)));
					break;
			}
		}
		
		return jsonArray;
	}

	public static Object[] toArray(JSONArray jsonArray) throws JSONException {
		Object[] array = new Object[jsonArray.length()];

		for (int i = 0; i < jsonArray.length(); i++) {
			Object value = jsonArray.get(i);

			if (value instanceof JSONObject) {
				value = MapUtil.toMap((JSONObject) value);
			}

			if (value instanceof JSONArray) {
				value = ArrayUtil.toArray((JSONArray) value);
			}

			array[i] = value;
		}
		
		return array;
	}

	public static Object[] toArray(ReadableArray readableArray) {
		Object[] array = new Object[readableArray.size()];

		for (int i = 0; i < readableArray.size(); i++) {
			ReadableType type = readableArray.getType(i);

			switch (type) {
				case Null:
					array[i] = null;
					break;
				case Boolean:
					array[i] = readableArray.getBoolean(i);
					break;
				case Number:
					array[i] = readableArray.getDouble(i);
					break;
				case String:
					array[i] = readableArray.getString(i);
					break;
				case Map:
					array[i] = MapUtil.toMap(readableArray.getMap(i));
					break;
				case Array:
					array[i] = ArrayUtil.toArray(readableArray.getArray(i));
					break;
			}
		}
		
		return array;
	}

	public static WritableArray toWritableArray(Object[] array) {
		WritableArray writableArray = Arguments.createArray();

		for (int i = 0; i < array.length; i++) {
			Object value = array[i];

			if (value == null) {
				writableArray.pushNull();
			} else if (value instanceof Boolean) {
				writableArray.pushBoolean((Boolean) value);
			} else if (value instanceof Double) {
				writableArray.pushDouble((Double) value);
			} else if (value instanceof Integer) {
				writableArray.pushInt((Integer) value);
			} else if (value instanceof String) {
				writableArray.pushString((String) value);
			} else if (value instanceof Map) {
				writableArray.pushMap(MapUtil.toWritableMap((Map<String, Object>) value));
			} else if (value.getClass() != null && value.getClass().isArray()) {
				writableArray.pushArray(ArrayUtil.toWritableArray((Object[]) value));
			}
		}
		
		return writableArray;
	}

	public static WritableArray jsonArrayToWritableArray(JSONArray jsonArray) {
		WritableArray writableArray = new WritableNativeArray();

		if (jsonArray == null) {
			return null;
		}

		if (jsonArray.length() <= 0) {
			return null;
		}

		for (int i = 0 ; i < jsonArray.length(); i++) {
			try {
				Object value = jsonArray.get(i);
				
				if (value == null) {
					writableArray.pushNull();
				} else if (value instanceof Boolean) {
					writableArray.pushBoolean((Boolean) value);
				} else if (value instanceof Integer) {
					writableArray.pushInt((Integer) value);
				} else if (value instanceof Double) {
					writableArray.pushDouble((Double) value);
				} else if (value instanceof String) {
					writableArray.pushString((String) value);
				} else if (value instanceof JSONObject) {
					writableArray.pushMap(MapUtil.jsonToWritableMap((JSONObject) value));
				} else if (value instanceof JSONArray) {
					writableArray.pushArray(jsonArrayToWritableArray((JSONArray) value));
				}
			} catch (JSONException e) {
				e.printStackTrace();
			}
		}
		
		return writableArray;
	}
}
