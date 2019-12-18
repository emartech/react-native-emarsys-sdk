import React, { Component } from "react"

import { StyleSheet, View, Text, Button, ScrollView } from "react-native"

import { SafeAreaView } from "react-navigation"

import showAlert from "../Helpers"

import EmarsysWrapper from "react-native-emarsys-wrapper"

const styles = StyleSheet.create({
	inbase: {
		flex: 1,
		width: "100%",
		backgroundColor: "#ffffff",
	},
	scrollBase: {
		flexGrow: 1,
		flexShrink: 0,
		flexBasis: "auto",
		width: "100%",
		backgroundColor: "#ffffff",
	},
	base: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",

		backgroundColor: "#ffffff",

		paddingTop: 16,
		paddingBottom: 24,
		paddingLeft: 12,
		paddingRight: 12,
	},
	hr: {
		marginTop: 24,
		width: "100%",
		height: 1,
		maxWidth: 420,
		backgroundColor: "#595959",
	},
	buttonTrackCart: {
		width: "100%",
		maxWidth: 420,
	},
	buttonPredict: {
		marginTop: 24,
		width: "100%",
		maxWidth: 420,
	},
})

export default class Predict extends Component {

	// MARK: - Predict *************************************************************************************************************

	async wrapperTrackCart() {
		let cartItems = [
			{
				itemId: "cartId-123",
				price: 1.66,
				quantity: 26.4,
			},
			{
				itemId: "cartId-234",
				price: 2.88,
				quantity: 56.5,
			},
		]
		
		try {
			let result = await EmarsysWrapper.trackCart(cartItems)
			console.log("trackCart Done: ", result)
			showAlert( "trackCart", "trackCart Done.")
		} catch (e) {
			console.log("trackCart Fail: ", e)
			showAlert( "trackCart", "trackCart Fail: ", e )
		}
	}

	async wrapperTrackEmptyCart() {
		let emptyCartItems = []
		
		try {
			let result = await EmarsysWrapper.trackCart(emptyCartItems)
			console.log("trackCart Empty Done: ", result)
			showAlert( "trackCart Empty", "trackCart Empty Done.")
		} catch (e) {
			console.log("trackCart Empty Fail: ", e)
			showAlert( "trackCart Empty", "trackCart Empty Fail: ", e )
		}
	}

	async wrapperTrackPurchase() {
		let orderId = "TrackPurchase-OrderID-Test-22"
		let cartItems = [
			{
				itemId: "cartId-321",
				price: 2.22,
				quantity: 27.56,
			},
			{
				itemId: "cartId-New",
				price: 28.11,
				quantity: 5.6,
			},
		]
		
		try {
			let result = await EmarsysWrapper.trackPurchase(orderId, cartItems)
			console.log("trackPurchase Done: ", result)
			showAlert( "trackPurchase", "trackPurchase Done.")
		} catch (e) {
			console.log("trackPurchase Fail: ", e)
			showAlert( "trackPurchase", "trackPurchase Fail: ", e )
		}
	}

	async wrapperTrackEmptyPurchase() {
		let emptyOrderId = "TrackPurchase-Empty-OrderID-77"
		let emptyCartItems = []
		
		try {
			let result = await EmarsysWrapper.trackPurchase(emptyOrderId, emptyCartItems)
			console.log("trackPurchase Empty Done: ", result)
			showAlert( "trackPurchase Empty", "trackPurchase Empty Done.")
		} catch (e) {
			console.log("trackPurchase Empty Fail: ", e)
			showAlert( "trackPurchase Empty", "trackPurchase Empty Fail: ", e )
		}
	}

	async wrapperTrackItemView() {
		let itemId = "TrackItemId-Test-111"
		
		try {
			let result = await EmarsysWrapper.trackItemView(itemId)
			console.log("trackItemView Done: ", result)
			showAlert( "trackItemView", "trackItemView Done.")	
		} catch (e) {
			console.log("trackItemView Fail: ", e)
			showAlert( "trackItemView", "trackItemView Fail: ", e )
		}
	}

