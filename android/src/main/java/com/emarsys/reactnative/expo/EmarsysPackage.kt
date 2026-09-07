package com.emarsys.reactnative.expo

import android.content.Context
import expo.modules.core.interfaces.ApplicationLifecycleListener
import expo.modules.core.interfaces.Package

class EmarsysPackage : Package {

  override fun createApplicationLifecycleListeners(context: Context?): List<ApplicationLifecycleListener> {
    return listOf(EmarsysApplicationLifecycleListener())
  }

}
