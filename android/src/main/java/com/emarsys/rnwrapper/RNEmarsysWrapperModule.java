package com.emarsys.rnwrapper;

import android.content.Intent;
import android.os.Bundle;
import android.net.Uri;
import android.util.Log;

import android.app.Activity;

import androidx.annotation.Nullable;
import androidx.annotation.NonNull;

import com.emarsys.Emarsys;
import com.emarsys.config.EmarsysConfig;

import com.emarsys.core.api.result.CompletionListener;
import com.emarsys.core.api.result.ResultListener;
import com.emarsys.core.api.result.Try;

import com.emarsys.mobileengage.api.EventHandler;
import com.emarsys.mobileengage.api.NotificationEventHandler;

import com.emarsys.predict.api.model.CartItem;
import com.emarsys.predict.api.model.Product;

import com.emarsys.predict.api.model.Logic;
import com.emarsys.predict.api.model.RecommendationFilter;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableArray;

import java.text.MessageFormat;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

import android.content.Context;

import org.json.JSONObject;
import org.json.JSONException;

import java.lang.Exception;

public class RNEmarsysWrapperModule extends ReactContextBaseJavaModule
		implements EventHandler, NotificationEventHandler {

	private static final String TAG = "RNEmarsysWrapper";

	private final ReactApplicationContext reactContext;

	public RNEmarsysWrapperModule(ReactApplicationContext reactContext) {
		super(reactContext);
		this.reactContext = reactContext;
	}

	@Override // *********************************************************************************
	public String getName() {
		return TAG;
	}

	@Override // *********************************************************************************
	public void handleEvent(String eventName, @Nullable JSONObject payload) {
		Log.i(TAG,
				MessageFormat.format("EventHandler. handleEvent with eventName {0}, payload {1}", eventName, payload));
	}

	@Override // *********************************************************************************
	public void handleEvent(Context context, String eventName, @Nullable JSONObject payload) {
		Log.i(TAG,
				MessageFormat.format(
						"NotificationEventHandler. handleEvent with context {0}, eventName {1}, payload {2}", context,
						eventName, payload));
	}

	// MARK: - Init

	@ReactMethod // INIT
	// *************************************************************************
	public void init(@Nullable String applicationCode, @NonNull int contactFieldId, @Nullable String predictMerchantId,
			Promise promise) {
		try {
			EmarsysConfig config = new EmarsysConfig.Builder().application(getCurrentActivity().getApplication())
					.mobileEngageApplicationCode(applicationCode).contactFieldId(contactFieldId)
					.predictMerchantId(predictMerchantId).inAppEventHandler(this).notificationEventHandler(this)
					.build();

			Emarsys.setup(config);

			promise.resolve(config.toString());
		} catch (Exception e) {
			promise.reject(TAG, "Error init: ", e);
		}
	}

	@ReactMethod // LOGIN
	// ************************************************************************
	public void setContact(@NonNull final String contactFieldValue, final Promise promise) {
		try {
			Emarsys.setContact(contactFieldValue, new CompletionListener() {
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

	@ReactMethod // LOGOUT
	// ***********************************************************************
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

	@ReactMethod // ******************************************************************************
	public void trackCustomEvent(@NonNull final String eventName, @Nullable final ReadableMap eventAttributes,
			final Promise promise) {
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

	// MARK: - Push

	@ReactMethod // ******************************************************************************
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

	@ReactMethod // ******************************************************************************
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

	@ReactMethod // ******************************************************************************
	public void trackMessageOpen(@NonNull final String messageId, final Promise promise) {
		try {
			JSONObject userData = new JSONObject();
			userData.put("sid", messageId);

			Bundle userInfo = new Bundle();
			userInfo.putString("u", userData.toString());

			Intent payload = new Intent();
			payload.putExtra("payload", userInfo);

			Emarsys.getPush().trackMessageOpen(payload, new CompletionListener() {
				@Override
				public void onCompleted(@Nullable Throwable errorCause) {
					if (errorCause != null) {
						promise.reject(TAG, "Error trackMessageOpen: ", errorCause);
					} else {
						promise.resolve(true);
					}
				}
			});
		} catch (JSONException e) {
			promise.reject(TAG, "Error trackMessageOpen: ", e);
		}
	}

	// MARK: - InApp

	@ReactMethod // ******************************************************************************
	public void pause(Promise promise) {
		try {
			Emarsys.getInApp().pause();
			promise.resolve(true);
		} catch (Exception e) {
			promise.reject(TAG, "Error pause: ", e);
		}
	}

	@ReactMethod // ******************************************************************************
	public void resume(Promise promise) {
		try {
			Emarsys.getInApp().resume();
			promise.resolve(true);
		} catch (Exception e) {
			promise.reject(TAG, "Error resume: ", e);
		}
	}

	@ReactMethod // ******************************************************************************
	public void setEventHandler(final Promise promise) {
		try {
			final WritableMap eventData = new WritableNativeMap();

			Emarsys.getInApp().setEventHandler(new EventHandler() {
				@Override
				public void handleEvent(String eventName, @Nullable JSONObject payload) {
					eventData.putString("eventName", eventName);
					eventData.putMap("payload", MapUtil.jsonToWritableMap(payload));

					promise.resolve(eventData);
				}
			});
		} catch (Exception e) {
			promise.reject(TAG, "Error setEventHandler: ", e);
		}
	}

	// MARK: - Predict

	@ReactMethod // ******************************************************************************
	public void trackCart(@NonNull ReadableArray array, Promise promise) {
		try {
			List<CartItem> items = ArrayUtil.arrayToCartList(array);
			Emarsys.getPredict().trackCart(items);

			promise.resolve(true);
		} catch (Exception e) {
			promise.reject(TAG, "Error trackCart: ", e);
		}
	}

	@ReactMethod // ******************************************************************************
	public void trackPurchase(@NonNull String orderId, @NonNull ReadableArray array, Promise promise) {
		try {
			List<CartItem> items = ArrayUtil.arrayToCartList(array);
			Emarsys.getPredict().trackPurchase(orderId, items);

			promise.resolve(true);
		} catch (Exception e) {
			promise.reject(TAG, "Error trackPurchase: ", e);
		}
	}

	@ReactMethod // ******************************************************************************
	public void trackItemView(@NonNull String itemId, Promise promise) {
		try {
			Emarsys.getPredict().trackItemView(itemId);

			promise.resolve(true);
		} catch (Exception e) {
			promise.reject(TAG, "Error trackItemView: ", e);
		}
	}

	@ReactMethod // ******************************************************************************
	public void trackCategoryView(@NonNull String categoryPath, Promise promise) {
		try {
			Emarsys.getPredict().trackCategoryView(categoryPath);

			promise.resolve(true);
		} catch (Exception e) {
			promise.reject(TAG, "Error trackCategoryView: ", e);
		}
	}

	@ReactMethod // ******************************************************************************
	public void trackSearchTerm(@NonNull String searchTerm, Promise promise) {
		try {
			Emarsys.getPredict().trackSearchTerm(searchTerm);

			promise.resolve(true);
		} catch (Exception e) {
			promise.reject(TAG, "Error trackSearchTerm: ", e);
		}
	}

	@ReactMethod // ******************************************************************************
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

	@ReactMethod // ******************************************************************************
	public void recommendProducts(@NonNull String logic, final Promise promise) {
		try {
			Logic recLogic = LogicParser.parse(logic);
			Emarsys.getPredict().recommendProducts(recLogic, new ResultListener<Try<List<Product>>>() {
				@Override
				public void onResult(@NonNull Try<List<Product>> result) {
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
						promise.reject(TAG, "Error recommendProducts: ", result.getErrorCause());
					}
				}
			});
		} catch (Exception e) {
			promise.reject(TAG, "Error recommendProducts: ", e);
		}
	}

	@ReactMethod // ******************************************************************************
	public void recommendProductsQuery(@NonNull String logic, @NonNull String query, final Promise promise) {
		try {
			Logic recLogic = LogicParser.parse(logic, query);
			Emarsys.getPredict().recommendProducts(recLogic, new ResultListener<Try<List<Product>>>() {
				@Override
				public void onResult(@NonNull Try<List<Product>> result) {
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
						promise.reject(TAG, "Error recommendProductsQuery: ", result.getErrorCause());
					}
				}
			});
		} catch (Exception e) {
			promise.reject(TAG, "Error recommendProductsQuery: ", e);
		}
	}

	@ReactMethod // ******************************************************************************
	public void recommendProductsCartItems(@NonNull String logic, @NonNull ReadableArray cartItems,
			final Promise promise) {
		try {
			Logic recLogic = LogicParser.parse(logic, cartItems);
			Emarsys.getPredict().recommendProducts(recLogic, new ResultListener<Try<List<Product>>>() {
				@Override
				public void onResult(@NonNull Try<List<Product>> result) {
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
						promise.reject(TAG, "Error recommendProductsCartItems: ", result.getErrorCause());
					}
				}
			});
		} catch (Exception e) {
			promise.reject(TAG, "Error recommendProductsCartItems: ", e);
		}
	}

	@ReactMethod // ******************************************************************************
	public void recommendProductsLimit(@NonNull String logic, @NonNull Integer limit, final Promise promise) {
		try {
			Logic recLogic = LogicParser.parse(logic);
			Emarsys.getPredict().recommendProducts(recLogic, limit, new ResultListener<Try<List<Product>>>() {
				@Override
				public void onResult(@NonNull Try<List<Product>> result) {
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
						promise.reject(TAG, "Error recommendProductsLimit: ", result.getErrorCause());
					}
				}
			});
		} catch (Exception e) {
			promise.reject(TAG, "Error recommendProductsLimit: ", e);
		}
	}

	@ReactMethod // ******************************************************************************
	public void recommendProductsQueryLimit(@NonNull String logic, @NonNull String query, @NonNull Integer limit,
			final Promise promise) {
		try {
			Logic recLogic = LogicParser.parse(logic, query);
			Emarsys.getPredict().recommendProducts(recLogic, limit, new ResultListener<Try<List<Product>>>() {
				@Override
				public void onResult(@NonNull Try<List<Product>> result) {
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
						promise.reject(TAG, "Error recommendProductsQueryLimit: ", result.getErrorCause());
					}
				}
			});
		} catch (Exception e) {
			promise.reject(TAG, "Error recommendProductsQueryLimit: ", e);
		}
	}

	@ReactMethod // ******************************************************************************
	public void recommendProductsCartItemsLimit(@NonNull String logic, @NonNull ReadableArray cartItems,
			@NonNull Integer limit, final Promise promise) {
		try {
			Logic recLogic = LogicParser.parse(logic, cartItems);
			Emarsys.getPredict().recommendProducts(recLogic, limit, new ResultListener<Try<List<Product>>>() {
				@Override
				public void onResult(@NonNull Try<List<Product>> result) {
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
						promise.reject(TAG, "Error recommendProductsCartItemsLimit: ", result.getErrorCause());
					}
				}
			});
		} catch (Exception e) {
			promise.reject(TAG, "Error recommendProductsCartItemsLimit: ", e);
		}
	}

	@ReactMethod // ******************************************************************************
	public void recommendProductsFilters(@NonNull String logic, @NonNull ReadableMap filters, final Promise promise) {
		try {
			Logic recLogic = LogicParser.parse(logic);
			List<RecommendationFilter> recFilters = MapUtil.mapToRecommendationFilter(filters);
			Emarsys.getPredict().recommendProducts(recLogic, recFilters, new ResultListener<Try<List<Product>>>() {
				@Override
				public void onResult(@NonNull Try<List<Product>> result) {
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
						promise.reject(TAG, "Error recommendProductsFilters: ", result.getErrorCause());
					}
				}
			});
		} catch (Exception e) {
			promise.reject(TAG, "Error recommendProductsFilters: ", e);
		}
	}

	@ReactMethod // ******************************************************************************
	public void recommendProductsQueryFilters(@NonNull String logic, @NonNull String query,
			@NonNull ReadableMap filters, final Promise promise) {
		try {
			Logic recLogic = LogicParser.parse(logic, query);
			List<RecommendationFilter> recFilters = MapUtil.mapToRecommendationFilter(filters);
			Emarsys.getPredict().recommendProducts(recLogic, recFilters, new ResultListener<Try<List<Product>>>() {
				@Override
				public void onResult(@NonNull Try<List<Product>> result) {
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
						promise.reject(TAG, "Error recommendProductsQueryFilters: ", result.getErrorCause());
					}
				}
			});
		} catch (Exception e) {
			promise.reject(TAG, "Error recommendProductsQueryFilters: ", e);
		}
	}

	@ReactMethod // ******************************************************************************
	public void recommendProductsCartItemsFilters(@NonNull String logic, @NonNull ReadableArray cartItems,
			@NonNull ReadableMap filters, final Promise promise) {
		try {
			Logic recLogic = LogicParser.parse(logic, cartItems);
			List<RecommendationFilter> recFilters = MapUtil.mapToRecommendationFilter(filters);
			Emarsys.getPredict().recommendProducts(recLogic, recFilters, new ResultListener<Try<List<Product>>>() {
				@Override
				public void onResult(@NonNull Try<List<Product>> result) {
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
						promise.reject(TAG, "Error recommendProductsCartItemsFilters: ", result.getErrorCause());
					}
				}
			});
		} catch (Exception e) {
			promise.reject(TAG, "Error recommendProductsCartItemsFilters: ", e);
		}
	}

	@ReactMethod // ******************************************************************************
	public void recommendProductsLimitFilters(@NonNull String logic, @NonNull Integer limit,
			@NonNull ReadableMap filters, final Promise promise) {
		try {
			Logic recLogic = LogicParser.parse(logic);
			List<RecommendationFilter> recFilters = MapUtil.mapToRecommendationFilter(filters);
			Emarsys.getPredict().recommendProducts(recLogic, recFilters, limit,
					new ResultListener<Try<List<Product>>>() {
						@Override
						public void onResult(@NonNull Try<List<Product>> result) {
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
								promise.reject(TAG, "Error recommendProductsLimitFilters: ", result.getErrorCause());
							}
						}
					});
		} catch (Exception e) {
			promise.reject(TAG, "Error recommendProductsLimitFilters: ", e);
		}
	}

	@ReactMethod // ******************************************************************************
	public void recommendProductsQueryLimitFilters(@NonNull String logic, @NonNull String query, @NonNull Integer limit,
			@NonNull ReadableMap filters, final Promise promise) {
		try {
			Logic recLogic = LogicParser.parse(logic, query);
			List<RecommendationFilter> recFilters = MapUtil.mapToRecommendationFilter(filters);
			Emarsys.getPredict().recommendProducts(recLogic, recFilters, limit,
					new ResultListener<Try<List<Product>>>() {
						@Override
						public void onResult(@NonNull Try<List<Product>> result) {
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
								promise.reject(TAG, "Error recommendProductsQueryLimitFilters: ",
										result.getErrorCause());
							}
						}
					});
		} catch (Exception e) {
			promise.reject(TAG, "Error recommendProductsQueryLimitFilters: ", e);
		}
	}

	@ReactMethod // ******************************************************************************
	public void recommendProductsCartItemsLimitFilters(@NonNull String logic, @NonNull ReadableArray cartItems,
			@NonNull Integer limit, @NonNull ReadableMap filters, final Promise promise) {
		try {
			Logic recLogic = LogicParser.parse(logic, cartItems);
			List<RecommendationFilter> recFilters = MapUtil.mapToRecommendationFilter(filters);
			Emarsys.getPredict().recommendProducts(recLogic, recFilters, limit,
					new ResultListener<Try<List<Product>>>() {
						@Override
						public void onResult(@NonNull Try<List<Product>> result) {
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
								promise.reject(TAG, "Error recommendProductsCartItemsLimitFilters: ",
										result.getErrorCause());
							}
						}
					});
		} catch (Exception e) {
			promise.reject(TAG, "Error recommendProductsCartItemsLimitFilters: ", e);
		}
	}

	@ReactMethod // ******************************************************************************
	public void trackRecommendationClick(@NonNull ReadableMap map, Promise promise) {
		try {
			Product product = MapUtil.convertMapToProduct(map);
			Emarsys.getPredict().trackRecommendationClick(product);

			promise.resolve(true);
		} catch (Exception e) {
			promise.reject(TAG, "Error trackRecommendationClick: ", e);
		}
	}

	// MARK: - DeepLink

	@ReactMethod // ******************************************************************************
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

	// MARK: - ApplicationCode and merchantId change

	@ReactMethod // ******************************************************************************
	public void changeApplicationCode(@Nullable final String applicationCodeChange, final Promise promise) {
		try {
			Emarsys.getConfig().changeApplicationCode(applicationCodeChange, new CompletionListener() {
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

	@ReactMethod // ******************************************************************************
	public void changeMerchantId(@Nullable final String predictMerchantIdChange, Promise promise) {
		try {
			Emarsys.getConfig().changeMerchantId(predictMerchantIdChange);
			promise.resolve(true);
		} catch (Exception e) {
			promise.reject(TAG, "Error changeMerchantId: ", e);
		}
	}

	@ReactMethod // ******************************************************************************
	public void getApplicationCode(Promise promise) {
		try {
			String applicationCode = Emarsys.getConfig().getApplicationCode();
			promise.resolve(applicationCode);
		} catch (Exception e) {
			promise.reject(TAG, "Error getApplicationCode: ", e);
		}
	}

	@ReactMethod // ******************************************************************************
	public void getMerchantId(Promise promise) {
		try {
			String merchantId = Emarsys.getConfig().getMerchantId();
			promise.resolve(merchantId);
		} catch (Exception e) {
			promise.reject(TAG, "Error getMerchantId: ", e);
		}
	}

	@ReactMethod // ******************************************************************************
	public void getContactFieldId(Promise promise) {
		try {
			int contactFieldId = Emarsys.getConfig().getContactFieldId();
			promise.resolve(contactFieldId);
		} catch (Exception e) {
			promise.reject(TAG, "Error getContactFieldId: ", e);
		}
	}
}
