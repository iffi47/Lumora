import { compose, applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { rootReducers } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

const persistConfig = {
 key: "root",
 storage,
 blacklist: ["user"],
};
const sageMiddlewares = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducers);
const middlewares = [
 process.env.NODE_ENV === "development" && logger,
 sageMiddlewares,
].filter(Boolean);
const composeEnchancer =
 (process.env.NODE_ENV !== "production" &&
  window &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
 compose;

const composedEnchancers = composeEnchancer(applyMiddleware(...middlewares));
export const store = createStore(
 persistedReducer,
 undefined,
 composedEnchancers,
);
sageMiddlewares.run(rootSaga);

export const persistor = persistStore(store);