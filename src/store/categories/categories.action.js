import { createAction } from "../../utlis/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";
// import { getCategoriesAndDocuments } from "../../utlis/firebase.utils";

export const fetchCategoriesSuccess = (categories) =>
 createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);
export const fetchCategoriesStart = () =>
 createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);
export const fetchCategoriesFailed = (error) =>
 createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
