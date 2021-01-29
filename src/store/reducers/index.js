import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import AuthReducer from "./authReducer";
import ProductsReducer from "./productsReducer";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    authReducer: AuthReducer,
    productsReducer: ProductsReducer,
  });

export default rootReducer;
