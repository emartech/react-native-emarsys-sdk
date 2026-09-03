package com.emarsys.reactnative

import android.content.Context
import android.content.Intent
import com.emarsys.reactnative.utils.MapUtils.toWritableMap
import com.facebook.react.HeadlessJsTaskService
import com.facebook.react.bridge.Arguments
import com.facebook.react.jstasks.HeadlessJsTaskConfig
import org.json.JSONObject

class RNEmarsysHeadlessJsTaskService : HeadlessJsTaskService() {

  companion object {
    const val TASK_NAME = "EmarsysSilentMessageEvent"
    const val EXTRA_EVENT_NAME = "eventName"
    const val EXTRA_PAYLOAD = "payload"

    fun start(context: Context, intent: Intent) {
      acquireWakeLockNow(context)
      context.startService(intent)
    }
  }

  override fun getTaskConfig(intent: Intent?): HeadlessJsTaskConfig? {
    val eventName = intent?.getStringExtra(EXTRA_EVENT_NAME) ?: return null
    val payload = intent.getStringExtra(EXTRA_PAYLOAD)?.let { it -> JSONObject(it) }
    val data = JSONObject().put("name", eventName).put("payload", payload).toWritableMap()
    return HeadlessJsTaskConfig(TASK_NAME, data, 30_000, true)
  }

}
