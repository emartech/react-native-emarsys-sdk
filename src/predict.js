import { NativeModules } from 'react-native';

const { RNEmarsysPredictWrapper } = NativeModules;

const Predict = {

	/**
	 * @desc When you want to track the cart items in the basket, you can call the trackCart method with a list of CartItems.
	 * 	CartItem is an interface that can be used in your application for your own CartItems and then simply use the same items with the SDK.
	 * @param required array - Array of cartItems. Can be empty, if you want to track empty cart.
	 * 	- itemId - cartItem ID
	 * 	- price - cartItem price
	 * 	- quantity - cartItem quantity.
	 *
	 * 	Empty cart:
	 * 		let cartItems = []
	 *
	 * 	Cart with Items:
	 * 		let cartItems = [{
	 * 			itemId: "ID of the Cart Item 1",
	 * 			price: 1.66,
	 * 			quantity: 26.4,
	 * 		}, {
	 * 			itemId: "ID of the Cart Item 2",
	 * 			price: 2.88,
	 * 			quantity: 56.5,
	 * 		}]
	 *
	 * @return bool - success or failure
	 */
	trackCart(cartItems) {
		return RNEmarsysPredictWrapper.trackCart(cartItems)
	},

	/**
	 * @desc To report a purchase event, you should call trackPurchase with the items purchased and with an orderId.
	 * @param required string orderId - Order Id.
	 * @param required array - Array of cartItems. Can be empty, if you want to track empty cart.
	 * 	- itemId - cartItem ID
	 * 	- price - cartItem price
	 * 	- quantity - cartItem quantity.
	 *
	 * 	Empty cart:
	 * 		let cartItems = []
	 *
	 * 	Cart with Items:
	 * 		let cartItems = [{
	 * 			itemId: "ID of the Cart Item 1",
	 * 			price: 1.66,
	 * 			quantity: 26.4,
	 * 		}, {
	 * 			itemId: "ID of the Cart Item 2",
	 * 			price: 2.88,
	 * 			quantity: 56.5,
	 * 		}]
	 *
	 * @return bool - success or failure
	 */
	trackPurchase(orderId, cartItems) {
		return RNEmarsysPredictWrapper.trackPurchase(orderId, cartItems)
	},

	/**
	 * @desc If an item was viewed, use the trackItemView method with an itemId as required parameter.
	 * @param required string itemId - ID of item was viewed.
	 * @return bool - success or failure
	 */
	trackItemView(itemId) {
		return RNEmarsysPredictWrapper.trackItemView(itemId)
	},

	/**
	 * @desc When the user navigates between the categories, you should call trackCategoryView in every navigation. Be aware to send categoryPath in the required format.
	 * @param required string categoryPath - Category path was viewed.
	 * @return bool - success or failure
	 */
	trackCategoryView(categoryPath) {
		return RNEmarsysPredictWrapper.trackCategoryView(categoryPath)
	},

	/**
	 * @desc To report search terms entered by the contact, use trackSearchTerm method.
	 * @param required string searchTerm - Term was searched.
	 * @return bool - success or failure
	 */
	trackSearchTerm(searchTerm) {
		return RNEmarsysPredictWrapper.trackSearchTerm(searchTerm)
	},

	/**
	 * @desc To track custom tags, use the trackTag method, where, the eventName parameter is required, but the attributes is optional.
	 * @param required string tagName - Tag name.
	 * @param optional object tagAttributes - Tag attributes.
	 *
	 * 	let tagAttributes = {
	 * 		"tag-key1": "tag-value1",
	 * 		"tag-key2": "tag-value2",
	 * 	}
	 *
	 * @return bool - success or failure
	 */
	trackTag(tagName, tagAttributes) {
		return RNEmarsysPredictWrapper.trackTag(tagName, tagAttributes ? tagAttributes : null)
	},

	/**
	 * @desc With the Emarsys SDK you can ask for product recommendations based on different parameters.
	 * @param required string logic - For more information of the recommender logics, please visit [the official documentation].(https://help.emarsys.com/hc/en-us/articles/115004662189-Web-Recommender-logics "The Official Documentation")
	 *
	 * 	The currently supported logics are:
	 * 	- SEARCH - based on searchTerm
	 * 	- CART - based on cartItems
	 * 	- RELATED - based on itemViewId
	 * 	- CATEGORY - based on categoryPath
	 * 	- ALSO_BOUGHT - based on itemViewId
	 * 	- POPULAR - based on categoryPath
	 * 	- PERSONAL - based on current browsing and activity
	 * 	- HOME - based on most recent browsing behaviour
	 *
	 * @param optional object logicOptions - Option for the logic.
	 * 	Either `query`, `cartItems`, or `variants`
	 * 	- query - Query string extends recommended logics.
	 * 	- cartItems - Array of cartItems, can be empty.
	 * 	- variants - Array of variants
	 *
	 * 	let logicOptions = {
	 * 		query: "Shoes>Pump"
	 * 	}
	 *
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
	 *
	 * 	let logicOptions = {
	 * 		variants: ["1", "2", "3"]
	 * 	}
	 *
	 * @param optional object recommendationOptions - Option for recommendation.
	 * 	- availabilityZone - You can personalize the recommendation further by setting the availabilityZones parameter of the recommendation, to only recommend the locally available products. This is an optional parameter.
	 * 	- limit - You can limit the number of recommended products received by defining a limit. This is an optional parameter, by default its value is 5.
	 * 	- filters - You can filter product recommendations with the SDK by building RecommendationFilters. This is an optional parameter.
	 * 			type - There are two types of filters: exclude or include.
	 * 			field - String extends Type of recommended logics.
	 * 			comparison - In every case there are four types of comparators you can use to compare your chosen field to expectations:
	 * 				is - checking if the field is matching the value.
	 * 				in - any of the values has a match with the field.
	 *				has - One of the field values is equal to expectation value (applicable only to fields containing multiple values).
	 *				overlaps - One or more of the field values are found in expectation values (applicable only to fields containing multiple values).
	 * 			expectations - String/Array of strings extends Comparison of recommended logics.
	 *
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
	 *
	 * @return array - array of objects with recommended Products
	 */
	recommendProducts(logic, logicOptions, recommendationOptions) {
		return RNEmarsysPredictWrapper.recommendProducts(logic, logicOptions, recommendationOptions)
	},

	/**
	 * @desc Deprecated and will be removed in later versions.
	 * Pleaes use `recommendProducts(logic, logicOptions, recommendationOptions)`
	 */
	recommendProductsQuery(logic, query) {
		return RNEmarsysPredictWrapper.recommendProductsQuery(logic, query)
	},

	/**
	 * @desc Deprecated and will be removed in later versions.
	 * Pleaes use `recommendProducts(logic, logicOptions, recommendationOptions)`
	 */
	recommendProductsCartItems(logic, cartItems) {
		return RNEmarsysPredictWrapper.recommendProductsCartItems(logic, cartItems)
	},

	/**
	 * @desc Deprecated and will be removed in later versions.
	 * Pleaes use `recommendProducts(logic, logicOptions, recommendationOptions)`
	 */
	recommendProductsVariants(logic, variants) {
		return RNEmarsysPredictWrapper.recommendProductsVariants(logic, variants)
	},

	/**
	 * @desc Deprecated and will be removed in later versions.
	 * Pleaes use `recommendProducts(logic, logicOptions, recommendationOptions)`
	 */
	recommendProductsLimit(logic, limit) {
		return RNEmarsysPredictWrapper.recommendProductsLimit(logic, limit)
	},

	/**
	 * @desc Deprecated and will be removed in later versions.
	 * Pleaes use `recommendProducts(logic, logicOptions, recommendationOptions)`
	 */
	recommendProductsQueryLimit(logic, query, limit) {
		return RNEmarsysPredictWrapper.recommendProductsQueryLimit(logic, query, limit)
	},

	/**
	 * @desc Deprecated and will be removed in later versions.
	 * Pleaes use `recommendProducts(logic, logicOptions, recommendationOptions)`
	 */
	recommendProductsCartItemsLimit(logic, cartItems, limit) {
		return RNEmarsysPredictWrapper.recommendProductsCartItemsLimit(logic, cartItems, limit)
	},

	/**
	 * @desc Deprecated and will be removed in later versions.
	 * Pleaes use `recommendProducts(logic, logicOptions, recommendationOptions)`
	 */
	recommendProductsVariantsLimit(logic, variants, limit) {
		return RNEmarsysPredictWrapper.recommendProductsVariantsLimit(logic, variants, limit)
	},

	/**
	 * @desc Deprecated and will be removed in later versions.
	 * Pleaes use `recommendProducts(logic, logicOptions, recommendationOptions)`
	 */
	recommendProductsFilters(logic, filters) {
		return RNEmarsysPredictWrapper.recommendProductsFilters(logic, filters)
	},

	/**
	 * @desc Deprecated and will be removed in later versions.
	 * Pleaes use `recommendProducts(logic, logicOptions, recommendationOptions)`
	 */
	recommendProductsQueryFilters(logic, query, filters) {
		return RNEmarsysPredictWrapper.recommendProductsQueryFilters(logic, query, filters)
	},

	/**
	 * @desc Deprecated and will be removed in later versions.
	 * Pleaes use `recommendProducts(logic, logicOptions, recommendationOptions)`
	 */
	recommendProductsCartItemsFilters(logic, cartItems, filters) {
		return RNEmarsysPredictWrapper.recommendProductsCartItemsFilters(logic, cartItems, filters)
	},

	/**
	 * @desc Deprecated and will be removed in later versions.
	 * Pleaes use `recommendProducts(logic, logicOptions, recommendationOptions)`
	 */
	recommendProductsVariantsFilters(logic, variants, filters) {
		return RNEmarsysPredictWrapper.recommendProductsVariantsFilters(logic, variants, filters)
	},

	/**
	 * @desc Deprecated and will be removed in later versions.
	 * Pleaes use `recommendProducts(logic, logicOptions, recommendationOptions)`
	 */
	recommendProductsLimitFilters(logic, limit, filters) {
		return RNEmarsysPredictWrapper.recommendProductsLimitFilters(logic, limit, filters)
	},

	/**
	 * @desc Deprecated and will be removed in later versions.
	 * Pleaes use `recommendProducts(logic, logicOptions, recommendationOptions)`
	 */
	recommendProductsQueryLimitFilters(logic, query, limit, filters) {
		return RNEmarsysPredictWrapper.recommendProductsQueryLimitFilters(logic, query, limit, filters)
	},

	/**
	 * @desc Deprecated and will be removed in later versions.
	 * Pleaes use `recommendProducts(logic, logicOptions, recommendationOptions)`
	 */
	recommendProductsCartItemsLimitFilters(logic, cartItems, limit, filters) {
		return RNEmarsysPredictWrapper.recommendProductsCartItemsLimitFilters(logic, cartItems, limit, filters)
	},

	/**
	 * @desc Deprecated and will be removed in later versions.
	 * Pleaes use `recommendProducts(logic, logicOptions, recommendationOptions)`
	 */
	recommendProductsVariantsLimitFilters(logic, variants, limit, filters) {
		return RNEmarsysPredictWrapper.recommendProductsVariantsLimitFilters(logic, variants, limit, filters)
	},

	/**
	 * @desc The Emarsys SDK doesn't track automatically recommendationClicks,
	 * 	so you have to call manually trackRecommendationClick when an interaction happens with any of the recommended products.
	 * @param required object product - Recommended product was clicked.
	 *
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
	 *
	 * @return bool - success or failure
	 */
	trackRecommendationClick(product) {
		return RNEmarsysPredictWrapper.trackRecommendationClick(product)
	},

};

export default Predict;