	async wrapperTrackCategoryView() {
		let categoryPath = "Bikes > Road Bikes"

		try {
			let result = await EmarsysWrapper.trackCategoryView(categoryPath)
			console.log("trackCategoryView Done: ", result)
			showAlert( "trackCategoryView", "trackCategoryView Done.")
		} catch (e) {
			console.log("trackCategoryView Fail: ", e)
			showAlert( "trackCategoryView", "trackCategoryView Fail: ", e )
		}
	}

	async wrapperTrackSearchTerm() {
		let searchTerm = "TrackSearchTerm Test Search"

		try {
			let result = await EmarsysWrapper.trackSearchTerm(searchTerm)
			console.log("trackSearchTerm Done: ", result)
			showAlert( "trackSearchTerm", "trackSearchTerm Done.")
		} catch (e) {
			console.log("trackSearchTerm Fail: ", e)
			showAlert( "trackSearchTerm", "trackSearchTerm Fail: ", e )
		}
	}

	async wrapperTrackTag() {
		let tagName = "TEST-tagName"
		let tagAttributes = {
			"tag-key1": "TEST-value1",
			"tag-key2": "TEST-value2",
		}

		try {
			let result = await EmarsysWrapper.trackTag(tagName, tagAttributes)
			console.log("trackTag Done: ", result)
			showAlert( "trackTag", "trackTag Done.")
		} catch (e) {
			console.log("trackTag Fail: ", e)
			showAlert( "trackTag", "trackTag Fail: ", e )
		}
	}

	async wrapperRecommendProducts() {
		let logic = "CATEGORY"

		try {
			let result = await EmarsysWrapper.recommendProducts(logic)
			console.log("recommendProducts Done: ", result)
			showAlert( "recommendProducts", "recommendProducts Done.")
		} catch (e) {
			console.log("recommendProducts Fail: ", e)
			showAlert( "recommendProducts", "recommendProducts Fail: ", e )
		}
	}

	async wrapperRecommendProductsQuery() {
		let logic = "POPULAR"
		let query = "Shoes>Pump"

		try {
			let result = await EmarsysWrapper.recommendProductsQuery(logic, query)
			console.log("recommendProductsQuery Done: ", result)
			showAlert( "recommendProductsQuery", "recommendProductsQuery Done.")
		} catch (e) {
			console.log("recommendProductsQuery Fail: ", e)
			showAlert( "recommendProductsQuery", "recommendProductsQuery Fail: ", e )
		}
	}

	async wrapperRecommendProductsCartItems() {
		let logic = "CART"
		let cartItems = [
			{
				itemId: "103",
				price: 9.22,
				quantity: 2.4,
			},
			{
				itemId: "108",
				price: 89.99,
				quantity: 6.5,
			},
		]

		try {
			let result = await EmarsysWrapper.recommendProductsCartItems(logic, cartItems)
			console.log("recommendProductsCartItems Done: ", result)
			showAlert( "recommendProductsCartItems", "recommendProductsCartItems Done.")
		} catch (e) {
			console.log("recommendProductsCartItems Fail: ", e)
			showAlert( "recommendProductsCartItems", "recommendProductsCartItems Fail: ", e )
		}
	}

	async wrapperRecommendProductsLimit() {
		let logic = "RELATED"
		let limit = 1

		try {
			let result = await EmarsysWrapper.recommendProductsLimit(logic, limit)
			console.log("recommendProductsLimit Done: ", result)
			showAlert( "recommendProductsLimit", "recommendProductsLimit Done.")
		} catch (e) {
			console.log("recommendProductsLimit Fail: ", e)
			showAlert( "recommendProductsLimit", "recommendProductsLimit Fail: ", e )
		}
	}

