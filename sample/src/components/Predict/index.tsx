import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Emarsys from 'react-native-emarsys-wrapper';
import showAlert from '../Helpers';

const Button = ({ title, onPress }: { title: string; onPress?: () => void }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const PredictScreen = () => {

  // MARK: - Predict *************************************************************************************************************
  const wrapperTrackCart = async () => {
    const cartItems = [
      { itemId: 'cartId-123', price: 1.66, quantity: 26.4 },
      { itemId: 'cartId-234', price: 2.88, quantity: 56.5 },
    ];

    try {
      const result = await Emarsys.predict.trackCart(cartItems);
      console.log('trackCart Done:', result);
      showAlert('trackCart', 'trackCart Done.');
    } catch (e) {
      console.log('trackCart Fail:', e);
      showAlert('trackCart', 'trackCart Fail: ', JSON.stringify(e));
    }
  };

  const wrapperTrackEmptyCart = async () => {
    try {
      const result = await Emarsys.predict.trackCart([]);
      console.log('trackCart Empty Done:', result);
      showAlert('trackCart Empty', 'trackCart Empty Done.');
    } catch (e) {
      console.log('trackCart Empty Fail:', e);
      showAlert('trackCart Empty', 'trackCart Empty Fail: ', JSON.stringify(e));
    }
  };

  const wrapperTrackPurchase = async () => {
		let orderId = 'TrackPurchase-OrderID-Test-22';
		let cartItems = [
			{
				itemId: 'cartId-321',
				price: 2.22,
				quantity: 27.56,
			},
			{
				itemId: 'cartId-New',
				price: 28.11,
				quantity: 5.6,
			},
		];

		try {
			let result = await Emarsys.predict.trackPurchase(orderId, cartItems);
			console.log('trackPurchase Done: ', result);
			showAlert( 'trackPurchase', 'trackPurchase Done.');
		} catch (e) {
			console.log('trackPurchase Fail: ', e);
    }
  };

  const wrapperTrackEmptyPurchase = async () => {
		let emptyOrderId = 'TrackPurchase-Empty-OrderID-77';
		let emptyCartItems = [];

		try {
			let result = await Emarsys.predict.trackPurchase(emptyOrderId, emptyCartItems);
			console.log('trackPurchase Empty Done: ', result);
			showAlert( 'trackPurchase Empty', 'trackPurchase Empty Done.');
		} catch (e) {
			console.log('trackPurchase Empty Fail: ', e);
			showAlert( 'trackPurchase Empty', 'trackPurchase Empty Fail: ', JSON.stringify(e));
		}
  };

  const wrapperTrackItemView = async () => {
		let itemId = 'TrackItemId-Test-111';

		try {
			let result = await Emarsys.predict.trackItemView(itemId);
			console.log('trackItemView Done: ', result);
			showAlert( 'trackItemView', 'trackItemView Done.');
		} catch (e) {
			console.log('trackItemView Fail: ', e);
			showAlert( 'trackItemView', 'trackItemView Fail: ', JSON.stringify(e));
		}
	};

	const wrapperTrackCategoryView = async () => {
		let categoryPath = 'Bikes > Road Bikes';

		try {
			let result = await Emarsys.predict.trackCategoryView(categoryPath);
			console.log('trackCategoryView Done: ', result);
			showAlert( 'trackCategoryView', 'trackCategoryView Done.');
		} catch (e) {
			console.log('trackCategoryView Fail: ', e);
			showAlert( 'trackCategoryView', 'trackCategoryView Fail: ', JSON.stringify(e));
		}
	};

	const wrapperTrackSearchTerm = async () => {
		let searchTerm = 'TrackSearchTerm Test Search';

		try {
			let result = await Emarsys.predict.trackSearchTerm(searchTerm);
			console.log('trackSearchTerm Done: ', result);
			showAlert( 'trackSearchTerm', 'trackSearchTerm Done.');
		} catch (e) {
			console.log('trackSearchTerm Fail: ', e);
			showAlert( 'trackSearchTerm', 'trackSearchTerm Fail: ', JSON.stringify(e));
		}
	};

	const wrapperTrackTag = async () => {
		let tagName = 'TEST-tagName';
		let tagAttributes = {
			'tag-key1': 'TEST-value1',
			'tag-key2': 'TEST-value2',
		};

		try {
			let result = await Emarsys.predict.trackTag(tagName, tagAttributes);
			console.log('trackTag Done: ', result);
			showAlert( 'trackTag', 'trackTag Done.');
		} catch (e) {
			console.log('trackTag Fail: ', e);
			showAlert( 'trackTag', 'trackTag Fail: ', JSON.stringify(e));
		}
	};

	const wrapperRecommendProducts = async () => {
		let logic = 'HOME';

		try {
			let result = await Emarsys.predict.recommendProducts(logic, {
				// query: 'DEALS',
				// cartItems: [{
				// 	itemId: '2531',
				// 	price: 50,
				// 	quantity: 2,
				// }],
				variants: ['1', '2', '3'],
			}, {
				// availabilityZone: 'es',
				limit: 3,
				// filters: [{
				// 	type: 'include',
				// 	field: 'category',
				// 	comparison: 'is',
				// 	expectations: 'Shoes>Pump'
				// },{
				// 	type: 'exclude',
				// 	field: 'category',
				// 	comparison: 'IN',
				// 	expectations: [ 'Shoes>Pump', 'For Women>Shoes>Golf']
				// }]
			});
			console.log('recommendProducts Done: ', result);
			showAlert( 'recommendProducts', 'recommendProducts Done.');
		} catch (e) {
			console.log('recommendProducts Fail: ', e);
			showAlert( 'recommendProducts', 'recommendProducts Fail: ', JSON.stringify(e));
		}
	};

	const wrapperRecommendProductsQuery = async () => {
		let logic = 'POPULAR';
		let query = 'Shoes>Pump';

		try {
			let result = await Emarsys.predict.recommendProductsQuery(logic, query);
			console.log('recommendProductsQuery Done: ', result);
			showAlert( 'recommendProductsQuery', 'recommendProductsQuery Done.');
		} catch (e) {
			console.log('recommendProductsQuery Fail: ', e);
			showAlert( 'recommendProductsQuery', 'recommendProductsQuery Fail: ', JSON.stringify(e));
		}
	};

	const wrapperRecommendProductsCartItems = async () => {
		let logic = 'CART';
		let cartItems = [{
			itemId: '103',
			price: 9.22,
			quantity: 2.4,
		}, {
			itemId: '108',
			price: 89.99,
			quantity: 6.5,
		}];

		try {
			let result = await Emarsys.predict.recommendProductsCartItems(logic, cartItems);
			console.log('recommendProductsCartItems Done: ', result);
			showAlert( 'recommendProductsCartItems', 'recommendProductsCartItems Done.');
		} catch (e) {
			console.log('recommendProductsCartItems Fail: ', e);
			showAlert( 'recommendProductsCartItems', 'recommendProductsCartItems Fail: ', JSON.stringify(e));
		}
	};

	const wrapperRecommendProductsVariants = async () => {
		let logic = 'PERSONAL';
		let variants = ['1', '2', '3'];

		try {
			let result = await Emarsys.predict.recommendProductsVariants(logic, variants);
			console.log('wrapperRecommendProductsVariants Done: ', result);
			showAlert( 'wrapperRecommendProductsVariants', 'wrapperRecommendProductsVariants Done.');
		} catch (e) {
			console.log('wrapperRecommendProductsVariants Fail: ', e);
			showAlert( 'wrapperRecommendProductsVariants', 'wrapperRecommendProductsVariants Fail: ', JSON.stringify(e));
		}
	};

	const wrapperRecommendProductsLimit = async () => {
		let logic = 'RELATED';
		let limit = 1;

		try {
			let result = await Emarsys.predict.recommendProductsLimit(logic, limit);
			console.log('recommendProductsLimit Done: ', result);
			showAlert( 'recommendProductsLimit', 'recommendProductsLimit Done.');
		} catch (e) {
			console.log('recommendProductsLimit Fail: ', e);
			showAlert( 'recommendProductsLimit', 'recommendProductsLimit Fail: ', JSON.stringify(e));
		}
	};

	const wrapperRecommendProductsQueryLimit = async () => {
		let logic = 'POPULAR';
		let query = 'Shoes>Pump';
		let limit = 2;

		try {
			let result = await Emarsys.predict.recommendProductsQueryLimit(logic, query, limit);
			console.log('recommendProductsQueryLimit Done: ', result);
			showAlert( 'recommendProductsQueryLimit', 'recommendProductsQueryLimit Done.');
		} catch (e) {
			console.log('recommendProductsQueryLimit Fail: ', e);
			showAlert( 'recommendProductsQueryLimit', 'recommendProductsQueryLimit Fail: ', JSON.stringify(e));
		}
	};

	const wrapperRecommendProductsCartItemsLimit = async () => {
		let logic = 'CART';
		let cartItems = [{
			itemId: '103',
			price: 299,
			quantity: 26.4,
		}, {
			itemId: '108',
			price: 289.99,
			quantity: 56.5,
		}];
		let limit = 4;

		try {
			let result = await Emarsys.predict.recommendProductsCartItemsLimit(logic, cartItems, limit);
			console.log('recommendProductsCartItemsLimit Done: ', result);
			showAlert( 'recommendProductsCartItemsLimit', 'recommendProductsCartItemsLimit Done.');
		} catch (e) {
			console.log('recommendProductsCartItemsLimit Fail: ', e);
			showAlert( 'recommendProductsCartItemsLimit', 'recommendProductsCartItemsLimit Fail: ', JSON.stringify(e));
		}
	};

	const wrapperRecommendProductsVariantsLimit = async () => {
		let logic = 'PERSONAL';
		let variants = ['1', '2', '3'];
		let limit = 1;

		try {
			let result = await Emarsys.predict.recommendProductsVariantsLimit(logic, variants, limit);
			console.log('wrapperRecommendProductsVariantsLimit Done: ', result);
			showAlert( 'wrapperRecommendProductsVariantsLimit', 'wrapperRecommendProductsVariantsLimit Done.');
		} catch (e) {
			console.log('wrapperRecommendProductsVariantsLimit Fail: ', e);
			showAlert( 'wrapperRecommendProductsVariantsLimit', 'wrapperRecommendProductsVariantsLimit Fail: ', JSON.stringify(e));
		}
	};

	const wrapperRecommendProductsFilters = async () => {
		let logic = 'POPULAR';
		let filters = {
			type: 'include',
			field: 'category',
			comparison: 'is',
			expectations: 'For Women',
		};

		try {
			let result = await Emarsys.predict.recommendProductsFilters(logic, filters);
			console.log('recommendProductsFilters Done: ', result);
			showAlert( 'recommendProductsFilters', 'recommendProductsFilters Done.');
		} catch (e) {
			console.log('recommendProductsFilters Fail: ', e);
			showAlert( 'recommendProductsFilters', 'recommendProductsFilters Fail: ', JSON.stringify(e));
		}
	};

	const wrapperRecommendProductsQueryFilters = async () => {
		let logic = 'CATEGORY';
		let query = 'Shoes>Pump';
		let filters = {
			type: 'include',
			field: 'category',
			comparison: 'IN',
			expectations: [ 'Shoes>Pump', 'For Women>Shoes>Golf'],
		};

		try {
			let result = await Emarsys.predict.recommendProductsQueryFilters(logic, query, filters);
			console.log('recommendProductsQueryFilters Done: ', result);
			showAlert( 'recommendProductsQueryFilters', 'recommendProductsQueryFilters Done.');
		} catch (e) {
			console.log('recommendProductsQueryFilters Fail: ', e);
			showAlert( 'recommendProductsQueryFilters', 'recommendProductsQueryFilters Fail: ', JSON.stringify(e));
		}
	};

	const wrapperRecommendProductsCartItemsFilters = async () => {
		let logic = 'CART';
		let cartItems = [{
			itemId: '103',
			price: 299,
			quantity: 26.4,
		}, {
			itemId: '108',
			price: 289.99,
			quantity: 56.5,
		}];
		let filters = {};

		try {
			let result = await Emarsys.predict.recommendProductsCartItemsFilters(logic, cartItems, filters);
			console.log('recommendProductsCartItemsFilters Done: ', result);
			showAlert( 'recommendProductsCartItemsFilters', 'recommendProductsCartItemsFilters Done.');
		} catch (e) {
			console.log('recommendProductsCartItemsFilters Fail: ', e);
			showAlert( 'recommendProductsCartItemsFilters', 'recommendProductsCartItemsFilters Fail: ', JSON.stringify(e));
		}
	};

	const wrapperRecommendProductsVariantsFilters = async () => {
		let logic = 'PERSONAL';
		let variants = ['1', '2', '3'];
		let filters = {};

		try {
			let result = await Emarsys.predict.recommendProductsVariantsFilters(logic, variants, filters);
			console.log('wrapperRecommendProductsVariantsFilters Done: ', result);
			showAlert( 'wrapperRecommendProductsVariantsFilters', 'wrapperRecommendProductsVariantsFilters Done.');
		} catch (e) {
			console.log('wrapperRecommendProductsVariantsFilters Fail: ', e);
			showAlert( 'wrapperRecommendProductsVariantsFilters', 'wrapperRecommendProductsVariantsFilters Fail: ', JSON.stringify(e));
		}
	};

	const wrapperRecommendProductsLimitFilters = async () => {
		let logic = 'POPULAR';
		let limit = 5;
		let filters = {};

		try {
			let result = await Emarsys.predict.recommendProductsLimitFilters(logic, limit, filters);
			console.log('recommendProductsLimitFilters Done: ', result);
			showAlert( 'recommendProductsLimitFilters', 'recommendProductsLimitFilters Done.');
		} catch (e) {
			console.log('recommendProductsLimitFilters Fail: ', e);
			showAlert( 'recommendProductsLimitFilters', 'recommendProductsLimitFilters Fail: ', JSON.stringify(e));
		}
	};

	const wrapperRecommendProductsQueryLimitFilters = async () => {
		let logic = 'CATEGORY';
		let query = 'Shoes>Pump';
		let limit = 5;
		let filters = {};

		try {
			let result = await Emarsys.predict.recommendProductsQueryLimitFilters(logic, query, limit, filters);
			console.log('recommendProductsQueryLimitFilters Done: ', result);
			showAlert( 'recommendProductsQueryLimitFilters', 'recommendProductsQueryLimitFilters Done.');
		} catch (e) {
			console.log('recommendProductsQueryLimitFilters Fail: ', e);
			showAlert( 'recommendProductsQueryLimitFilters', 'recommendProductsQueryLimitFilters Fail: ', JSON.stringify(e));
		}
	};

	const wrapperRecommendProductsCartItemsLimitFilters = async () => {
		let logic = 'CART';
		let cartItems = [{
			itemId: '103',
			price: 299,
			quantity: 26.4,
		}, {
			itemId: '108',
			price: 289.99,
			quantity: 56.5,
		}];
		let limit = 5;
		let filters = {};

		try {
			let result = await Emarsys.predict.recommendProductsCartItemsLimitFilters(logic, cartItems, limit, filters);
			console.log('recommendProductsCartItemsLimitFilters Done: ', result);
			showAlert( 'recommendProductsCartItemsLimitFilters', 'recommendProductsCartItemsLimitFilters Done.');
		} catch (e) {
			console.log('recommendProductsCartItemsLimitFilters Fail: ', e);
			showAlert( 'recommendProductsCartItemsLimitFilters', 'recommendProductsCartItemsLimitFilters Fail: ', JSON.stringify(e));
		}
	};

	const wrapperRecommendProductsVariantsLimitFilters = async () => {
		let logic = 'PERSONAL';
		let variants = ['1', '2', '3'];
		let limit = 1;
		let filters = {};

		try {
			let result = await Emarsys.predict.recommendProductsVariantsLimitFilters(logic, variants, limit, filters);
			console.log('recommendProductsVariantsLimitFilters Done: ', result);
			showAlert( 'recommendProductsVariantsLimitFilters', 'recommendProductsVariantsLimitFilters Done.');
		} catch (e) {
			console.log('recommendProductsVariantsLimitFilters Fail: ', e);
			showAlert( 'recommendProductsVariantsLimitFilters', 'recommendProductsVariantsLimitFilters Fail: ', JSON.stringify(e));
		}
	};

	const wrapperTrackRecommendationClick = async () => {
		let product = {
			productId: 'productId', //String
			title: 'title', //String
			linkUrl: 'http://linkUrl.com/test', //URL
			feature: 'feature', //String
			cohort: 'awesome', //String
			imageUrl: 'http://productURL.com/imageUrl', //URL
			zoomImageUrl: 'http://productURL.com/zoomImageUrl', //URL
			categoryPath: 'productCategoryPath', //String
			productDescription: 'productDescription', //String
			album: 'productAlbum', //String
			actor: 'productActor', //String
			artist: 'productArtist', //String
			author: 'productAuthor', //String
			brand: 'productBrand', //String
			customFields: {
				//Map<String, String>
				productTestKey1: 'productTestValue1', //<String, String>
				productTestKey2: 'productTestValue2', //<String, String>
				productTestKey3: 'productTestValue3', //<String, String>
			},
			available: true, //Boolean
			price: 45.67, //Float
			msrp: 2.45, //Float
			year: 2019, //Integer
		};

		try {
			let result = await Emarsys.predict.trackRecommendationClick(product);
			console.log('trackRecommendationClick Done: ', result);
			showAlert( 'trackRecommendationClick', 'trackRecommendationClick Done.');
		} catch (e) {
			console.log('trackRecommendationClick Fail: ', e);
			showAlert( 'trackRecommendationClick', 'trackRecommendationClick Fail: ', JSON.stringify(e));
		}
	};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>InApp</Text>

      <Button title="Track Cart" onPress={wrapperTrackCart} />
      <Button title="Track Empty Cart" onPress={wrapperTrackEmptyCart} />
      <Button title="Track Purchase" onPress={wrapperTrackPurchase} />
      <Button title="Track Empty Purchase" onPress={wrapperTrackEmptyPurchase} />
      <Button title="Track Item View" onPress={wrapperTrackItemView} />
      <Button title="Track Category View" onPress={wrapperTrackCategoryView} />
      <Button title="Track Search Term" onPress={wrapperTrackSearchTerm} />
      <Button title="Track Tag" onPress={wrapperTrackTag} />
      <Button title="Recommend Products" onPress={wrapperRecommendProducts} />
      <Button title="Recommend Products Query" onPress={wrapperRecommendProductsQuery} />
      <Button title="Recommend Products Cart Items" onPress={wrapperRecommendProductsCartItems} />
      <Button title="Recommend Products Variants" onPress={wrapperRecommendProductsVariants} />
      <Button title="Recommend Products Limit" onPress={wrapperRecommendProductsLimit} />
      <Button title="Recommend Products Query Limit" onPress={wrapperRecommendProductsQueryLimit} />
      <Button title="Recommend Products Cart Items Limit" onPress={wrapperRecommendProductsCartItemsLimit} />
      <Button title="Recommend Products Variants Limit" onPress={wrapperRecommendProductsVariantsLimit} />
      <Button title="Recommend Products Filters" onPress={wrapperRecommendProductsFilters} />
      <Button title="Recommend Products Query Filters" onPress={wrapperRecommendProductsQueryFilters} />
      <Button title="Recommend Products Cart Items Filters" onPress={wrapperRecommendProductsCartItemsFilters} />
      <Button title="Recommend Products Variants Filters" onPress={wrapperRecommendProductsVariantsFilters} />
      <Button title="Recommend Products Limit Filters" onPress={wrapperRecommendProductsLimitFilters} />
      <Button title="Recommend Products Query Limit Filters" onPress={wrapperRecommendProductsQueryLimitFilters} />
      <Button title="Recommend Products Cart Items Limit Filters" onPress={wrapperRecommendProductsCartItemsLimitFilters} />
      <Button title="Recommend Products Variants Limit Filters" onPress={wrapperRecommendProductsVariantsLimitFilters} />
      <Button title="Track Recommendation Click" onPress={wrapperTrackRecommendationClick} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 12,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'flex-start',
    maxWidth: 420,
  },
  button: {
    backgroundColor: '#595959',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 24,
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  separator: {
    marginTop: 24,
    width: '100%',
    height: 1,
    maxWidth: 420,
    backgroundColor: '#595959',
  },
});

export default PredictScreen;
