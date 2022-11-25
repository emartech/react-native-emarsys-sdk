package com.emarsys.rnwrapper;

import static com.emarsys.rnwrapper.MapUtil.mapPutNullable;
import static com.emarsys.rnwrapper.MapUtil.toWritableMap;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.emarsys.Emarsys;
import com.emarsys.core.api.result.ResultListener;
import com.emarsys.core.api.result.Try;
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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RNEmarsysPredictWrapperModule extends ReactContextBaseJavaModule {

    private static final String TAG = "RNEmarsysPredictWrapper";

    private final ReactApplicationContext reactContext;

    public RNEmarsysPredictWrapperModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return TAG;
    }

    @ReactMethod
    public void trackCart(@NonNull ReadableArray array, Promise promise) {
        try {
            List<CartItem> items = arrayToCartList(array);
            Emarsys.getPredict().trackCart(items);

            promise.resolve(true);
        } catch (Exception e) {
            promise.reject(TAG, "Error trackCart: ", e);
        }
    }

    @ReactMethod
    public void trackPurchase(@NonNull String orderId, @NonNull ReadableArray array, Promise promise) {
        try {
            List<CartItem> items = arrayToCartList(array);
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
    public void recommendProducts(@NonNull String logic, @Nullable ReadableMap logicOptions, @Nullable ReadableMap recommendationOptions, final Promise promise) {
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
            Logic recLogic = LogicParser.parseWithQuery(logic, query);
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
            List<CartItem> items = arrayToCartList(cartItems);
            Logic recLogic = LogicParser.parseWithCartItems(logic, items);
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
            Logic recLogic = LogicParser.parseWithVariants(logic, variantsList);
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
            Logic recLogic = LogicParser.parseWithQuery(logic, query);
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
            List<CartItem> items = arrayToCartList(cartItems);
            Logic recLogic = LogicParser.parseWithCartItems(logic, items);
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
            Logic recLogic = LogicParser.parseWithVariants(logic, variantsList);
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
            List<RecommendationFilter> recFilters = mapToRecommendationFilter(filters);
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
            Logic recLogic = LogicParser.parseWithQuery(logic, query);
            List<RecommendationFilter> recFilters = mapToRecommendationFilter(filters);
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
            List<CartItem> items = arrayToCartList(cartItems);
            Logic recLogic = LogicParser.parseWithCartItems(logic, items);
            List<RecommendationFilter> recFilters = mapToRecommendationFilter(filters);
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
            Logic recLogic = LogicParser.parseWithVariants(logic, variantsList);
            List<RecommendationFilter> recFilters = mapToRecommendationFilter(filters);
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
            List<RecommendationFilter> recFilters = mapToRecommendationFilter(filters);
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
            Logic recLogic = LogicParser.parseWithQuery(logic, query);
            List<RecommendationFilter> recFilters = mapToRecommendationFilter(filters);
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
            List<CartItem> items = arrayToCartList(cartItems);
            Logic recLogic = LogicParser.parseWithCartItems(logic, items);
            List<RecommendationFilter> recFilters = mapToRecommendationFilter(filters);
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
            Logic recLogic = LogicParser.parseWithVariants(logic, variantsList);
            List<RecommendationFilter> recFilters = mapToRecommendationFilter(filters);
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
            Product product = convertMapToProduct(map);
            Emarsys.getPredict().trackRecommendationClick(product);

            promise.resolve(true);
        } catch (Exception e) {
            promise.reject(TAG, "Error trackRecommendationClick: ", e);
        }
    }

    private List<CartItem> arrayToCartList(ReadableArray array) {
        int size = array.size();
        List<CartItem> items = new ArrayList<>();

        for (int i = 0; i < size; i++) {
            ReadableMap map = array.getMap(i);

            String itemId = "emptyId";
            double price = 0.0;
            double quantity = 0.0;

            if (map.hasKey("itemId")) itemId = map.getString("itemId");
            if (map.hasKey("price")) price = map.getDouble("price");
            if (map.hasKey("quantity")) quantity = map.getDouble("quantity");

            CartItem item = new CartItemImp(itemId, price, quantity);
            items.add(item);
        }

        return items;
    }

    private void resolveProducts(final Promise promise, @NonNull Try<List<Product>> result, String methodName) {
        if (result.getResult() != null) {
            List<Product> recommendedProducts = result.getResult();
            WritableArray products = Arguments.createArray();
            for (Product product : recommendedProducts) {
                WritableMap recProduct = convertProductToMap(product);
                products.pushMap(recProduct);
            }
            promise.resolve(products);
        }
        if (result.getErrorCause() != null) {
            promise.reject(TAG, "Error " + methodName + ": ", result.getErrorCause());
        }
    }

    private WritableMap convertProductToMap(Product product) {
        WritableMap map = Arguments.createMap();

        mapPutNullable(map, "productId", product.getProductId());
        mapPutNullable(map, "title", product.getTitle());
        mapPutNullable(map, "linkUrl", product.getLinkUrl().toString());
        mapPutNullable(map, "feature", product.getFeature());
        mapPutNullable(map, "cohort", product.getCohort());
        mapPutNullable(map, "imageUrl", product.getImageUrl());
        mapPutNullable(map, "zoomImageUrl", product.getZoomImageUrl());
        mapPutNullable(map, "categoryPath", product.getCategoryPath());
        mapPutNullable(map, "productDescription", product.getProductDescription());
        mapPutNullable(map, "album", product.getAlbum());
        mapPutNullable(map, "actor", product.getActor());
        mapPutNullable(map, "artist", product.getArtist());
        mapPutNullable(map, "author", product.getAuthor());
        mapPutNullable(map, "brand", product.getBrand());
        mapPutNullable(map, "available", product.getAvailable());
        mapPutNullable(map, "price", product.getPrice());
        mapPutNullable(map, "msrp", product.getMsrp());
        mapPutNullable(map, "year", product.getYear());

        Map<String, Object> customFields = new HashMap<String, Object>(product.getCustomFields());
        map.putMap("customFields", toWritableMap(customFields));

        return map;
    }

    private Product convertMapToProduct(ReadableMap map) {
        String productId = "", title = "", linkUrl = "", feature = "", cohort = "";
        String imageUrl = null , zoomImageUrl = null, categoryPath = null, productDescription = null, album = null, actor = null, artist = null, author = null, brand = null;
        Map<String, String> customFields = new HashMap<>();
        Boolean available = null;
        Float price = null, msrp = null;
        Integer year = null;

        ReadableMapKeySetIterator iterator = map.keySetIterator();

        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            ReadableType type = map.getType(key);
            switch (type) {
                case Null:
                    Log.d("Logs", "Received null in map");
                    break;
                case Boolean:
                    available = map.getBoolean(key);
                    break;
                case Number:
                    switch (key) {
                        case "price":
                            price = (float) (map.getDouble("price"));
                            break;
                        case "msrp":
                            msrp = (float) (map.getDouble("msrp"));
                            break;
                        case "year":
                            year = map.getInt("year");
                            break;
                    }
                case String:
                    switch (key) {
                        case "productId":
                            productId = map.getString("productId");
                            break;
                        case "title":
                            title = map.getString("title");
                            break;
                        case "linkUrl":
                            linkUrl = map.getString("linkUrl");
                            break;
                        case "feature":
                            feature = map.getString("feature");
                            break;
                        case "cohort":
                            cohort = map.getString("cohort");
                            break;
                        case "imageUrl":
                            imageUrl = map.getString("imageUrl");
                            break;
                        case "zoomImageUrl":
                            zoomImageUrl = map.getString("zoomImageUrl");
                            break;
                        case "categoryPath":
                            categoryPath = map.getString("categoryPath");
                            break;
                        case "productDescription":
                            productDescription = map.getString("productDescription");
                            break;
                        case "album":
                            album = map.getString("album");
                            break;
                        case "actor":
                            actor = map.getString("actor");
                            break;
                        case "artist":
                            artist = map.getString("artist");
                            break;
                        case "author":
                            author = map.getString("author");
                            break;
                        case "brand":
                            brand = map.getString("brand");
                            break;
                    }

                case Map:
                    ReadableMap customFieldsMap = map.getMap("customFields");
                    ReadableMapKeySetIterator fieldsIterator = customFieldsMap.keySetIterator();

                    while (fieldsIterator.hasNextKey()) {
                        String fieldKey = fieldsIterator.nextKey();
                        String fieldValue = customFieldsMap.getString(fieldKey);
                        customFields.put(fieldKey, fieldValue);
                    }
            }
        }

        return new Product(productId, title, linkUrl, feature, cohort,
                customFields,
                imageUrl,
                null,
                zoomImageUrl,
                null,
                categoryPath,
                available,
                productDescription,
                price,
                msrp,
                album,
                actor,
                artist,
                author,
                brand,
                year);
    }

    private List<RecommendationFilter> mapToRecommendationFilter(ReadableMap map) {

        List<RecommendationFilter> filters = new ArrayList<>();

        String type = "";
        String field = "";
        String comparison = "";
        String expectation = "";

        List<String> expectations = new ArrayList<>();

        RecommendationFilter filter = null;

        if (map.hasKey("type")) type = map.getString("type");
        if (map.hasKey("field")) field = map.getString("field");
        if (map.hasKey("comparison")) comparison = map.getString("comparison");

        if (map.hasKey("expectations") && map.getType("expectations") == ReadableType.Array ) {
            ReadableArray expArray = map.getArray("expectations");
            int expSize = expArray.size();

            for (int j = 0; j < expSize; j++) {
                expectation = expArray.getString(j);
                expectations.add(expectation);
            }
        }

        if (map.hasKey("expectations") && map.getType("expectations") == ReadableType.String ) {
            expectation = map.getString("expectations");
        }

        if (type.equalsIgnoreCase("include")) {
            if (comparison.equalsIgnoreCase("IS")) {
                filter = RecommendationFilter.include(field).isValue(expectation);
            } else if (comparison.equalsIgnoreCase("IN")) {
                filter = RecommendationFilter.include(field).inValues(expectations);
            } else if (comparison.equalsIgnoreCase("HAS")) {
                filter = RecommendationFilter.include(field).hasValue(expectation);
            } else if (comparison.equalsIgnoreCase("OVERLAPS")) {
                filter = RecommendationFilter.include(field).overlapsValues(expectations);
            } else {
                Log.d("Logs", "Not correct comparison value!");
            }
        } else if (type.equalsIgnoreCase("exclude")) {
            if (comparison.equalsIgnoreCase("IS")) {
                filter = RecommendationFilter.exclude(field).isValue(expectation);
            } else if (comparison.equalsIgnoreCase("IN")) {
                filter = RecommendationFilter.exclude(field).inValues(expectations);
            } else if (comparison.equalsIgnoreCase("HAS")) {
                filter = RecommendationFilter.exclude(field).hasValue(expectation);
            } else if (comparison.equalsIgnoreCase("OVERLAPS")) {
                filter = RecommendationFilter.exclude(field).overlapsValues(expectations);
            } else {
                Log.d("Logs", "Not correct comparison value!");
            }
        } else {
            Log.d("Logs", "Not correct type!");
        }

        if (filter != null) {
            filters.add(filter);
        }

        return filters;
    }

}