	async wrapperRecommendProductsQueryLimit() {
		let logic = "POPULAR"
		let query = "Shoes>Pump"
		let limit = 2

		try {
			let result = await EmarsysWrapper.recommendProductsQueryLimit(logic, query, limit)
			console.log("recommendProductsQueryLimit Done: ", result)
			showAlert( "recommendProductsQueryLimit", "recommendProductsQueryLimit Done.")
		} catch (e) {
			console.log("recommendProductsQueryLimit Fail: ", e)
			showAlert( "recommendProductsQueryLimit", "recommendProductsQueryLimit Fail: ", e )
		}
	}

	async wrapperRecommendProductsCartItemsLimit() {
		let logic = "CART"
		let cartItems = [
			{
				itemId: "103",
				price: 299,
				quantity: 26.4,
			},
			{
				itemId: "108",
				price: 289.99,
				quantity: 56.5,
			},
		]
		let limit = 4

		try {
			let result = await EmarsysWrapper.recommendProductsCartItemsLimit(logic, cartItems, limit)
			console.log("recommendProductsCartItemsLimit Done: ", result)
			showAlert( "recommendProductsCartItemsLimit", "recommendProductsCartItemsLimit Done.")
		} catch (e) {
			console.log("recommendProductsCartItemsLimit Fail: ", e)
			showAlert( "recommendProductsCartItemsLimit", "recommendProductsCartItemsLimit Fail: ", e )
		}
	}

	async wrapperRecommendProductsFilters() {
		let logic = "POPULAR"
		let filters = { 
			type: "include", 
			field: "category", 
			comparison: "is", 
			expectations: "For Women",
		}

		try {
			let result = await EmarsysWrapper.recommendProductsFilters(logic, filters)
			console.log("recommendProductsFilters Done: ", result)
			showAlert( "recommendProductsFilters", "recommendProductsFilters Done.")
		} catch (e) {
			console.log("recommendProductsFilters Fail: ", e)
			showAlert( "recommendProductsFilters", "recommendProductsFilters Fail: ", e )
		}
	}

	async wrapperRecommendProductsQueryFilters() {
		let logic = "CATEGORY"
		let query = "Shoes>Pump"
		let filters = { 
			type: "include", 
			field: "category", 
			comparison: "IN", 
			expectations: [ "Shoes>Pump", "For Women>Shoes>Golf"],
		}

		try {
			let result = await EmarsysWrapper.recommendProductsQueryFilters(logic, query, filters)
			console.log("recommendProductsQueryFilters Done: ", result)
			showAlert( "recommendProductsQueryFilters", "recommendProductsQueryFilters Done.")
		} catch (e) {
			console.log("recommendProductsQueryFilters Fail: ", e)
			showAlert( "recommendProductsQueryFilters", "recommendProductsQueryFilters Fail: ", e )
		}
	}

    async wrapperRecommendProductsCartItemsFilters() {
		let logic = "CART"
        let cartItems = [
			{
				itemId: "103",
				price: 299,
				quantity: 26.4,
			},
			{
				itemId: "108",
				price: 289.99,
				quantity: 56.5,
			},
		]
		let filters = {}

		try {
			let result = await EmarsysWrapper.recommendProductsCartItemsFilters(logic, cartItems, filters)
			console.log("recommendProductsCartItemsFilters Done: ", result)
			showAlert( "recommendProductsCartItemsFilters", "recommendProductsCartItemsFilters Done.")
		} catch (e) {
			console.log("recommendProductsCartItemsFilters Fail: ", e)
			showAlert( "recommendProductsCartItemsFilters", "recommendProductsCartItemsFilters Fail: ", e )
		}
	}

    async wrapperRecommendProductsLimitFilters() {
		let logic = "POPULAR"
		let limit = 5
		let filters = {}

		try {
			let result = await EmarsysWrapper.recommendProductsLimitFilters(logic, limit, filters)
			console.log("recommendProductsLimitFilters Done: ", result)
			showAlert( "recommendProductsLimitFilters", "recommendProductsLimitFilters Done.")
		} catch (e) {
			console.log("recommendProductsLimitFilters Fail: ", e)
			showAlert( "recommendProductsLimitFilters", "recommendProductsLimitFilters Fail: ", e )
		}
    }

