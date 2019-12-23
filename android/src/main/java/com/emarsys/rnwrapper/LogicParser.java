package com.emarsys.rnwrapper;

import com.emarsys.predict.api.model.CartItem;
import com.emarsys.predict.api.model.Logic;
import com.emarsys.predict.api.model.RecommendationLogic;

import com.facebook.react.bridge.ReadableArray;

import java.util.List;

import static com.emarsys.predict.api.model.RecommendationLogic.*;

public class LogicParser {

	public static Logic parse(String logic) {
		Logic recommendedLogic;
		switch (logic) {
			case CART:
				recommendedLogic = RecommendationLogic.cart();
				break;
			case RELATED:
				recommendedLogic = RecommendationLogic.related();
				break;
			case CATEGORY:
				recommendedLogic = RecommendationLogic.category();
				break;
			case ALSO_BOUGHT:
				recommendedLogic = RecommendationLogic.alsoBought();
				break;
			case POPULAR:
				recommendedLogic = RecommendationLogic.popular();
				break;
			default:
				recommendedLogic = RecommendationLogic.search();
		}
		return recommendedLogic;
	}

	public static Logic parse(String logic, ReadableArray array) {
		Logic recommendLogic;
		switch (logic) {
			case CART:
				List<CartItem> items = ArrayUtil.arrayToCartList(array);
				recommendLogic = RecommendationLogic.cart(items);
				break;
			default:
				recommendLogic = RecommendationLogic.search();
		}
		return recommendLogic;
	}

	public static Logic parse(String logic, String query) {
		Logic recommendedLogic;
		switch (logic) {
			case SEARCH:
				recommendedLogic = RecommendationLogic.search(query);
				break;
			case RELATED:
				recommendedLogic = RecommendationLogic.related(query);
				break;
			case CATEGORY:
				recommendedLogic = RecommendationLogic.category(query);
				break;
			case ALSO_BOUGHT:
				recommendedLogic = RecommendationLogic.alsoBought(query);
				break;
			case POPULAR:
				recommendedLogic = RecommendationLogic.popular(query);
				break;
			default:
				recommendedLogic = RecommendationLogic.search();
		}
		return recommendedLogic;
	}
}
