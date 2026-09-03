// Expo plugin - START

package com.emarsys.reactnative.expo

import android.app.Application
import com.emarsys.Emarsys
import com.emarsys.reactnative.RNEmarsys
import com.emarsys.reactnative.utils.StorageUtils
import expo.modules.core.interfaces.ApplicationLifecycleListener

class EmarsysApplicationLifecycleListener : ApplicationLifecycleListener {

  override fun onCreate(application: Application) {
    super.onCreate(application)

    val config = StorageUtils.getEmarsysConfig(application)
    Emarsys.setup(config)
    RNEmarsys.setup()
  }

}

// Expo plugin - END */