    async wrapperRecommendProductsQueryLimitFilters() {
		let logic = "CATEGORY"
		let query = "Shoes>Pump"
		let limit = 5
		let filters = {}

		try {
			let result = await EmarsysWrapper.recommendProductsQueryLimitFilters(logic, query, limit, filters)
			console.log("recommendProductsQueryLimitFilters Done: ", result)
			showAlert( "recommendProductsQueryLimitFilters", "recommendProductsQueryLimitFilters Done.")
		} catch (e) {
			console.log("recommendProductsQueryLimitFilters Fail: ", e)
			showAlert( "recommendProductsQueryLimitFilters", "recommendProductsQueryLimitFilters Fail: ", e )
		}
	}

    async wrapperRecommendProductsCartItemsLimitFilters() {
		let logic = "CART"
        let cartItems = [
			{
				itemId: "103",
				price: 299,
				quantity: 26.4,
			},
			{
				itemId: "108",
				price: 289.99,
				quantity: 56.5,
			},
		]
		let limit = 5
		let filters = {}

		try {
			let result = await EmarsysWrapper.recommendProductsCartItemsLimitFilters(logic, cartItems, limit, filters)
			console.log("recommendProductsCartItemsLimitFilters Done: ", result)
			showAlert( "recommendProductsCartItemsLimitFilters", "recommendProductsCartItemsLimitFilters Done.")
		} catch (e) {
			console.log("recommendProductsCartItemsLimitFilters Fail: ", e)
			showAlert( "recommendProductsCartItemsLimitFilters", "recommendProductsCartItemsLimitFilters Fail: ", e )
		}
	}	

	async wrapperTrackRecommendationClick() {
		let product = {
			productId: "productId", //String
			title: "title", //String
			linkUrl: "http://linkUrl.com/test", //URL
			feature: "feature", //String
			cohort: "awesome", //String
			imageUrl: "http://productURL.com/imageUrl", //URL
			zoomImageUrl: "http://productURL.com/zoomImageUrl", //URL
			categoryPath: "productCategoryPath", //String
			productDescription: "productDescription", //String
			album: "productAlbum", //String
			actor: "productActor", //String
			artist: "productArtist", //String
			author: "productAuthor", //String
			brand: "productBrand", //String
			customFields: {
				//Map<String, String>
				productTestKey1: "productTestValue1", //<String, String>
				productTestKey2: "productTestValue2", //<String, String>
				productTestKey3: "productTestValue3", //<String, String>
			},
			available: true, //Boolean
			price: 45.67, //Float
			msrp: 2.45, //Float
			year: 2019, //Integer
		}

		try {
			let result = await EmarsysWrapper.trackRecommendationClick(product)
			console.log("trackRecommendationClick Done: ", result)
			showAlert( "trackRecommendationClick", "trackRecommendationClick Done.")
		} catch (e) {
			console.log("trackRecommendationClick Fail: ", e)
			showAlert( "trackRecommendationClick", "trackRecommendationClick Fail: ", e )
		}
	}

