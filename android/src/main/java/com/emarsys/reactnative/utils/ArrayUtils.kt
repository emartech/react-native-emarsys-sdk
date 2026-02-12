package com.emarsys.reactnative.utils

import com.emarsys.reactnative.utils.MapUtils.toWritableMap
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import org.json.JSONArray
import org.json.JSONObject

object ArrayUtils {

  fun <T> ReadableArray.toList(mapper: (readableMap: ReadableMap?) -> T?): List<T> {
    val list = mutableListOf<T>()
    for (i in 0..<this.size()) {
      val readableMap = this.getMap(i)
      val value = mapper(readableMap)

      if (value != null) {
        list.add(value)
      }
    }

    return list
  }

  fun ReadableArray.toStringList(): List<String> {
    val list = mutableListOf<String>()
    for (i in 0..<this.size()) {
      val value = this.getString(i)

      if (value != null) {
        list.add(value)
      }
    }

    return list
  }

  @Suppress("UNCHECKED_CAST")
  fun List<Any?>.toWritableArray(): WritableArray {
    val writableArray = Arguments.createArray()
    for (value in this) {
      when (value) {
        is String -> writableArray.pushString(value)
        is Double, is Float -> writableArray.pushDouble(value.toDouble())
        is Long -> writableArray.pushLong(value)
        is Int, is Number -> writableArray.pushInt(value.toInt())
        is Boolean -> writableArray.pushBoolean(value)
        is Map<*, *> -> writableArray.pushMap((value as? Map<String, Any?>)?.toWritableMap())
        is List<*> -> writableArray.pushArray((value as? List<Any?>)?.toWritableArray())
        is ReadableMap -> writableArray.pushMap(value)
        is ReadableArray -> writableArray.pushArray(value)
        null -> writableArray.pushNull()
        else -> writableArray.pushString(value.toString())
      }
    }

    return writableArray
  }

  fun <T> List<T>.toWritableArray(mapper: (value: T) -> WritableMap?): WritableArray {
    val writableArray = Arguments.createArray()
    for (value in this) {
      val writableMap = mapper(value)

      if (value != null) {
        writableArray.pushMap(writableMap)
      }
    }

    return writableArray
  }

  fun JSONArray.toWritableArray(): WritableArray {
    val writableArray = Arguments.createArray()
    for (i in 0..<this.length()) {
      val value = this.opt(i)

      when (value) {
        is String -> writableArray.pushString(this.getString(i))
        is Double -> writableArray.pushDouble(this.getDouble(i))
        is Long -> writableArray.pushLong(this.getLong(i))
        is Int, is Number -> writableArray.pushInt(this.getInt(i))
        is Boolean -> writableArray.pushBoolean(this.getBoolean(i))
        is JSONObject -> writableArray.pushMap(this.getJSONObject(i).toWritableMap())
        is JSONArray -> writableArray.pushArray(this.getJSONArray(i).toWritableArray())
        JSONObject.NULL, null -> writableArray.pushNull()
      }
    }

    return writableArray
  }

}
