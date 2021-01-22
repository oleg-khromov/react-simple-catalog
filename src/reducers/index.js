import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import ProductsReducer from "./productsReducer";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    productsReducer: ProductsReducer,
  });

export default rootReducer;
