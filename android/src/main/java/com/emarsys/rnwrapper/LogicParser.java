package com.emarsys.rnwrapper;

import static com.emarsys.predict.api.model.RecommendationLogic.ALSO_BOUGHT;
import static com.emarsys.predict.api.model.RecommendationLogic.CART;
import static com.emarsys.predict.api.model.RecommendationLogic.CATEGORY;
import static com.emarsys.predict.api.model.RecommendationLogic.HOME;
import static com.emarsys.predict.api.model.RecommendationLogic.PERSONAL;
import static com.emarsys.predict.api.model.RecommendationLogic.POPULAR;
import static com.emarsys.predict.api.model.RecommendationLogic.RELATED;
import static com.emarsys.predict.api.model.RecommendationLogic.SEARCH;

import com.emarsys.predict.api.model.CartItem;
import com.emarsys.predict.api.model.Logic;
import com.emarsys.predict.api.model.RecommendationLogic;

import java.util.List;

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
			case PERSONAL:
				recommendedLogic = RecommendationLogic.personal();
				break;
			case HOME:
				recommendedLogic = RecommendationLogic.home();
				break;
			default:
				recommendedLogic = RecommendationLogic.search();
		}
		return recommendedLogic;
	}

	public static Logic parseWithVariants(String logic, List<String> variants) {
		Logic recommendLogic;
		switch (logic) {
			case PERSONAL:
				recommendLogic = RecommendationLogic.personal(variants);
				break;
			case HOME:
				recommendLogic = RecommendationLogic.home(variants);
				break;
			default:
				recommendLogic = parse(logic);
		}
		return recommendLogic;
	}

	public static Logic parseWithCartItems(String logic, List<CartItem> cartItems) {
		Logic recommendLogic;
		switch (logic) {
			case CART:
				recommendLogic = RecommendationLogic.cart(cartItems);
				break;
			default:
				recommendLogic = parse(logic);
		}
		return recommendLogic;
	}

	public static Logic parseWithQuery(String logic, String query) {
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
				recommendedLogic = parse(logic);
		}
		return recommendedLogic;
	}
}
