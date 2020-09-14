import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../../utils/utilities";

const initialState = {
	product: null,
	loading: false,
	error: false,
	reviews: null,
	stars: null
};

const displayProduct = (state, action) => {
	return updateObject(state, {
		loading: false,
		product: action.product,
		reviews: action.reviews,
		stars: action.stars
	});
};

const fetchStart = (action, state) => {
	return updateObject(state, {
		loading: true
	});
};

const fetchFailed = (state, action) => {
	return updateObject(state, {
		loading: false,
		error: true
	})
}

const getProduct = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.DISPLAY_PRODUCT:
			return displayProduct(state, action);
		case actionTypes.FETCH_START:
			return fetchStart(action, state);
		case actionTypes.FETCH_FAILED:
			return fetchFailed(action, state);
		default:
			return state;
	}
};

export default getProduct;