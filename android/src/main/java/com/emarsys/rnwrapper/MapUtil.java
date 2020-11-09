package com.emarsys.rnwrapper;

import android.util.Log;

import com.emarsys.predict.api.model.Product;
import com.emarsys.predict.api.model.RecommendationFilter;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class MapUtil {

	public static WritableMap convertProductToMap(Product product) {
		WritableMap map = Arguments.createMap();

		mapPutNullable(map, "productId", product.getProductId());
		mapPutNullable(map, "title", product.getTitle());
		mapPutNullable(map, "linkUrl", product.getLinkUrl().toString());
		mapPutNullable(map, "feature", product.getFeature());
		mapPutNullable(map, "cohort", product.getCohort());
		mapPutNullable(map, "imageUrl", product.getImageUrl());
		mapPutNullable(map, "zoomImageUrl", product.getZoomImageUrl());
		mapPutNullable(map, "categoryPath", product.getCategoryPath());
		mapPutNullable(map, "productDescription", product.getProductDescription());
		mapPutNullable(map, "album", product.getAlbum());
		mapPutNullable(map, "actor", product.getActor());
		mapPutNullable(map, "artist", product.getArtist());
		mapPutNullable(map, "author", product.getAuthor());
		mapPutNullable(map, "brand", product.getBrand());
		mapPutNullable(map, "available", product.getAvailable());
		mapPutNullable(map, "price", product.getPrice());
		mapPutNullable(map, "msrp", product.getMsrp());
		mapPutNullable(map, "year", product.getYear());

		Map<String, Object> customFields = new HashMap<String, Object>(product.getCustomFields());
		map.putMap("customFields", toWritableMap(customFields));

		return map;
	}

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
		}
	}

	public static List<RecommendationFilter> mapToRecommendationFilter(ReadableMap map) {
		
		List<RecommendationFilter> filters = new ArrayList<>();

		String type = "";
		String field = "";
		String comparison = "";
		String expectation = "";

		List<String> expectations = new ArrayList<>();

		RecommendationFilter filter = null;

		if (map.hasKey("type")) type = map.getString("type");
		if (map.hasKey("field")) field = map.getString("field");
		if (map.hasKey("comparison")) comparison = map.getString("comparison");

		if (map.hasKey("expectations") && map.getType("expectations") == ReadableType.Array ) {
			ReadableArray expArray = map.getArray("expectations");
			int expSize = expArray.size();
			
			for (int j = 0; j < expSize; j++) {
				expectation = expArray.getString(j);
				expectations.add(expectation);
			}
		}
		
		if (map.hasKey("expectations") && map.getType("expectations") == ReadableType.String ) {
			expectation = map.getString("expectations");
		}

		if (type.equalsIgnoreCase("include")) {
			if (comparison.equalsIgnoreCase("IS")) {
				filter = RecommendationFilter.include(field).isValue(expectation);
			} else if (comparison.equalsIgnoreCase("IN")) {
				filter = RecommendationFilter.include(field).inValues(expectations);
			} else if (comparison.equalsIgnoreCase("HAS")) {
				filter = RecommendationFilter.include(field).hasValue(expectation);
			} else if (comparison.equalsIgnoreCase("OVERLAPS")) {
				filter = RecommendationFilter.include(field).overlapsValues(expectations);
			} else {
				Log.d("Logs", "Not correct comparison value!");
			}
		} else if (type.equalsIgnoreCase("exclude")) {
			if (comparison.equalsIgnoreCase("IS")) {
				filter = RecommendationFilter.exclude(field).isValue(expectation);
			} else if (comparison.equalsIgnoreCase("IN")) {
				filter = RecommendationFilter.exclude(field).inValues(expectations);
			} else if (comparison.equalsIgnoreCase("HAS")) {
				filter = RecommendationFilter.exclude(field).hasValue(expectation);
			} else if (comparison.equalsIgnoreCase("OVERLAPS")) {
				filter = RecommendationFilter.exclude(field).overlapsValues(expectations);
			} else {
				Log.d("Logs", "Not correct comparison value!");
			}
		} else {
			Log.d("Logs", "Not correct type!");
		}
	
		if (filter != null) {
			filters.add(filter);
		}

		return filters;
	}

	public static Product convertMapToProduct(ReadableMap map) {
		String productId = "", title = "", linkUrl = "", feature = "", cohort = "";
		String imageUrl = null , zoomImageUrl = null, categoryPath = null, productDescription = null, album = null, actor = null, artist = null, author = null, brand = null;
		Map<String, String> customFields = new HashMap<>();
		Boolean available = null;
		Float price = null, msrp = null;
		Integer year = null;

		ReadableMapKeySetIterator iterator = map.keySetIterator();

		while (iterator.hasNextKey()) {
			String key = iterator.nextKey();
			ReadableType type = map.getType(key);
			switch (type) {
				case Null:
					Log.d("Logs", "Received null in map");
					break;
				case Boolean:
					available = map.getBoolean(key);
					break;
				case Number:
					switch (key) {
						case "price":
							price = (float) (map.getDouble("price"));
							break;
						case "msrp":
							msrp = (float) (map.getDouble("msrp"));
							break;
						case "year":
							year = map.getInt("year");
							break;
					}
				case String:
					switch (key) {
						case "productId":
							productId = map.getString("productId");
							break;
						case "title":
							title = map.getString("title");
							break;
						case "linkUrl":
							linkUrl = map.getString("linkUrl");
							break;
						case "feature":
							feature = map.getString("feature");
							break;
						case "cohort":
							cohort = map.getString("cohort");
							break;
						case "imageUrl":
							imageUrl = map.getString("imageUrl");
							break;
						case "zoomImageUrl":
							zoomImageUrl = map.getString("zoomImageUrl");
							break;
						case "categoryPath":
							categoryPath = map.getString("categoryPath");
							break;
						case "productDescription":
							productDescription = map.getString("productDescription");
							break;
						case "album":
							album = map.getString("album");
							break;
						case "actor":
							actor = map.getString("actor");
							break;
						case "artist":
							artist = map.getString("artist");
							break;
						case "author":
							author = map.getString("author");
							break;
						case "brand":
							brand = map.getString("brand");
							break;
			}
			
			case Map:
				ReadableMap customFieldsMap = map.getMap("customFields");
				ReadableMapKeySetIterator fieldsIterator = customFieldsMap.keySetIterator();
				
				while (fieldsIterator.hasNextKey()) {
					String fieldKey = fieldsIterator.nextKey();
					String fieldValue = customFieldsMap.getString(fieldKey);
					customFields.put(fieldKey, fieldValue);
				}
			}
		}

		return new Product(productId, title, linkUrl, feature, cohort,
				customFields,
				imageUrl,
				null,
				zoomImageUrl,
				null,
				categoryPath,
				available,
				productDescription,
				price,
				msrp,
				album,
				actor,
				artist,
				author,
				brand,
				year);
	}

	private static Map<String, String> convertMap(Map<String, Object> oldMap) {
		Map<String, String> ret = new HashMap<>();
		
		for (String key : oldMap.keySet()) {
			ret.put(key, oldMap.get(key).toString());
		}
		return ret;
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
			ReadableType type = readableMap.getType(key);
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

		try {
			while (iterator.hasNext()) {
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
			}
		} catch (JSONException ex){
			// Do nothing and fail silently
		}
		
		return writableMap;
	}
}
