import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../../utils/utilities";

const initialState = {
	error: false,
	allCategories: []
}

const displayCategories = (state, action) => {
	return updateObject(state, {
		allCategories: action.allCategories
	});
};

const fetchFailed = (state, action) => {
	return updateObject(state, {
		error: true
	});
};

const getAllCategories = (state = initialState, action) => {
	if (action.type === actionTypes.DISPLAY_CATEGORIES) {
		return displayCategories(state, action);
	}
	if (action.type === actionTypes.FETCH_FAILED) {
		return fetchFailed(state, action);
	}
	return state;
};

export default getAllCategories;