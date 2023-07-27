package com.emarsysapp;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import androidx.core.app.NotificationManagerCompat;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.google.android.gms.tasks.Tasks;
import com.google.firebase.FirebaseApp;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.RemoteMessage;
import java.util.HashMap;
import java.util.Map;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import androidx.annotation.NonNull;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;


public class FirebaseMessagingModule extends ReactContextBaseJavaModule {
   FirebaseMessagingModule(ReactApplicationContext context) {
       super(context);
   }

   @Override
   public String getName() {
      return "FirebaseMessagingModule";
   }

     @ReactMethod
     public void getToken(Promise promise) {

       FirebaseMessaging.getInstance().getToken()
           .addOnCompleteListener(new OnCompleteListener<String> () {
           @Override
           public void onComplete(@NonNull Task<String> task) {
           if (task.isSuccessful()) {
          promise.resolve(task.getResult());
           }

           }
           });
     }

}

