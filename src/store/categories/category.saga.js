import { call, put, takeLatest, all} from "redux-saga/effects";
import { fetchCategoriesFailed, fetchCategoriesSuccess } from "./categories.action";
import { getCategoriesAndDocuments } from "../../utlis/firebase.utils";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";

export function* fetchCategoriesAsync () {
  try {
  const categoriesArray = yield call(getCategoriesAndDocuments,'categories');
  // dispatch(fetchCategoriesSuccess(categoriesArray));
  yield put(fetchCategoriesSuccess(categoriesArray))
 } catch (error) {
  // dispatch(fetchCategoriesFailed(error));
  yield put(fetchCategoriesFailed(error))
 }
}
export function* onFetchCategories(){
  yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}
export function* categoriesSaga() {
  yield all([call(onFetchCategories)])
}