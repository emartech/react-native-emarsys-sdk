package com.emarsys.rnwrapper;

import java.util.LinkedList;
import java.util.List;

import com.emarsys.Emarsys;
import com.emarsys.service.EmarsysMessagingServiceUtils;
import com.facebook.react.bridge.ReactContext;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class RNEmarsysMessagingService extends FirebaseMessagingService {
    private static LinkedList<RemoteMessage> pendingMessages = new LinkedList<>();
    private static String pendingPushToken = null;
    private static boolean isJSReady = false;

    @Override
    public void onNewToken(String token) {
        super.onNewToken(token);

        if (isJSReady) {
            Emarsys.getPush().setPushToken(token);
        } else {
            pendingPushToken = token;
        }
    }

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);

        if (isJSReady) {
            EmarsysMessagingServiceUtils.handleMessage(this, remoteMessage);
        } else {
            pendingMessages.push(remoteMessage);
        }
    }

    public static void notifyJSReady(ReactContext context) {
        isJSReady = true;

        if (pendingPushToken != null) {
            Emarsys.getPush().setPushToken(pendingPushToken);
            pendingPushToken = null;
        }
        while (pendingMessages.size() > 0) {
            RemoteMessage msg = pendingMessages.pop();
            EmarsysMessagingServiceUtils.handleMessage(context, msg);
        }
    }

}