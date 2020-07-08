package com.emarsysapp;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.os.Build;

import androidx.annotation.RequiresApi;
import androidx.multidex.MultiDexApplication;

import com.emarsys.Emarsys;
import com.emarsys.config.EmarsysConfig;
import com.emarsys.rnwrapper.RNEmarsysEventHandler;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.List;

public class MainApplication extends MultiDexApplication implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();

    EmarsysConfig config = new EmarsysConfig.Builder()
            .application(this)
            .mobileEngageApplicationCode("EMS5C-F60E2")
            .contactFieldId(3)
            .predictMerchantId("1428C8EE286EC34B")
            .build();

    createNotificationChannels();
    Emarsys.setup(config);

    SoLoader.init(this, /* native exopackage */ false);

    // Has to come after SoLoader.init
    RNEmarsysEventHandler eventHandler = RNEmarsysEventHandler.getInstance();
    Emarsys.getInApp().setEventHandler(eventHandler);
    Emarsys.getPush().setNotificationEventHandler(eventHandler);
    Emarsys.getPush().setSilentMessageEventHandler(eventHandler);
    Emarsys.getGeofence().setEventHandler(eventHandler);
  }

  private void createNotificationChannels() {
        if (Build.VERSION.SDK_INT >= 26) {
            createNotificationChannel("ems_sample_news", "News", "News and updates go into this channel", NotificationManager.IMPORTANCE_HIGH);
            createNotificationChannel("ems_sample_messages", "Messages", "Important messages go into this channel", NotificationManager.IMPORTANCE_HIGH);
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    private void createNotificationChannel(String id, String name, String description, int importance) {
        NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        NotificationChannel channel = new NotificationChannel(id, name, importance);
        channel.setDescription(description);
        notificationManager.createNotificationChannel(channel);
    }
}
