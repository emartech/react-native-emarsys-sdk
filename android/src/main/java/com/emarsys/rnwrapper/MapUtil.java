package com.emarsys.rnwrapper;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.URL;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class MapUtil {

	public static void mapPutNullable(WritableMap map, String key, Object value) {
		if (value == null) {
			map.putNull(key);
		} else if (value instanceof String) {
			map.putString(key, (String) value);
		} else if (value instanceof URL) {
			map.putString(key, value.toString());
		} else if (value instanceof Boolean) {
			map.putBoolean(key, (Boolean) value);
		} else if (value instanceof Integer) {
			map.putInt(key, (Integer) value);
		} else if (value instanceof Double) {
			map.putDouble(key, (Double) value);
		} else if (value instanceof Float) {
			map.putDouble(key, Double.valueOf(value.toString()));
		}
	}

	public static JSONObject toJSONObject(ReadableMap readableMap) throws JSONException {
		JSONObject jsonObject = new JSONObject();

		ReadableMapKeySetIterator iterator = readableMap.keySetIterator();

		while (iterator.hasNextKey()) {
			String key = iterator.nextKey();
			ReadableType type = readableMap.getType(key);

			switch (type) {
				case Null:
					jsonObject.put(key, null);
					break;
				case Boolean:
					jsonObject.put(key, readableMap.getBoolean(key));
					break;
				case Number:
					jsonObject.put(key, readableMap.getDouble(key));
					break;
				case String:
					jsonObject.put(key, readableMap.getString(key));
					break;
				case Map:
					jsonObject.put(key, MapUtil.toJSONObject(readableMap.getMap(key)));
					break;
				case Array:
					jsonObject.put(key, ArrayUtil.toJSONArray(readableMap.getArray(key)));
					break;
			}
		}

		return jsonObject;
	}

	public static Map<String, Object> toMap(JSONObject jsonObject) throws JSONException {
		Map<String, Object> map = new HashMap<>();
		Iterator<String> iterator = jsonObject.keys();

		while (iterator.hasNext()) {
			String key = iterator.next();
			Object value = jsonObject.get(key);

			if (value instanceof JSONObject) {
				value = MapUtil.toMap((JSONObject) value);
			}
			if (value instanceof JSONArray) {
				value = ArrayUtil.toArray((JSONArray) value);
			}

			map.put(key, value);
		}

		return map;
	}

	public static Map<String, String> toMap(ReadableMap readableMap) {
		Map<String, String> map = new HashMap<>();
		ReadableMapKeySetIterator iterator = readableMap.keySetIterator();

		while (iterator.hasNextKey()) {
			String key = iterator.nextKey();
			map.put(key, readableMap.getString(key));
		}

		return map;
	}

	public static WritableMap toWritableMap(Map<String, Object> map) {
		WritableMap writableMap = Arguments.createMap();
		Iterator iterator = map.entrySet().iterator();

		while (iterator.hasNext()) {
			Map.Entry pair = (Map.Entry)iterator.next();
			Object value = pair.getValue();

			if (value == null) {
				writableMap.putNull((String) pair.getKey());
			} else if (value instanceof Boolean) {
				writableMap.putBoolean((String) pair.getKey(), (Boolean) value);
			} else if (value instanceof Double) {
				writableMap.putDouble((String) pair.getKey(), (Double) value);
			} else if (value instanceof Integer) {
				writableMap.putInt((String) pair.getKey(), (Integer) value);
			} else if (value instanceof String) {
				writableMap.putString((String) pair.getKey(), (String) value);
			} else if (value instanceof Map) {
				writableMap.putMap((String) pair.getKey(), MapUtil.toWritableMap((Map<String, Object>) value));
			} else if (value.getClass() != null && value.getClass().isArray()) {
				writableMap.putArray((String) pair.getKey(), ArrayUtil.toWritableArray((Object[]) value));
			}

			iterator.remove();
		}

		return writableMap;
	}

	public static WritableMap jsonToWritableMap(JSONObject jsonObject) {
		WritableMap writableMap = new WritableNativeMap();

		if (jsonObject == null) {
			return null;
		}

		Iterator<String> iterator = jsonObject.keys();
		
		if (!iterator.hasNext()) {
			return null;
		}

		while (iterator.hasNext()) {
			try {
				String key = iterator.next();
				Object value = jsonObject.get(key);
				
				if (value == null) {
					writableMap.putNull(key);
				} else if (value instanceof Boolean) {
					writableMap.putBoolean(key, (Boolean) value);
				} else if (value instanceof Integer) {
					writableMap.putInt(key, (Integer) value);
				} else if (value instanceof Double) {
					writableMap.putDouble(key, (Double) value);
				} else if (value instanceof String) {
					writableMap.putString(key, (String) value);
				} else if (value instanceof JSONObject) {
					writableMap.putMap(key, jsonToWritableMap((JSONObject) value));
				} else if (value instanceof JSONArray) {
					writableMap.putArray(key, ArrayUtil.jsonArrayToWritableArray((JSONArray) value));
				}
			} catch (JSONException e) {
				e.printStackTrace();
			}
		}
		
		return writableMap;
	}

}
