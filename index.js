import { NativeModules, NativeEventEmitter } from 'react-native';

const { RNEmarsysWrapper } = NativeModules;

const Emarsys = {

	/* Init ***************************************************************************************************************************************/

	/**
	  * @desc After application setup is finished, you can use setContact method to identify the user with a contactFieldValue. 
	  * @desc Without setContact all events will be tracked as anonymous usage.
	  
	  * @param required string contactFieldValue - user/application identification e-mail
	  * @return bool - success or failure
	*/		
	setContact(contactFieldValue) {
		return RNEmarsysWrapper.setContact(contactFieldValue)
	},

	/**
	  * @desc When the user signs out, we should use the clearContact method. 
	  * @desc The method is going to automatically log in an anonymous user instead of the one leaving.
	  
	  * @return bool - success or failure
	*/		
	clearContact() {
		return RNEmarsysWrapper.clearContact()
	},

	/**
	  * @desc If you want to track custom events, the trackCustomEvent method should be used.
	  
	  * @param required string eventName - Name of tracked custom event.
	  * @param object eventAttributes - Attributes of tracked custom event.
	  * @return bool - success or failure
	*/		
	trackCustomEvent(eventName, eventAttributes) {
		return RNEmarsysWrapper.trackCustomEvent(eventName, eventAttributes ? eventAttributes : null)
	},

	/**
	 * @desc Register an event handler to react to events triggered by Emarsys.
	 * @param function (eventName, payload) callback function receiving events 
	 * @return bool - success or failure
	 */
	setEventHandler(callback) {
		console.log(`Registered for events`)
		const eventEmitter = new NativeEventEmitter(RNEmarsysWrapper);
		eventEmitter.addListener('handleEvent', function (result) {
			console.log(`Got event ${result}`)
			callback(result.eventName, result.payload);
		});
		RNEmarsysWrapper.setEventHandler();
	},

	/* Push ***************************************************************************************************************************************/

	push: {
		/**
		 * @desc The Emarsys SDK automatically handles setPushToken for the device and it is recommended to leave this to the SDK.
		 * @desc However if you have your custom implementation of MessagingService, please use the setPushToken() method.

		 * @param required string pushToken - Push Token of your MessagingService
		 * @return bool - success or failure
		 */
		setPushToken(pushToken) {
			return RNEmarsysWrapper.setPushToken(pushToken)
		},

		/**
		 * @desc If you want to remove pushToken for the Contact, please use clearPushToken().

		 * @return bool - success or failure
		 */
		clearPushToken() {
			return RNEmarsysWrapper.clearPushToken()
		},

		/**
		 * @The Emarsys SDK automatically handles whether the push messages have been opened, however, if you want to track it manually the trackMessageOpen method should be used.

		 * @param required string messageId - Push message ID
		 * @return bool - success or failure
		 */
		trackMessageOpen(messageId) {
			return RNEmarsysWrapper.trackMessageOpen(messageId)
		},
	},

	/* InApp **************************************************************************************************************************************/

	inApp: {
		/**
		 * @desc When a critical activity starts and should not be interrupted by InApp, use pause to pause InApp messages.

		 * @return bool - success or failure
		 */
		pause() {
			return RNEmarsysWrapper.pause()
		},

		/**
		 * @desc In order to show inApp messages after being paused, use the resume method.

		 * @return bool - success or failure
		 */
		resume() {
			return RNEmarsysWrapper.resume()
		},

	},

	/* Predict ************************************************************************************************************************************/

	predict: {

		/**
		 * @desc When you want to track the cart items in the basket, you can call the trackCart method with a list of CartItems.
		 * @desc CartItem is an interface that can be used in your application for your own CartItems and then simply use the same items with the SDK.

		 * @param required array - Array of cartItems, can be empty, if you want to track empty cart.
		 * 	@param itemId - cartItem ID.
		 *		@param price - cartItem price.
		 * 	@param quantity - cartItem quantity.
		 *
		 * 	Empty cart:
		 * 	let cartItems = []
		 *
		 * 	Cart with Items:
		 * 	let cartItems = [{
		 *			itemId: "ID of the Cart Item 1",
		 * 		price: 1.66,
		 * 		quantity: 26.4,
		 *		 }, {
		 * 		itemId: "ID of the Cart Item 2",
		 * 		price: 2.88,
		 * 		quantity: 56.5,
		 * 	}]
		 * @return bool - success or failure
		 */
		trackCart(cartItems) {
			return RNEmarsysWrapper.trackCart(cartItems)
		},

		/**
		 * @desc To report a purchase event, you should call trackPurchase with the items purchased and with an orderId.

		 * @param required string orderId - Order Id.
		 * @param required array - Array of cartItems, can be empty, if you want to track empty cart.
		 * 	@param itemId - cartItem ID.
		 *		@param price - cartItem price.
		 * 	@param quantity - cartItem quantity.
		 *
		 * 	Empty cart:
		 * 	let cartItems = []
		 *
		 * 	Cart with Items:
		 * 	let cartItems = [{
		 *			itemId: "ID of the Cart Item 1",
		 * 		price: 1.66,
		 * 		quantity: 26.4,
		 *		 }, {
		 * 		itemId: "ID of the Cart Item 2",
		 * 		price: 2.88,
		 * 		quantity: 56.5,
		 * 	}]
		 * @return bool - success or failure
		 */
		trackPurchase(orderId, cartItems) {
			return RNEmarsysWrapper.trackPurchase(orderId, cartItems)
		},

		/**
		 * @desc If an item was viewed, use the trackItemView method with an itemId as required parameter.

		 * @param required string itemId - ID of item was viewed.
		 * @return bool - success or failure
		 */
		trackItemView(itemId) {
			return RNEmarsysWrapper.trackItemView(itemId)
		},

		/**
		 * @desc When the user navigates between the categories, you should call trackCategoryView in every navigation. Be aware to send categoryPath in the required format.

		 * @param required string categoryPath - Category path was viewed.
		 * @return bool - success or failure
		 */
		trackCategoryView(categoryPath) {
			return RNEmarsysWrapper.trackCategoryView(categoryPath)
		},

		/**
		 * @desc To report search terms entered by the contact, use trackSearchTerm method.

		 * @param required string searchTerm - Term was searched.
		 * @return bool - success or failure
		 */
		trackSearchTerm(searchTerm) {
			return RNEmarsysWrapper.trackSearchTerm(searchTerm)
		},

		/**
		 * @desc To track custom tags, use the trackTag method, where, the eventName parameter is required, but the attributes is optional.

		 * @param required string tagName - Tag name.
		 * @param object tagAttributes - Tag attributes.
		 *   	let tagAttributes = {
		 * 		"tag-key1": "tag-value1",
		 * 		"tag-key2": "tag-value2",
		 * 	}
		 * @return bool - success or failure
		 */
		trackTag(tagName, tagAttributes) {
			return RNEmarsysWrapper.trackTag(tagName, tagAttributes ? tagAttributes : null)
		},

		/**
		 * @desc With the Emarsys SDK you can ask for product recommendations based on different parameters.

		 * @param required string logic - For more information of the recommender logics, please visit [the official documentation].(https://help.emarsys.com/hc/en-us/articles/115004662189-Web-Recommender-logics "The Official Documentation")
		 * The currently supported logics are:
		 * 	SEARCH - based on searchTerm
		 * 	CART - based on cartItems
		 * 	RELATED - based on itemViewId
		 * 	CATEGORY - based on categoryPath
		 * 	ALSO_BOUGHT - based on itemViewId
		 * 	POPULAR - based on categoryPath
		 * 	PERSONAL - based on current browsing and activity
		 * 	HOME - based on most recent browsing behaviour
		 * @return array - array of objects with recommended Products
		 */
		recommendProducts(logic) {
			return RNEmarsysWrapper.recommendProducts(logic)
		},

		/**
		 * @desc With the Emarsys SDK you can ask for product recommendations based on different parameters.

		 * @param required string logic - For more information of the recommender logics, please visit [the official documentation].(https://help.emarsys.com/hc/en-us/articles/115004662189-Web-Recommender-logics "The Official Documentation")
		 * The currently supported logics are:
		 * 	SEARCH - based on searchTerm
		 * 	CART - based on cartItems
		 * 	RELATED - based on itemViewId
		 * 	CATEGORY - based on categoryPath
		 * 	ALSO_BOUGHT - based on itemViewId
		 * 	POPULAR - based on categoryPath
		 * 	PERSONAL - based on current browsing and activity
		 * 	HOME - based on most recent browsing behaviour
		 * @param required string query - Query string extends recommended logics.
		 * @return array - array of objects with recommended Products
		 */
		recommendProductsQuery(logic, query) {
			return RNEmarsysWrapper.recommendProductsQuery(logic, query)
		},

		/**
		 * @desc With the Emarsys SDK you can ask for product recommendations based on different parameters.

		 * @param required string logic - For more information of the recommender logics, please visit [the official documentation].(https://help.emarsys.com/hc/en-us/articles/115004662189-Web-Recommender-logics "The Official Documentation")
		 * The currently supported logics are:
		 * 	SEARCH - based on searchTerm
		 * 	CART - based on cartItems
		 * 	RELATED - based on itemViewId
		 * 	CATEGORY - based on categoryPath
		 * 	ALSO_BOUGHT - based on itemViewId
		 * 	POPULAR - based on categoryPath
		 * 	PERSONAL - based on current browsing and activity
		 * 	HOME - based on most recent browsing behaviour
		 * @param required array cartItems - Array of cartItems, can be empty.
		 * 	@param itemId - cartItem ID.
		 *		@param price - cartItem price.
		 * 	@param quantity - cartItem quantity.
		 *
		 * 	Empty cart:
		 * 	let cartItems = []
		 *
		 * 	Cart with Items:
		 * 	let cartItems = [{
		 *			itemId: "ID of the Cart Item 1",
		 * 		price: 1.66,
		 * 		quantity: 26.4,
		 *		 }, {
		 * 		itemId: "ID of the Cart Item 2",
		 * 		price: 2.88,
		 * 		quantity: 56.5,
		 * 	}]
		 * @return array - array of objects with recommended Products
		 */
		recommendProductsCartItems(logic, cartItems) {
			return RNEmarsysWrapper.recommendProductsCartItems(logic, cartItems)
		},

		/**
		 * @desc With the Emarsys SDK you can ask for product recommendations based on different parameters.

		 * @param required string logic - For more information of the recommender logics, please visit [the official documentation].(https://help.emarsys.com/hc/en-us/articles/115004662189-Web-Recommender-logics "The Official Documentation")
		 * The currently supported logics are:
		 * 	SEARCH - based on searchTerm
		 * 	CART - based on cartItems
		 * 	RELATED - based on itemViewId
		 * 	CATEGORY - based on categoryPath
		 * 	ALSO_BOUGHT - based on itemViewId
		 * 	POPULAR - based on categoryPath
		 * 	PERSONAL - based on current browsing and activity
		 * 	HOME - based on most recent browsing behaviour
		 * @param required integer limit - You can limit the number of recommended products received by defining a limit. This is an optional parameter, by default its value is 5.
		 * @return array - array of objects with recommended Products
		 */
		recommendProductsLimit(logic, limit) {
			return RNEmarsysWrapper.recommendProductsLimit(logic, limit)
		},

		/**
		 * @desc With the Emarsys SDK you can ask for product recommendations based on different parameters.

		 * @param required string logic - For more information of the recommender logics, please visit [the official documentation].(https://help.emarsys.com/hc/en-us/articles/115004662189-Web-Recommender-logics "The Official Documentation")
		 * The currently supported logics are:
		 * 	SEARCH - based on searchTerm
		 * 	CART - based on cartItems
		 * 	RELATED - based on itemViewId
		 * 	CATEGORY - based on categoryPath
		 * 	ALSO_BOUGHT - based on itemViewId
		 * 	POPULAR - based on categoryPath
		 * 	PERSONAL - based on current browsing and activity
		 * 	HOME - based on most recent browsing behaviour
		 * @param required string query - Query string extends recommended logics.
		 * @param required integer limit - You can limit the number of recommended products received by defining a limit. This is an optional parameter, by default its value is 5.
		 * @return array - array of objects with recommended Products
		 */
		recommendProductsQueryLimit(logic, query, limit) {
			return RNEmarsysWrapper.recommendProductsQueryLimit(logic, query, limit)
		},

		/**
		 * @desc With the Emarsys SDK you can ask for product recommendations based on different parameters.

		 * @param required string logic - For more information of the recommender logics, please visit [the official documentation].(https://help.emarsys.com/hc/en-us/articles/115004662189-Web-Recommender-logics "The Official Documentation")
		 * The currently supported logics are:
		 * 	SEARCH - based on searchTerm
		 * 	CART - based on cartItems
		 * 	RELATED - based on itemViewId
		 * 	CATEGORY - based on categoryPath
		 * 	ALSO_BOUGHT - based on itemViewId
		 * 	POPULAR - based on categoryPath
		 * 	PERSONAL - based on current browsing and activity
		 * 	HOME - based on most recent browsing behaviour
		 * @param required array cartItems - Array of cartItems, can be empty.
		 * 	@param itemId - cartItem ID.
		 *		@param price - cartItem price.
		 * 	@param quantity - cartItem quantity.
		 *
		 * 	Empty cart:
		 * 	let cartItems = []
		 *
		 * 	Cart with Items:
		 * 	let cartItems = [{
		 *			itemId: "ID of the Cart Item 1",
		 * 		price: 1.66,
		 * 		quantity: 26.4,
		 *		 }, {
		 * 		itemId: "ID of the Cart Item 2",
		 * 		price: 2.88,
		 * 		quantity: 56.5,
		 * 	}]
		 * @param required integer limit - You can limit the number of recommended products received by defining a limit. This is an optional parameter, by default its value is 5.
		 * @return array - array of objects with recommended Products
		 */
		recommendProductsCartItemsLimit(logic, cartItems, limit) {
			return RNEmarsysWrapper.recommendProductsCartItemsLimit(logic, cartItems, limit)
		},

		/**
		 * @desc With the Emarsys SDK you can ask for product recommendations based on different parameters.

		 * @param required string logic - For more information of the recommender logics, please visit [https://dev.emarsys.com/v2/web-extend-command-reference/web-extend-exclude the official documentation].(https://help.emarsys.com/hc/en-us/articles/115004662189-Web-Recommender-logics "The Official Documentation")
		 * The currently supported logics are:
		 * 	SEARCH - based on searchTerm
		 * 	CART - based on cartItems
		 * 	RELATED - based on itemViewId
		 * 	CATEGORY - based on categoryPath
		 * 	ALSO_BOUGHT - based on itemViewId
		 * 	POPULAR - based on categoryPath
		 * 	PERSONAL - based on current browsing and activity
		 * 	HOME - based on most recent browsing behaviour
		 * @param required object filters - You can filter product recommendations with the SDK by building RecommendationFilters. , please visit [https://dev.emarsys.com/v2/web-extend-command-reference/web-extend-exclude the official documentation].(https://help.emarsys.com/hc/en-us/articles/115004662189-Web-Recommender-logics "The Official Documentation")
		 * 	@param required string type - There are two types of filters: exclude or include.
		 * 	@param required string field - String extends Type of recommended logics.
		 * 	@param required string comparison - In every case there are four types of comparators you can use to compare your chosen field to expectations:
		 * 		is - checking if the field is matching the value
		 * 		in - any of the values has a match with the field
		 * 		has - One of the field values is equal to expectation value (applicable only to fields containing multiple values)
		 * 		overlaps - One or more of the field values are found in expectation values (applicable only to fields containing multiple values)
		 * 	@param required string/array expectations - String/Array of strings extends Comparison of recommended logics.
		 * @return array - array of objects with recommended Products
		 */
		recommendProductsFilters(logic, filters) {
			return RNEmarsysWrapper.recommendProductsFilters(logic, filters)
		},

		/**
		 * @desc With the Emarsys SDK you can ask for product recommendations based on different parameters.

		 * @param required string logic - For more information of the recommender logics, please visit [the official documentation].(https://help.emarsys.com/hc/en-us/articles/115004662189-Web-Recommender-logics "The Official Documentation")
		 * The currently supported logics are:
		 * 	SEARCH - based on searchTerm
		 * 	CART - based on cartItems
		 * 	RELATED - based on itemViewId
		 * 	CATEGORY - based on categoryPath
		 * 	ALSO_BOUGHT - based on itemViewId
		 * 	POPULAR - based on categoryPath
		 * 	PERSONAL - based on current browsing and activity
		 * 	HOME - based on most recent browsing behaviour
		 * @param required string query - Query string extends recommended logics.
		 * @param required object filters - You can filter product recommendations with the SDK by building RecommendationFilters. , please visit [https://dev.emarsys.com/v2/web-extend-command-reference/web-extend-exclude the official documentation].(https://help.emarsys.com/hc/en-us/articles/115004662189-Web-Recommender-logics "The Official Documentation")
		 * 	@param required string type - There are two types of filters: exclude or include.
		 * 	@param required string field - String extends Type of recommended logics.
		 * 	@param required string comparison - In every case there are four types of comparators you can use to compare your chosen field to expectations:
		 * 		is - checking if the field is matching the value
		 * 		in - any of the values has a match with the field
		 * 		has - One of the field values is equal to expectation value (applicable only to fields containing multiple values)
		 * 		overlaps - One or more of the field values are found in expectation values (applicable only to fields containing multiple values)
		 * 	@param required string/array expectations - String/Array of strings extends Comparison of recommended logics.
		 * @return array - array of objects with recommended Products
		 */
		recommendProductsQueryFilters(logic, query, filters) {
			return RNEmarsysWrapper.recommendProductsQueryFilters(logic, query, filters)
		},

		/**
		 * @desc With the Emarsys SDK you can ask for product recommendations based on different parameters.

		 * @param required string logic - For more information of the recommender logics, please visit [the official documentation].(https://help.emarsys.com/hc/en-us/articles/115004662189-Web-Recommender-logics "The Official Documentation")
		 * The currently supported logics are:
		 * 	SEARCH - based on searchTerm
		 * 	CART - based on cartItems
		 * 	RELATED - based on itemViewId
		 * 	CATEGORY - based on categoryPath
		 * 	ALSO_BOUGHT - based on itemViewId
		 * 	POPULAR - based on categoryPath
		 * 	PERSONAL - based on current browsing and activity
		 * 	HOME - based on most recent browsing behaviour
		 * @param required array cartItems - Array of cartItems, can be empty.
		 * 	@param itemId - cartItem ID.
		 *		@param price - cartItem price.
		 * 	@param quantity - cartItem quantity.
		 *
		 * 	Empty cart:
		 * 	let cartItems = []
		 *
		 * 	Cart with Items:
		 * 	let cartItems = [{
		 *			itemId: "ID of the Cart Item 1",
		 * 		price: 1.66,
		 * 		quantity: 26.4,
		 *		 }, {
		 * 		itemId: "ID of the Cart Item 2",
		 * 		price: 2.88,
		 * 		quantity: 56.5,
		 * 	}]
		 * @param required object filters - You can filter product recommendations with the SDK by building RecommendationFilters. , please visit [https://dev.emarsys.com/v2/web-extend-command-reference/web-extend-exclude the official documentation].(https://help.emarsys.com/hc/en-us/articles/115004662189-Web-Recommender-logics "The Official Documentation")
		 * 	@param required string type - There are two types of filters: exclude or include.
		 * 	@param required string field - String extends Type of recommended logics.
		 * 	@param required string comparison - In every case there are four types of comparators you can use to compare your chosen field to expectations:
		 * 		is - checking if the field is matching the value
		 * 		in - any of the values has a match with the field
		 * 		has - One of the field values is equal to expectation value (applicable only to fields containing multiple values)
		 * 		overlaps - One or more of the field values are found in expectation values (applicable only to fields containing multiple values)
		 * 	@param required string/array expectations - String/Array of strings extends Comparison of recommended logics.
		 * @return array - array of objects with recommended Products
		 */
		recommendProductsCartItemsFilters(logic, cartItems, filters) {
			return RNEmarsysWrapper.recommendProductsCartItemsFilters(logic, cartItems, filters)
		},

		/**
		 * @desc With the Emarsys SDK you can ask for product recommendations based on different parameters.

		 * @param required string logic - For more information of the recommender logics, please visit [the official documentation].(https://help.emarsys.com/hc/en-us/articles/115004662189-Web-Recommender-logics "The Official Documentation")
		 * The currently supported logics are:
		 * 	SEARCH - based on searchTerm
		 * 	CART - based on cartItems
		 * 	RELATED - based on itemViewId
		 * 	CATEGORY - based on categoryPath
		 * 	ALSO_BOUGHT - based on itemViewId
		 * 	POPULAR - based on categoryPath
		 * 	PERSONAL - based on current browsing and activity
		 * 	HOME - based on most recent browsing behaviour
		 * @param required integer limit - You can limit the number of recommended products received by defining a limit. This is an optional parameter, by default its value is 5.
		 * @param required object filters - You can filter product recommendations with the SDK by building RecommendationFilters. , please visit [https://dev.emarsys.com/v2/web-extend-command-reference/web-extend-exclude the official documentation].(https://help.emarsys.com/hc/en-us/articles/115004662189-Web-Recommender-logics "The Official Documentation")
		 * 	@param required string type - There are two types of filters: exclude or include.
		 * 	@param required string field - String extends Type of recommended logics.
		 * 	@param required string comparison - In every case there are four types of comparators you can use to compare your chosen field to expectations:
		 * 		is - checking if the field is matching the value
		 * 		in - any of the values has a match with the field
		 * 		has - One of the field values is equal to expectation value (applicable only to fields containing multiple values)
		 * 		overlaps - One or more of the field values are found in expectation values (applicable only to fields containing multiple values)
		 * 	@param required string/array expectations - String/Array of strings extends Comparison of recommended logics.
		 * @return array - array of objects with recommended Products
		 */
		recommendProductsLimitFilters(logic, limit, filters) {
			return RNEmarsysWrapper.recommendProductsLimitFilters(logic, limit, filters)
		},

		/**
		 * @desc With the Emarsys SDK you can ask for product recommendations based on different parameters.

		 * @param required string logic - For more information of the recommender logics, please visit [the official documentation].(https://help.emarsys.com/hc/en-us/articles/115004662189-Web-Recommender-logics "The Official Documentation")
		 * The currently supported logics are:
		 * 	SEARCH - based on searchTerm
		 * 	CART - based on cartItems
		 * 	RELATED - based on itemViewId
		 * 	CATEGORY - based on categoryPath
		 * 	ALSO_BOUGHT - based on itemViewId
		 * 	POPULAR - based on categoryPath
		 * 	PERSONAL - based on current browsing and activity
		 * 	HOME - based on most recent browsing behaviour
		 * @param required string query - Query string extends recommended logics.
		 * @param required integer limit - You can limit the number of recommended products received by defining a limit. This is an optional parameter, by default its value is 5.
		 * @param required object filters - You can filter product recommendations with the SDK by building RecommendationFilters. , please visit [https://dev.emarsys.com/v2/web-extend-command-reference/web-extend-exclude the official documentation].(https://help.emarsys.com/hc/en-us/articles/115004662189-Web-Recommender-logics "The Official Documentation")
		 * 	@param required string type - There are two types of filters: exclude or include.
		 * 	@param required string field - String extends Type of recommended logics.
		 * 	@param required string comparison - In every case there are four types of comparators you can use to compare your chosen field to expectations:
		 * 		is - checking if the field is matching the value
		 * 		in - any of the values has a match with the field
		 * 		has - One of the field values is equal to expectation value (applicable only to fields containing multiple values)
		 * 		overlaps - One or more of the field values are found in expectation values (applicable only to fields containing multiple values)
		 * 	@param required string/array expectations - String/Array of strings extends Comparison of recommended logics.
		 * @return array - array of objects with recommended Products
		 */
		recommendProductsQueryLimitFilters(logic, query, limit, filters) {
			return RNEmarsysWrapper.recommendProductsQueryLimitFilters(logic, query, limit, filters)
		},

		/**
		 * @desc With the Emarsys SDK you can ask for product recommendations based on different parameters.

		 * @param required string logic - For more information of the recommender logics, please visit [the official documentation].(https://help.emarsys.com/hc/en-us/articles/115004662189-Web-Recommender-logics "The Official Documentation")
		 * The currently supported logics are:
		 * 	SEARCH - based on searchTerm
		 * 	CART - based on cartItems
		 * 	RELATED - based on itemViewId
		 * 	CATEGORY - based on categoryPath
		 * 	ALSO_BOUGHT - based on itemViewId
		 * 	POPULAR - based on categoryPath
		 * 	PERSONAL - based on current browsing and activity
		 * 	HOME - based on most recent browsing behaviour
		 * @param required array cartItems - Array of cartItems, can be empty.
		 * 	@param itemId - cartItem ID.
		 *		@param price - cartItem price.
		 * 	@param quantity - cartItem quantity.
		 *
		 * 	Empty cart:
		 * 	let cartItems = []
		 *
		 * 	Cart with Items:
		 * 	let cartItems = [{
		 *			itemId: "ID of the Cart Item 1",
		 * 		price: 1.66,
		 * 		quantity: 26.4,
		 *		 }, {
		 * 		itemId: "ID of the Cart Item 2",
		 * 		price: 2.88,
		 * 		quantity: 56.5,
		 * 	}]
		 * @param required integer limit - You can limit the number of recommended products received by defining a limit. This is an optional parameter, by default its value is 5.
		 * @param required object filters - You can filter product recommendations with the SDK by building RecommendationFilters. , please visit [https://dev.emarsys.com/v2/web-extend-command-reference/web-extend-exclude the official documentation].(https://help.emarsys.com/hc/en-us/articles/115004662189-Web-Recommender-logics "The Official Documentation")
		 * 	@param required string type - There are two types of filters: exclude or include.
		 * 	@param required string field - String extends Type of recommended logics.
		 * 	@param required string comparison - In every case there are four types of comparators you can use to compare your chosen field to expectations:
		 * 		is - checking if the field is matching the value
		 * 		in - any of the values has a match with the field
		 * 		has - One of the field values is equal to expectation value (applicable only to fields containing multiple values)
		 * 		overlaps - One or more of the field values are found in expectation values (applicable only to fields containing multiple values)
		 * 	@param required string/array expectations - String/Array of strings extends Comparison of recommended logics.
		 * @return array - array of objects with recommended Products
		 */
		recommendProductsCartItemsLimitFilters(logic, cartItems, limit, filters) {
			return RNEmarsysWrapper.recommendProductsCartItemsLimitFilters(logic, cartItems, limit, filters)
		},

		/**
		 * @desc The Emarsys SDK doesn't track automatically recommendationClicks, so you have to call manually trackRecommendationClick when an interaction happens with any of the recommended products.

		 * @param required object product - Recommended product was clicked
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
		 * @return bool - success or failure
		 */
		trackRecommendationClick(product) {
			return RNEmarsysWrapper.trackRecommendationClick(product)
		},

	},

	/* DeepLink ***********************************************************************************************************************************/

	/**
	  * @desc The Emarsys SDK automatically tracks email link clicks that open the application directly in most use cases, with only one exception: manual tracking is needed.
	  * @param string url - Track URL 
	  * @return bool - success or failure
	*/		
	trackDeepLink(url) {
		return RNEmarsysWrapper.trackDeepLink(url ? url : null)
	},

	/* ApplicationCode and merchantId change ******************************************************************************************************/

	/**
	  * @desc Emarsys SDK provides a solution for applicationCode change in a convenient way without restarting the SDK.
	  * @param string applicationCodeChange - applicationCode for change
	  * @param number customerFieldIdChange - customerFieldId for change (optional)
	  * @return bool - success or failure
	*/		
	changeApplicationCode(applicationCodeChange, customerFieldIdChange) {
		return RNEmarsysWrapper.changeApplicationCode(applicationCodeChange ? applicationCodeChange : null, customerFieldIdChange ? customerFieldIdChange : null)
	},

	/**
	  * @desc Emarsys SDK provides a solution for merchantId change in a convenient way without restarting the SDK.
	  * @param string predictMerchantIdChange - predictMerchantId for change
	  * @return bool - success or failure
	*/		
	changeMerchantId(predictMerchantIdChange) {
		return RNEmarsysWrapper.changeMerchantId(predictMerchantIdChange ? predictMerchantIdChange : null)
	},

	/**
	  * @desc Provides what is the actual applicationCode set in the SDK.
	  * @return string - applicationCode
	*/		
	getApplicationCode() {
		return RNEmarsysWrapper.getApplicationCode()
	},

	/**
	  * @desc Provides what is the actual merchantId set in the SDK.
	  * @return string - merchantId
	*/		
	getMerchantId() {
		return RNEmarsysWrapper.getMerchantId()
	},

	/**
	  * @desc Provides what is the actual contactFieldId set in the SDK.
	  * @return integer - contactFieldId
	*/		
	getContactFieldId() {
		return RNEmarsysWrapper.getContactFieldId()
	},
};

export default Emarsys;
