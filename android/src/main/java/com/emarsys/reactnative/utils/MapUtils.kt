package com.emarsys.reactnative.utils

import com.emarsys.reactnative.utils.ArrayUtils.toWritableArray
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import org.json.JSONArray
import org.json.JSONObject

object MapUtils {

  fun ReadableMap.toStringMap(): Map<String, String> {
    val map = mutableMapOf<String, String>()
    val iterator = this.keySetIterator()
    while (iterator.hasNextKey()) {
      val key = iterator.nextKey()
      val value = this.getString(key)

      if (value != null) {
        map[key] = value
      }
    }

    return map
  }

  @Suppress("UNCHECKED_CAST")
  fun WritableMap.put(key: String, value: Any?) {
    when (value) {
      is String -> this.putString(key, value)
      is Double, is Float -> this.putDouble(key, value.toDouble())
      is Long -> this.putLong(key, value)
      is Int, is Number -> this.putInt(key, value.toInt())
      is Boolean -> this.putBoolean(key, value)
      is Map<*, *> -> this.putMap(key, (value as? Map<String, Any?>)?.toWritableMap())
      is List<*> -> this.putArray(key, (value as? List<Any?>)?.toWritableArray())
      is ReadableMap -> this.putMap(key, value)
      is ReadableArray -> this.putArray(key, value)
      null -> {}
      else -> this.putString(key, value.toString())
    }
  }

  fun Map<String, Any?>.toWritableMap(): WritableMap {
    val writableMap = Arguments.createMap()
    for ((key, value) in this) {
      writableMap.put(key, value)
    }

    return writableMap
  }

  fun JSONObject.toWritableMap(): WritableMap {
    val writableMap = Arguments.createMap()
    val iterator = this.keys()
    while (iterator.hasNext()) {
      val key = iterator.next()
      val value = this.opt(key)

      when (value) {
        is String -> writableMap.putString(key, this.getString(key))
        is Double -> writableMap.putDouble(key, this.getDouble(key))
        is Long -> writableMap.putLong(key, this.getLong(key))
        is Int, is Number -> writableMap.putInt(key, this.getInt(key))
        is Boolean -> writableMap.putBoolean(key, this.getBoolean(key))
        is JSONObject -> writableMap.putMap(key, this.getJSONObject(key).toWritableMap())
        is JSONArray -> writableMap.putArray(key, this.getJSONArray(key).toWritableArray())
        JSONObject.NULL, null -> {}
      }
    }

    return writableMap
  }

}
