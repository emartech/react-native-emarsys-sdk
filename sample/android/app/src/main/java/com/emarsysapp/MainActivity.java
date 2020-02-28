package com.emarsysapp;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactActivity;

import java.text.MessageFormat;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "EmarsysApp";
    }
    
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //setContentView(R.layout.main);

        Intent intent = getIntent();
        String action = intent.getAction();
        Uri data = intent.getData();

        Log.i("++++++++++++++++++ TRACK JAVA onCreate", MessageFormat.format("intent: {0}, action: {1}, URL: {2}", intent, action, data));
    }
    
    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);

        String action = intent.getAction();
        Uri data = intent.getData();

        Log.i("++++++++++++++++++ TRACK JAVA onNewIntent", MessageFormat.format("intent: {0}, action: {1}, URL: {2}", intent, action, data));
    }
}
