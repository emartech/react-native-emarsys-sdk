package com.emarsys.reactnative.wrapper

import android.content.Context
import com.emarsys.Emarsys
import com.emarsys.reactnative.utils.EventUtils
import com.emarsys.reactnative.utils.MapUtils.toStringMap
import com.emarsys.reactnative.utils.MapUtils.toWritableMap
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import org.json.JSONObject

class NativeEmarsys(reactContext: ReactApplicationContext) : NativeEmarsysSpec(reactContext) {

  companion object {
    const val NAME = "NativeEmarsys"
  }

  override fun getName() = NAME

  override fun setEventHandler(promise: Promise) {
    EventUtils.setEventHandler { context: Context, eventName: String, payload: JSONObject? ->
      emitOnEvent(JSONObject().put("name", eventName).put("payload", payload).toWritableMap())
    }
    promise.resolve(null)
  }

  override fun setContact(contactFieldId: Double, contactFieldValue: String, promise: Promise) {
    try {
      Emarsys.setContact(contactFieldId.toInt(), contactFieldValue) { errorCause: Throwable? ->
        if (errorCause == null) {
          promise.resolve(null)
        } else {
          promise.reject(NAME, "setContact", errorCause)
        }
      }
    } catch (e: Exception) {
      promise.reject(NAME, "setContact", e)
    }
  }

  override fun clearContact(promise: Promise) {
    try {
      Emarsys.clearContact { errorCause: Throwable? ->
        if (errorCause == null) {
          promise.resolve(null)
        } else {
          promise.reject(NAME, "clearContact", errorCause)
        }
      }
    } catch (e: Exception) {
      promise.reject(NAME, "clearContact", e)
    }
  }

  override fun trackCustomEvent(eventName: String, eventAttributes: ReadableMap?, promise: Promise) {
    try {
      Emarsys.trackCustomEvent(eventName, eventAttributes?.toStringMap()) { errorCause: Throwable? ->
        if (errorCause == null) {
          promise.resolve(null)
        } else {
          promise.reject(NAME, "trackCustomEvent", errorCause)
        }
      }
    } catch (e: Exception) {
      promise.reject(NAME, "trackCustomEvent", e)
    }
  }

  override fun trackDeepLink(url: String, promise: Promise) {
    try {
      val activity = getReactApplicationContext().getCurrentActivity()
      val intent = activity?.intent
      val uri = intent?.data.toString()
      if (activity != null && intent != null && uri == url) {
        Emarsys.trackDeepLink(activity, intent) { errorCause: Throwable? ->
          if (errorCause == null) {
            promise.resolve(null)
          } else {
            promise.reject(NAME, "trackDeepLink", errorCause)
          }
        }
      }
    } catch (e: Exception) {
      promise.reject(NAME, "trackDeepLink", e)
    }
  }

}
