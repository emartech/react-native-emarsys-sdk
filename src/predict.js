import { NativeModules } from "react-native";

const { RNEmarsysPredictWrapper } = NativeModules;

const Predict = {
  /**
   * When you want to track the cart items in the basket, you can call the `trackCart()` method with a list of `CartItems`.
   * `CartItem` is an interface that can be used in your application for your own `CartItems` and then simply use the same items with the SDK.
   * @param {{itemId: string; price: number; quantity: number}[]} cartItems - Array of `cartItems`. Can be empty, if you want to track an empty cart.
   * 	- `itemId` - cartItem ID
   * 	- `price` - cartItem price
   * 	- `quantity` - cartItem quantity
   *
   * 	Empty cart:
   * 		`const cartItems = []`
   *
   * 	Cart with Items:
   * ```
   * 		const cartItems = [{
   * 			itemId: "ID of the Cart Item 1",
   * 			price: 1.66,
   * 			quantity: 26.4,
   * 		}, {
   * 			itemId: "ID of the Cart Item 2",
   * 			price: 2.88,
   * 			quantity: 56.5,
   * 		}]
   * ```
   *
   * @returns {Promise<boolean>} Promise with success or failure boolean.
   */
  trackCart(cartItems) {
    return RNEmarsysPredictWrapper.trackCart(cartItems);
  },

  /**
   * To report a purchase event, you should call `trackPurchase()` with the items purchased and an `orderId`.
   * @param {string} orderId - The order ID.
   * @param {{itemId: string; price: number; quantity: number}[]} cartItems - Array of `cartItems`. Can be empty, if you want to track an empty cart.
   * 	- `itemId` - cartItem ID
   * 	- `price` - cartItem price
   * 	- `quantity` - cartItem quantity
   *
   * 	Empty cart:
   * 		`const cartItems = []`
   *
   * 	Cart with Items:
   * ```
   * 		const cartItems = [{
   * 			itemId: "ID of the Cart Item 1",
   * 			price: 1.66,
   * 			quantity: 26.4,
   * 		}, {
   * 			itemId: "ID of the Cart Item 2",
   * 			price: 2.88,
   * 			quantity: 56.5,
   * 		}]
   * ```
   *
   * @returns {Promise<boolean>} Promise with success or failure boolean.
   */
  trackPurchase(orderId, cartItems) {
    return RNEmarsysPredictWrapper.trackPurchase(orderId, cartItems);
  },

  /**
   * If an item was viewed, use the `trackItemView()` method with an `itemId` as required parameter.
   * @param {string} itemId - ID of item that was viewed.
   * @returns {Promise<boolean>} Promise with success or failure boolean.
   */
  trackItemView(itemId) {
    return RNEmarsysPredictWrapper.trackItemView(itemId);
  },

  /**
   * When the user navigates between the categories, you should call `trackCategoryView()` in every navigation. Be aware to send `categoryPath` in the required format.
   * @param {string} categoryPath - Category path that was viewed.
   * @returns {Promise<boolean>} Promise with success or failure boolean.
   */
  trackCategoryView(categoryPath) {
    return RNEmarsysPredictWrapper.trackCategoryView(categoryPath);
  },

  /**
   * To report search terms entered by the contact, use `trackSearchTerm()` method.
   * @param {string} searchTerm - Term that was searched.
   * @returns {Promise<boolean>} Promise with success or failure boolean.
   */
  trackSearchTerm(searchTerm) {
    return RNEmarsysPredictWrapper.trackSearchTerm(searchTerm);
  },

  /**
   * To track custom tags, use the `trackTag()` method where the `eventName` parameter is required, but the `attributes` are optional.
   * @param {string} tagName - Tag name to track.
   * @param {Record<string, unknown>} tagAttributes - Optional tag attributes.
   *
   * Eg:
   *```
   * 	const tagAttributes = {
   *		"tag-key1": "tag-value1",
   *		"tag-key2": "tag-value2",
   * 	}
   *```
   * @returns {Promise<boolean>} Promise with success or failure boolean.
   */
  trackTag(tagName, tagAttributes) {
    return RNEmarsysPredictWrapper.trackTag(tagName, tagAttributes || null);
  },

  /**
   * With the Emarsys SDK you can ask for product recommendations based on different parameters.
   * @param {'SEARCH' | 'CART' | 'RELATED' | 'CATEGORY' | 'ALSO_BOUGHT' | 'POPULAR' | 'PERSONAL' | 'HOME'} logic - For more information of the recommender logics, please visit [the official documentation](https://help.emarsys.com/hc/en-us/articles/115004662189-Web-Recommender-logics "Official documentation").
   *
   * 	The currently supported logics are:
   *  - [`'SEARCH'`](https://help.emarsys.com/hc/en-us/articles/115004662189-Overview-Web-Recommender-logics#search1
   *    "'SEARCH' documentation") - based on `searchTerm`
   * 	- [`'CART'`](https://help.emarsys.com/hc/en-us/articles/115004662189-Overview-Web-Recommender-logics#cart "'CART' documentation") - based on `cartItems`
   * 	- [`'RELATED'`](https://help.emarsys.com/hc/en-us/articles/115004662189-Overview-Web-Recommender-logics#related "'RELATED' documentation") - based on `itemViewId`
   * 	- [`'CATEGORY'`](https://help.emarsys.com/hc/en-us/articles/115004662189-Overview-Web-Recommender-logics#category "'CATEGORY' documentation") - based on `categoryPath`
   * 	- [`'ALSO_BOUGHT'`](https://help.emarsys.com/hc/en-us/articles/115004662189-Overview-Web-Recommender-logics#also_bought "'ALSO_BOUGHT' documentation") - based on `itemViewId`
   * 	- [`'POPULAR'`](https://help.emarsys.com/hc/en-us/articles/115004662189-Overview-Web-Recommender-logics#popular "'POPULAR' documentation") - based on `categoryPath`
   * 	- [`'PERSONAL'`](https://help.emarsys.com/hc/en-us/articles/115004662189-Overview-Web-Recommender-logics#personal "'PERSONAL' documentation") - based on current browsing and activity
   * 	- [`'HOME'`](https://help.emarsys.com/hc/en-us/articles/115004662189-Overview-Web-Recommender-logics#home "'HOME' documentation") - based on most recent browsing behaviour
   *
   * @param {Record<'query', string> | Record<'cartItems', {itemId: string; price: number; quantity: number}[]> |
   * Record<'variants', string[]>} logicOptions - Options object for the logic.
   *
   *	The object key can either be `'query'`, `'cartItems'`, or `'variants'`:
   * 	- `query` - Query string extends recommended logics.
   *  Eg:
   *	```
   * 	let logicOptions = {
   * 		query: "Shoes>Pump"
   * 	}
   * ```
   *
   * 	- `cartItems` - Array of `cartItems`, can be empty.
   * Eg:
   * ```
   * 	let logicOptions = {
   * 		cartItems: [{
   *			itemId: "ID of the Cart Item 1",
   * 			price: 1.66,
   * 			quantity: 26.4,
   *		 }, {
   * 			itemId: "ID of the Cart Item 2",
   * 			price: 2.88,
   * 			quantity: 56.5,
   * 		}]
   * 	}
   * ```
   *
   * 	- `variants` - Array of variants.
   * Eg:
   * ```
   * 	let logicOptions = {
   * 		variants: ["1", "2", "3"]
   * 	}
   * ```
   *
   * @param {{availabilityZone?: string; limit?: number; filters?: {type: 'exclude' | 'include'; field: string;
   * comparison: 'is' | 'in' | 'has' | 'overlaps';
   * expectations: string | string[]}}} recommendationOptions - Options for recommendation.
   * 	- `availabilityZone` - You can personalize the recommendation further by setting the `availabilityZones` parameter of the recommendation, to only recommend the locally available products. This is an optional parameter.
   * 	- `limit` - You can limit the number of recommended products received by defining a limit. This is an optional parameter, by default its value is 5.
   * 	- `filters` - You can filter product recommendations with the SDK by building `RecommendationFilters`. This is an optional parameter.
   *    - `filters.type` - There are two types of filters: `exclude` or `include`.
   *    - `filters.field` - String extends `type` of recommended logics.
   *    - `filters.comparison` - In every case there are four types of comparators you can use to compare your chosen field to expectations:
   *      - `filters.comparison.is` - checking if the field is matching the value.
   *      - `filters.comparison.in` - any of the values has a match with the field.
   *      - `filters.comparison.has` - One of the field values is equal to expectation value (applicable only to fields containing multiple values).
   *      - `filters.comparison.overlaps` - One or more of the field values are found in expectation values (applicable only to fields containing multiple values).
   *    - `filters.expectations` - String or array of strings extends `comparison` of recommended logics.
   *
   * Eg:
   * ```
   *	let recommendationOptions = {
   * 		availabilityZone: "es",
   * 		limit: 10,
   * 		filters: [{
   * 			type: "include",
   * 			field: "category",
   * 			comparison: "is",
   * 			expectations: "Shoes>Pump"
   * 		}]
   *	}
   *```
   * @returns {Record<string, unknown>[]} Array of objects with recommended `Products`.
   */
  recommendProducts(logic, logicOptions, recommendationOptions) {
    return RNEmarsysPredictWrapper.recommendProducts(logic, logicOptions, recommendationOptions);
  },

  /**
   * @param {never} logic
   * @param {never} query
   * @returns {never}
   * @deprecated Please use {@link Predict.recommendProducts()} instead.
   */
  recommendProductsQuery(logic, query) {
    return RNEmarsysPredictWrapper.recommendProductsQuery(logic, query);
  },

  /**
   * @param {never} logic
   * @param {never} cartItems
   * @returns {never}
   * @deprecated Please use {@link Predict.recommendProducts()} instead.
   */
  recommendProductsCartItems(logic, cartItems) {
    return RNEmarsysPredictWrapper.recommendProductsCartItems(logic, cartItems);
  },

  /**
   * @param {never} logic
   * @param {never} variants
   * @returns {never}
   * @deprecated Please use {@link Predict.recommendProducts()} instead.
   */
  recommendProductsVariants(logic, variants) {
    return RNEmarsysPredictWrapper.recommendProductsVariants(logic, variants);
  },

  /**
   * @param {never} logic
   * @param {never} limit
   * @returns {never}
   * @deprecated Please use {@link Predict.recommendProducts()} instead.
   */
  recommendProductsLimit(logic, limit) {
    return RNEmarsysPredictWrapper.recommendProductsLimit(logic, limit);
  },

  /**
   * @param {never} logic
   * @param {never} query
   * @param {never} limit
   * @returns {never}
   * @deprecated Please use {@link Predict.recommendProducts()} instead.
   */
  recommendProductsQueryLimit(logic, query, limit) {
    return RNEmarsysPredictWrapper.recommendProductsQueryLimit(logic, query, limit);
  },

  /**
   * @param {never} logic
   * @param {never} cartItems
   * @param {never} limit
   * @returns {never}
   * @deprecated Please use {@link Predict.recommendProducts()} instead.
   */
  recommendProductsCartItemsLimit(logic, cartItems, limit) {
    return RNEmarsysPredictWrapper.recommendProductsCartItemsLimit(logic, cartItems, limit);
  },

  /**
   * @param {never} logic
   * @param {never} variants
   * @param {never} limit
   * @returns {never}
   * @deprecated Please use {@link Predict.recommendProducts()} instead.
   */
  recommendProductsVariantsLimit(logic, variants, limit) {
    return RNEmarsysPredictWrapper.recommendProductsVariantsLimit(logic, variants, limit);
  },

  /**
   * @param {never} logic
   * @param {never} filters
   * @returns {never}
   * @deprecated Please use {@link Predict.recommendProducts()} instead.
   */
  recommendProductsFilters(logic, filters) {
    return RNEmarsysPredictWrapper.recommendProductsFilters(logic, filters);
  },

  /**
   * @param {never} logic
   * @param {never} query
   * @param {never} filters
   * @returns {never}
   * @deprecated Please use {@link Predict.recommendProducts()} instead.
   */
  recommendProductsQueryFilters(logic, query, filters) {
    return RNEmarsysPredictWrapper.recommendProductsQueryFilters(logic, query, filters);
  },

  /**
   * @param {never} logic
   * @param {never} cartItems
   * @param {never} filters
   * @returns {never}
   * @deprecated Please use {@link Predict.recommendProducts()} instead.
   */
  recommendProductsCartItemsFilters(logic, cartItems, filters) {
    return RNEmarsysPredictWrapper.recommendProductsCartItemsFilters(logic, cartItems, filters);
  },

  /**
   * @param {never} logic
   * @param {never} variants
   * @param {never} filters
   * @returns {never}
   * @deprecated Please use {@link Predict.recommendProducts()} instead.
   */
  recommendProductsVariantsFilters(logic, variants, filters) {
    return RNEmarsysPredictWrapper.recommendProductsVariantsFilters(logic, variants, filters);
  },

  /**
   * @param {never} logic
   * @param {never} limit
   * @param {never} filters
   * @returns {never}
   * @deprecated Please use {@link Predict.recommendProducts()} instead.
   */
  recommendProductsLimitFilters(logic, limit, filters) {
    return RNEmarsysPredictWrapper.recommendProductsLimitFilters(logic, limit, filters);
  },

  /**
   * @param {never} logic
   * @param {never} query
   * @param {never} limit
   * @param {never} filters
   * @returns {never}
   * @deprecated Please use {@link Predict.recommendProducts()} instead.
   */
  recommendProductsQueryLimitFilters(logic, query, limit, filters) {
    return RNEmarsysPredictWrapper.recommendProductsQueryLimitFilters(logic, query, limit, filters);
  },

  /**
   * @param {never} logic
   * @param {never} cartItems
   * @param {never} limit
   * @param {never} filters
   * @returns {never}
   * @deprecated Please use {@link Predict.recommendProducts()} instead.
   */
  recommendProductsCartItemsLimitFilters(logic, cartItems, limit, filters) {
    return RNEmarsysPredictWrapper.recommendProductsCartItemsLimitFilters(logic, cartItems, limit, filters);
  },

  /**
   * @param {never} logic
   * @param {never} variants
   * @param {never} limit
   * @param {never} filters
   * @returns {never}
   * @deprecated Please use {@link Predict.recommendProducts()} instead.
   */
  recommendProductsVariantsLimitFilters(logic, variants, limit, filters) {
    return RNEmarsysPredictWrapper.recommendProductsVariantsLimitFilters(logic, variants, limit, filters);
  },

  /**
   * The Emarsys SDK doesn't track automatically `recommendationClicks`,
   * so you have to call manually `trackRecommendationClick()` when an interaction happens with any of the recommended products.
   * @param {Record<string, unknown>} product - Recommended product that was clicked.
   *
   * 	Eg:
   * ```
   * 	let product = {
   * 		productId: "productId", //String
   *			title: "title", //String
   *			linkUrl: "http://linkUrl.com/test", //URL
   *			feature: "feature", //String
   *			cohort: "awesome", //String
   *			imageUrl: "http://productURL.com/imageUrl", //String
   *			zoomImageUrl: "http://productURL.com/zoomImageUrl", //String
   *			categoryPath: "productCategoryPath", //String
   *			productDescription: "productDescription", //String
   *			album: "productAlbum", //String
   *			actor: "productActor", //String
   *			artist: "productArtist", //String
   *			author: "productAuthor", //String
   *			brand: "productBrand", //String
   *			customFields: {
   *				productTestKey1: "productTestValue1", //<String, String>
   *				productTestKey2: "productTestValue2", //<String, String>
   * 			productTestKey3: "productTestValue3", //<String, String>
   * 		},
   * 		available: true, //Boolean
   * 		price: 45.67, //Float
   * 		msrp: 2.45, //Float
   * 		year: 2019, //Integer
   * 	}
   *```
   * @returns {Promise<boolean>} Promise with success or failure boolean.
   */
  trackRecommendationClick(product) {
    return RNEmarsysPredictWrapper.trackRecommendationClick(product);
  },
};

export default Predict;
