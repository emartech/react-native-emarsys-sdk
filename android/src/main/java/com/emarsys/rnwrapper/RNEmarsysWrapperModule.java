package com.emarsys.rnwrapper;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.emarsys.Emarsys;
import com.emarsys.core.api.result.CompletionListener;
import com.emarsys.core.api.result.ResultListener;
import com.emarsys.core.api.result.Try;
import com.emarsys.mobileengage.api.inbox.InboxResult;
import com.emarsys.mobileengage.api.inbox.Message;
import com.emarsys.predict.api.model.CartItem;
import com.emarsys.predict.api.model.Logic;
import com.emarsys.predict.api.model.Product;
import com.emarsys.predict.api.model.RecommendationFilter;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RNEmarsysWrapperModule extends ReactContextBaseJavaModule {

    private static final String TAG = "RNEmarsysWrapper";

    private final ReactApplicationContext reactContext;

    public RNEmarsysWrapperModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return TAG;
    }

    @ReactMethod
    public void setContact(@NonNull Integer contactFieldId, @NonNull final String contactFieldValue, final Promise promise) {
        try {
            Emarsys.setContact(contactFieldId, contactFieldValue, new CompletionListener() {
                @Override
                public void onCompleted(@Nullable Throwable errorCause) {
                    if (errorCause != null) {
                        promise.reject(TAG, "Error setContact: ", errorCause);
                    } else {
                        promise.resolve(true);
                    }
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error setContact: ", e);
        }
    }

    @ReactMethod
    public void clearContact(final Promise promise) {
        try {
            Emarsys.clearContact(new CompletionListener() {
                @Override
                public void onCompleted(@Nullable Throwable errorCause) {
                    if (errorCause != null) {
                        promise.reject(TAG, "Error clearContact: ", errorCause);
                    } else {
                        promise.resolve(true);
                    }
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error clearContact: ", e);
        }
    }

    @ReactMethod
    public void trackCustomEvent(@NonNull final String eventName, @Nullable final ReadableMap eventAttributes, final Promise promise) {
        try {
            Map<String, String> eventAttributesMap = new HashMap<String, String>();
            ReadableMapKeySetIterator iterator = eventAttributes.keySetIterator();

            while (iterator.hasNextKey()) {
                String key = iterator.nextKey();
                ReadableType type = eventAttributes.getType(key);
                switch (type) {
                    case String:
                        eventAttributesMap.put(key, eventAttributes.getString(key));
                        break;
                    default:
                        throw new IllegalArgumentException("Could not convert object with key: " + key + ".");
                }
            }

            Emarsys.trackCustomEvent(eventName, eventAttributesMap, new CompletionListener() {
                @Override
                public void onCompleted(@Nullable Throwable errorCause) {
                    if (errorCause != null) {
                        promise.reject(TAG, "Error trackCustomEvent: ", errorCause);
                    } else {
                        promise.resolve(true);
                    }
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error trackCustomEvent: ", e);
        }
    }

    @ReactMethod
    public void setPushToken(@NonNull final String pushToken, final Promise promise) {
        try {
            Emarsys.getPush().setPushToken(pushToken, new CompletionListener() {
                @Override
                public void onCompleted(@Nullable Throwable errorCause) {
                    if (errorCause != null) {
                        promise.reject(TAG, "Error setPushToken: ", errorCause);
                    } else {
                        promise.resolve(true);
                    }
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error setPushToken: ", e);
        }
    }

    @ReactMethod
    public void clearPushToken(final Promise promise) {
        try {
            Emarsys.getPush().clearPushToken(new CompletionListener() {
                @Override
                public void onCompleted(@Nullable Throwable errorCause) {
                    if (errorCause != null) {
                        promise.reject(TAG, "Error clearPushToken: ", errorCause);
                    } else {
                        promise.resolve(true);
                    }
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error clearPushToken: ", e);
        }
    }

    @ReactMethod
    public void pause(Promise promise) {
        try {
            Emarsys.getInApp().pause();
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject(TAG, "Error pause: ", e);
        }
    }

    @ReactMethod
    public void resume(Promise promise) {
        try {
            Emarsys.getInApp().resume();
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject(TAG, "Error resume: ", e);
        }
    }

    @ReactMethod
    public void trackCart(@NonNull ReadableArray array, Promise promise) {
        try {
            List<CartItem> items = ArrayUtil.arrayToCartList(array);
            Emarsys.getPredict().trackCart(items);

            promise.resolve(true);
        } catch (Exception e) {
            promise.reject(TAG, "Error trackCart: ", e);
        }
    }

    @ReactMethod
    public void trackPurchase(@NonNull String orderId, @NonNull ReadableArray array, Promise promise) {
        try {
            List<CartItem> items = ArrayUtil.arrayToCartList(array);
            Emarsys.getPredict().trackPurchase(orderId, items);

            promise.resolve(true);
        } catch (Exception e) {
            promise.reject(TAG, "Error trackPurchase: ", e);
        }
    }

    @ReactMethod
    public void trackItemView(@NonNull String itemId, Promise promise) {
        try {
            Emarsys.getPredict().trackItemView(itemId);

            promise.resolve(true);
        } catch (Exception e) {
            promise.reject(TAG, "Error trackItemView: ", e);
        }
    }

    @ReactMethod
    public void trackCategoryView(@NonNull String categoryPath, Promise promise) {
        try {
            Emarsys.getPredict().trackCategoryView(categoryPath);

            promise.resolve(true);
        } catch (Exception e) {
            promise.reject(TAG, "Error trackCategoryView: ", e);
        }
    }

    @ReactMethod
    public void trackSearchTerm(@NonNull String searchTerm, Promise promise) {
        try {
            Emarsys.getPredict().trackSearchTerm(searchTerm);

            promise.resolve(true);
        } catch (Exception e) {
            promise.reject(TAG, "Error trackSearchTerm: ", e);
        }
    }

    @ReactMethod
    public void trackTag(@NonNull String tagName, @Nullable ReadableMap tagAttributes, Promise promise) {
        try {
            Map<String, String> tagAttributesMap = new HashMap<String, String>();
            ReadableMapKeySetIterator iterator = tagAttributes.keySetIterator();
            while (iterator.hasNextKey()) {
                String key = iterator.nextKey();
                ReadableType type = tagAttributes.getType(key);
                switch (type) {
                    case String:
                        tagAttributesMap.put(key, tagAttributes.getString(key));
                        break;
                    default:
                        throw new IllegalArgumentException("Could not convert object with key: " + key + ".");
                }
            }

            Emarsys.getPredict().trackTag(tagName, tagAttributesMap);

            promise.resolve(true);

        } catch (Exception e) {
            promise.reject(TAG, "Error trackTag: ", e);
        }
    }

    @ReactMethod
    public void recommendProducts(@NonNull String logic, final Promise promise) {
        try {
            Logic recLogic = LogicParser.parse(logic);
            Emarsys.getPredict().recommendProducts(recLogic, new ResultListener<Try<List<Product>>>() {
                @Override
                public void onResult(@NonNull Try<List<Product>> result) {
                    resolveProducts(promise, result, "recommendProducts");
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error recommendProducts: ", e);
        }
    }

    @ReactMethod
    public void recommendProductsQuery(@NonNull String logic, @NonNull String query, final Promise promise) {
        try {
            Logic recLogic = LogicParser.parse(logic, query);
            Emarsys.getPredict().recommendProducts(recLogic, new ResultListener<Try<List<Product>>>() {
                @Override
                public void onResult(@NonNull Try<List<Product>> result) {
                    resolveProducts(promise, result, "recommendProductsQuery");
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error recommendProductsQuery: ", e);
        }
    }

    @ReactMethod
    public void recommendProductsCartItems(@NonNull String logic, @NonNull ReadableArray cartItems, final Promise promise) {
        try {
            Logic recLogic = LogicParser.parse(logic, cartItems);
            Emarsys.getPredict().recommendProducts(recLogic, new ResultListener<Try<List<Product>>>() {
                @Override
                public void onResult(@NonNull Try<List<Product>> result) {
                    resolveProducts(promise, result, "recommendProductsCartItems");
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error recommendProductsCartItems: ", e);
        }
    }

    @ReactMethod
    public void recommendProductsVariants(@NonNull String logic, @NonNull ReadableArray variants, final Promise promise) {
        try {
            List variantsList = Arrays.asList(ArrayUtil.toArray(variants));
            Logic recLogic = LogicParser.parse(logic, variantsList);
            Emarsys.getPredict().recommendProducts(recLogic, new ResultListener<Try<List<Product>>>() {
                @Override
                public void onResult(@NonNull Try<List<Product>> result) {
                    resolveProducts(promise, result, "recommendProductsVariants");
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error recommendProductsVariants: ", e);
        }
    }

    @ReactMethod
    public void recommendProductsLimit(@NonNull String logic, @NonNull Integer limit, final Promise promise) {
        try {
            Logic recLogic = LogicParser.parse(logic);
            Emarsys.getPredict().recommendProducts(recLogic, limit, new ResultListener<Try<List<Product>>>() {
                @Override
                public void onResult(@NonNull Try<List<Product>> result) {
                    resolveProducts(promise, result, "recommendProductsLimit");
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error recommendProductsLimit: ", e);
        }
    }

    @ReactMethod
    public void recommendProductsQueryLimit(@NonNull String logic, @NonNull String query, @NonNull Integer limit, final Promise promise) {
        try {
            Logic recLogic = LogicParser.parse(logic, query);
            Emarsys.getPredict().recommendProducts(recLogic, limit, new ResultListener<Try<List<Product>>>() {
                @Override
                public void onResult(@NonNull Try<List<Product>> result) {
                    resolveProducts(promise, result, "recommendProductsQueryLimit");
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error recommendProductsQueryLimit: ", e);
        }
    }

    @ReactMethod
    public void recommendProductsCartItemsLimit(@NonNull String logic, @NonNull ReadableArray cartItems, @NonNull Integer limit, final Promise promise) {
        try {
            Logic recLogic = LogicParser.parse(logic, cartItems);
            Emarsys.getPredict().recommendProducts(recLogic, limit, new ResultListener<Try<List<Product>>>() {
                @Override
                public void onResult(@NonNull Try<List<Product>> result) {
                    resolveProducts(promise, result, "recommendProductsCartItemsLimit");
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error recommendProductsCartItemsLimit: ", e);
        }
    }

    @ReactMethod
    public void recommendProductsVariantsLimit(@NonNull String logic, @NonNull ReadableArray variants, @NonNull Integer limit, final Promise promise) {
        try {
            List variantsList = Arrays.asList(ArrayUtil.toArray(variants));
            Logic recLogic = LogicParser.parse(logic, variantsList);
            Emarsys.getPredict().recommendProducts(recLogic, limit, new ResultListener<Try<List<Product>>>() {
                @Override
                public void onResult(@NonNull Try<List<Product>> result) {
                    resolveProducts(promise, result, "recommendProductsVariantsLimit");
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error recommendProductsVariantsLimit: ", e);
        }
    }

    @ReactMethod
    public void recommendProductsFilters(@NonNull String logic, @NonNull ReadableMap filters, final Promise promise) {
        try {
            Logic recLogic = LogicParser.parse(logic);
            List<RecommendationFilter> recFilters = MapUtil.mapToRecommendationFilter(filters);
            Emarsys.getPredict().recommendProducts(recLogic, recFilters, new ResultListener<Try<List<Product>>>() {
                @Override
                public void onResult(@NonNull Try<List<Product>> result) {
                    resolveProducts(promise, result, "recommendProductsFilters");
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error recommendProductsFilters: ", e);
        }
    }

    @ReactMethod
    public void recommendProductsQueryFilters(@NonNull String logic, @NonNull String query, @NonNull ReadableMap filters, final Promise promise) {
        try {
            Logic recLogic = LogicParser.parse(logic, query);
            List<RecommendationFilter> recFilters = MapUtil.mapToRecommendationFilter(filters);
            Emarsys.getPredict().recommendProducts(recLogic, recFilters, new ResultListener<Try<List<Product>>>() {
                @Override
                public void onResult(@NonNull Try<List<Product>> result) {
                    resolveProducts(promise, result, "recommendProductsQueryFilters");
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error recommendProductsQueryFilters: ", e);
        }
    }

    @ReactMethod
    public void recommendProductsCartItemsFilters(@NonNull String logic, @NonNull ReadableArray cartItems, @NonNull ReadableMap filters, final Promise promise) {
        try {
            Logic recLogic = LogicParser.parse(logic, cartItems);
            List<RecommendationFilter> recFilters = MapUtil.mapToRecommendationFilter(filters);
            Emarsys.getPredict().recommendProducts(recLogic, recFilters, new ResultListener<Try<List<Product>>>() {
                @Override
                public void onResult(@NonNull Try<List<Product>> result) {
                    resolveProducts(promise, result, "recommendProductsCartItemsFilters");
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error recommendProductsCartItemsFilters: ", e);
        }
    }

    @ReactMethod
    public void recommendProductsVariantsFilters(@NonNull String logic, @NonNull ReadableArray variants, @NonNull ReadableMap filters, final Promise promise) {
        try {
            List variantsList = Arrays.asList(ArrayUtil.toArray(variants));
            Logic recLogic = LogicParser.parse(logic, variantsList);
            List<RecommendationFilter> recFilters = MapUtil.mapToRecommendationFilter(filters);
            Emarsys.getPredict().recommendProducts(recLogic, recFilters, new ResultListener<Try<List<Product>>>() {
                @Override
                public void onResult(@NonNull Try<List<Product>> result) {
                    resolveProducts(promise, result, "recommendProductsVariantsFilters");
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error recommendProductsVariantsFilters: ", e);
        }
    }

    @ReactMethod
    public void recommendProductsLimitFilters(@NonNull String logic, @NonNull Integer limit, @NonNull ReadableMap filters, final Promise promise) {
        try {
            Logic recLogic = LogicParser.parse(logic);
            List<RecommendationFilter> recFilters = MapUtil.mapToRecommendationFilter(filters);
            Emarsys.getPredict().recommendProducts(recLogic, recFilters, limit, new ResultListener<Try<List<Product>>>() {
                @Override
                public void onResult(@NonNull Try<List<Product>> result) {
                    resolveProducts(promise, result, "recommendProductsLimitFilters");
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error recommendProductsLimitFilters: ", e);
        }
    }

    @ReactMethod
    public void recommendProductsQueryLimitFilters(@NonNull String logic, @NonNull String query, @NonNull Integer limit, @NonNull ReadableMap filters, final Promise promise) {
        try {
            Logic recLogic = LogicParser.parse(logic, query);
            List<RecommendationFilter> recFilters = MapUtil.mapToRecommendationFilter(filters);
            Emarsys.getPredict().recommendProducts(recLogic, recFilters, limit, new ResultListener<Try<List<Product>>>() {
                @Override
                public void onResult(@NonNull Try<List<Product>> result) {
                    resolveProducts(promise, result, "recommendProductsQueryLimitFilters");
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error recommendProductsQueryLimitFilters: ", e);
        }
    }

    @ReactMethod
    public void recommendProductsCartItemsLimitFilters(@NonNull String logic, @NonNull ReadableArray cartItems, @NonNull Integer limit, @NonNull ReadableMap filters, final Promise promise) {
        try {
            Logic recLogic = LogicParser.parse(logic, cartItems);
            List<RecommendationFilter> recFilters = MapUtil.mapToRecommendationFilter(filters);
            Emarsys.getPredict().recommendProducts(recLogic, recFilters, limit, new ResultListener<Try<List<Product>>>() {
                @Override
                public void onResult(@NonNull Try<List<Product>> result) {
                    resolveProducts(promise, result, "recommendProductsCartItemsLimitFilters");
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error recommendProductsCartItemsLimitFilters: ", e);
        }
    }

    @ReactMethod
    public void recommendProductsVariantsLimitFilters(@NonNull String logic, @NonNull ReadableArray variants, @NonNull Integer limit, @NonNull ReadableMap filters, final Promise promise) {
        try {
            List variantsList = Arrays.asList(ArrayUtil.toArray(variants));
            Logic recLogic = LogicParser.parse(logic, variantsList);
            List<RecommendationFilter> recFilters = MapUtil.mapToRecommendationFilter(filters);
            Emarsys.getPredict().recommendProducts(recLogic, recFilters, limit, new ResultListener<Try<List<Product>>>() {
                @Override
                public void onResult(@NonNull Try<List<Product>> result) {
                    resolveProducts(promise, result, "recommendProductsCartItemsLimitFilters");
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error recommendProductsCartItemsLimitFilters: ", e);
        }
    }

    @ReactMethod
    public void trackRecommendationClick(@NonNull ReadableMap map, Promise promise) {
        try {
            Product product = MapUtil.convertMapToProduct(map);
            Emarsys.getPredict().trackRecommendationClick(product);

            promise.resolve(true);
        } catch (Exception e) {
            promise.reject(TAG, "Error trackRecommendationClick: ", e);
        }
    }

    @ReactMethod
    public void trackDeepLink(@Nullable final String userActivity, final Promise promise) {
        try {
            Activity activity = getCurrentActivity();
            Intent intent = activity.getIntent();
            Uri data = intent.getData();
            String URL = "";

            if (data != null) {
                URL = data.toString();
            }

            if (userActivity != null && userActivity.equals(URL)) {
                Emarsys.trackDeepLink(activity, intent, new CompletionListener() {
                    @Override
                    public void onCompleted(@Nullable Throwable errorCause) {
                        if (errorCause != null) {
                            promise.reject(TAG, "Error trackDeepLink: ", errorCause);
                        } else {
                            promise.resolve(true);
                        }
                    }
                });
            }
        } catch (Exception e) {
            promise.reject(TAG, "Error trackDeepLink: ", e);
        }
    }

    @ReactMethod
    public void changeApplicationCode(@NonNull final String applicationCode, final Promise promise) {
        try {
            Emarsys.getConfig().changeApplicationCode(applicationCode, new CompletionListener() {
                @Override
                public void onCompleted(@Nullable Throwable errorCause) {
                    if (errorCause != null) {
                        promise.reject(TAG, "Error changeApplicationCode: ", errorCause);
                    } else {
                        promise.resolve(true);
                    }
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error changeApplicationCode: ", e);
        }
    }

    @ReactMethod
    public void changeMerchantId(@NonNull final String merchantId, Promise promise) {
        try {
            Emarsys.getConfig().changeMerchantId(merchantId);
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject(TAG, "Error changeMerchantId: ", e);
        }
    }

    @ReactMethod
    public void getApplicationCode(Promise promise) {
        try {
            String applicationCode = Emarsys.getConfig().getApplicationCode();
            promise.resolve(applicationCode);
        } catch (Exception e) {
            promise.reject(TAG, "Error getApplicationCode: ", e);
        }
    }

    @ReactMethod
    public void getMerchantId(Promise promise) {
        try {
            String merchantId = Emarsys.getConfig().getMerchantId();
            promise.resolve(merchantId);
        } catch (Exception e) {
            promise.reject(TAG, "Error getMerchantId: ", e);
        }
    }

    @ReactMethod
    public void getContactFieldId(Promise promise) {
        try {
            int contactFieldId = Emarsys.getConfig().getContactFieldId();
            promise.resolve(contactFieldId);
        } catch (Exception e) {
            promise.reject(TAG, "Error getContactFieldId: ", e);
        }
    }

    @ReactMethod
    public void getHardwareId(Promise promise) {
        try {
            String hardwareId = Emarsys.getConfig().getHardwareId();
            promise.resolve(hardwareId);
        } catch (Exception e) {
            promise.reject(TAG, "Error getHardwareId: ", e);
        }
    }

    @ReactMethod
    public void getLanguageCode(Promise promise) {
        try {
            String languageCode = Emarsys.getConfig().getLanguageCode();
            promise.resolve(languageCode);
        } catch (Exception e) {
            promise.reject(TAG, "Error getLanguageCode: ", e);
        }
    }

    @ReactMethod
    public void getSdkVersion(Promise promise) {
        try {
            String sdkVersion = Emarsys.getConfig().getSdkVersion();
            promise.resolve(sdkVersion);
        } catch (Exception e) {
            promise.reject(TAG, "Error getSdkVersion: ", e);
        }
    }

    @ReactMethod
    public void getPushToken(Promise promise) {
        try {
            String pushToken = Emarsys.getPush().getPushToken();
            promise.resolve(pushToken);
        } catch (Exception e) {
            promise.reject(TAG, "Error getPushToken: ", e);
        }
    }

    @ReactMethod
    public void fetchMessages(final Promise promise) {
        try {
            Emarsys.getMessageInbox().fetchMessages(new ResultListener<Try<InboxResult>>() {
                @Override
                public void onResult(@NonNull Try<InboxResult> result) {
                    resolveMessages(promise, result, "fetchMessages");
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error fetchMessages: ", e);
        }
    }

    @ReactMethod
    public void setEventHandler() {
        RNEmarsysEventHandler.getInstance().provideReactContext(reactContext);
    }

    private void resolveProducts(final Promise promise, @NonNull Try<List<Product>> result, String methodName) {
        if (result.getResult() != null) {
            List<Product> recommendedProducts = result.getResult();
            WritableArray products = Arguments.createArray();
            for (Product product : recommendedProducts) {
                WritableMap recProduct = MapUtil.convertProductToMap(product);
                products.pushMap(recProduct);
            }
            promise.resolve(products);
        }
        if (result.getErrorCause() != null) {
            promise.reject(TAG, "Error " + methodName + ": ", result.getErrorCause());
        }
    }

    private void resolveMessages(final Promise promise, @NonNull Try<InboxResult> result, String methodName) {
        if (result.getResult() != null) {
            List<Message> inboxMessages = result.getResult().getMessages();
            WritableArray messages = Arguments.createArray();
            for (Message message : inboxMessages) {
                WritableMap recMessage = MapUtil.convertMessageToMap(message);
                messages.pushMap(recMessage);
            }
            promise.resolve(messages);
        }
        if (result.getErrorCause() != null) {
            promise.reject(TAG, "Error " + methodName + ": ", result.getErrorCause());
        }
    }

    @ReactMethod
    public void addTag(@NonNull String tag, @NonNull String messageId, final Promise promise) {
        try {
            Emarsys.getMessageInbox().addTag(tag, messageId, new CompletionListener() {
                @Override
                public void onCompleted(@Nullable Throwable errorCause) {
                    if (errorCause != null) {
                        promise.reject(TAG, "Error addTag: ", errorCause);
                    } else {
                        promise.resolve(true);
                    }
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error trackPurchase: ", e);
        }
    }

    @ReactMethod
    public void removeTag(@NonNull String tag, @NonNull String messageId, final Promise promise) {
        try {
            Emarsys.getMessageInbox().removeTag(tag, messageId, new CompletionListener() {
                @Override
                public void onCompleted(@Nullable Throwable errorCause) {
                    if (errorCause != null) {
                        promise.reject(TAG, "Error removeTag: ", errorCause);
                    } else {
                        promise.resolve(true);
                    }
                }
            });
        } catch (Exception e) {
            promise.reject(TAG, "Error trackPurchase: ", e);
        }
    }
}
