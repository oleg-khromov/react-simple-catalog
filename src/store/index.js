import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";
// import { reduxFirestore } from "redux-firestore";
// import { reactReduxFirebase } from "react-redux-firebase";

import history from "../history";
import rootReducer from "./reducers";
import rootSaga from "./sagas";
// import firebase, { db, bConfig } from "../firebase";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer(history),
  compose(
    applyMiddleware(routerMiddleware(history), sagaMiddleware),
    // reactReduxFirebase(firebase, {
    //   userProfile: "users",
    //   useFirestoreForProfile: true,
    //   attachAuthIsReady: true,
    // }),
    // reduxFirestore(firebase),
    composeWithDevTools ? composeWithDevTools() : (f) => f
  )
);

sagaMiddleware.run(rootSaga);

export default store;