	render() {
		return (
			<SafeAreaView style={styles.inbase}>
				<ScrollView contentContainerStyle={styles.scrollBase}>
					<View style={ styles.base }>
						<View style={ styles.buttonTrackCart }>
							 <Button
								title="Track Cart"
								color="#595959"
								onPress={() => {
									this.wrapperTrackCart()
								}}
							/>
						</View>
						<View style={ styles.buttonPredict }>
							 <Button
								title="Track Empty Cart"
								color="#595959"
								onPress={() => {
									this.wrapperTrackEmptyCart()
								}}
							/>
						</View>
						<View style={ styles.buttonPredict }>
							 <Button
								title="Track Purchase"
								color="#076bae"
								onPress={() => {
									this.wrapperTrackPurchase()
								}}
							/>
						</View>
						<View style={ styles.buttonPredict }>
							 <Button
								title="Track Empty Purchase"
								color="#076bae"
								onPress={() => {
									this.wrapperTrackEmptyPurchase()
								}}
							/>
						</View>
						<View style={ styles.buttonPredict }>
							 <Button
								title="Track Item View"
								color="#595959"
								onPress={() => {
									this.wrapperTrackItemView()
								}}
							/>
						</View>
						<View style={ styles.buttonPredict }>
							 <Button
								title="Track Category View"
								color="#595959"
								onPress={() => {
									this.wrapperTrackCategoryView()
								}}
							/>
						</View>
						<View style={ styles.buttonPredict }>
							 <Button
								title="Track Search Term"
								color="#595959"
								onPress={() => {
									this.wrapperTrackSearchTerm()
								}}
							/>
						</View>
						<View style={ styles.buttonPredict }>
							 <Button
								title="Track Tag"
								color="#076bae"
								onPress={() => {
									this.wrapperTrackTag()
								}}
							/>
						</View>
						<View style={ styles.hr } />
						<View style={ styles.buttonPredict }>
							 <Button
								title="Recommend Products"
								color="#595959"
								onPress={() => {
									this.wrapperRecommendProducts()
								}}
							/>
						</View>
						<View style={ styles.buttonPredict }>
							 <Button
								title="Recommend Products Query"
								color="#595959"
								onPress={() => {
									this.wrapperRecommendProductsQuery()
								}}
							/>
						</View>
						<View style={ styles.buttonPredict }>
							 <Button
								title="Recommend Products CartItems"
								color="#595959"
								onPress={() => {
									this.wrapperRecommendProductsCartItems()
								}}
							/>
						</View>
						<View style={ styles.buttonPredict }>
							 <Button
								title="Recommend Products Limit"
								color="#595959"
								onPress={() => {
									this.wrapperRecommendProductsLimit()
								}}
							/>
						</View>

						<View style={ styles.buttonPredict }>
							 <Button
								title="Recommend Products Query Limit"
								color="#595959"
								onPress={() => {
									this.wrapperRecommendProductsQueryLimit()
								}}
							/>
						</View>

						<View style={ styles.buttonPredict }>
							 <Button
								title="Recommend Products CartItems Limit"
								color="#595959"
								onPress={() => {
									this.wrapperRecommendProductsCartItemsLimit()
								}}
							/>
						</View>

						<View style={ styles.buttonPredict }>
							 <Button
								title="Recommend Products Filters"
								color="#595959"
								onPress={() => {
									this.wrapperRecommendProductsFilters()
								}}
							/>
						</View>

						<View style={ styles.buttonPredict }>
							 <Button
								title="Recommend Products Query Filters"
								color="#595959"
								onPress={() => {
									this.wrapperRecommendProductsQueryFilters()
								}}
							/>
						</View>

						<View style={ styles.buttonPredict }>
							 <Button
								title="Recommend Products CartItems Filters"
								color="#595959"
								onPress={() => {
									this.wrapperRecommendProductsCartItemsFilters()
								}}
							/>
						</View>

						<View style={ styles.buttonPredict }>
							 <Button
								title="Recommend Products Limit Filters"
								color="#595959"
								onPress={() => {
									this.wrapperRecommendProductsLimitFilters()
								}}
							/>
						</View>

						<View style={ styles.buttonPredict }>
							 <Button
								title="Recommend Products Query Limit Filters"
								color="#595959"
								onPress={() => {
									this.wrapperRecommendProductsQueryLimitFilters()
								}}
							/>
						</View>

						<View style={ styles.buttonPredict }>
							 <Button
								title="Recommend Products CartItems Limit Filters"
								color="#595959"
								onPress={() => {
									this.wrapperRecommendProductsCartItemsLimitFilters()
								}}
							/>
						</View>

						<View style={ styles.hr } />

						<View style={ styles.buttonPredict }>
							 <Button
								title="Track Recommendation Click"
								color="#ED5E21"
								onPress={() => {
									this.wrapperTrackRecommendationClick()
								}}
							/>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		)
	}
}
