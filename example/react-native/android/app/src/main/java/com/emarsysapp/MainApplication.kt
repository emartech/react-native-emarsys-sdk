package com.emarsysapp

import android.app.Application
import android.app.NotificationChannel
import android.app.NotificationManager
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost

// Emarsys - imports
import com.emarsys.Emarsys
import com.emarsys.config.EmarsysConfig
import com.emarsys.reactnative.RNEmarsys

class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packageList =
        PackageList(this).packages.apply {
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // add(MyReactNativePackage())
        },
    )
  }

  override fun onCreate() {
    super.onCreate()
    loadReactNative(this)

    // Emarsys - SDK setup
    val config = EmarsysConfig(
      application = this,
      applicationCode = "EMS25-20071",
      merchantId = "1DF86BF95CBE8F19",
      verboseConsoleLoggingEnabled = true,
      sharedPackageNames = listOf("com.emarsysanotherapp"),
      sharedSecret = "emsSecret"
    )
    Emarsys.setup(config)
    RNEmarsys.setup()

    // Notification channel
    val notificationManager = getSystemService(NOTIFICATION_SERVICE) as NotificationManager
    val channel = NotificationChannel("ems_sample_messages", "Messages", NotificationManager.IMPORTANCE_HIGH)
    notificationManager.createNotificationChannel(channel)
  }
}
