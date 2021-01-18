import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";

import history from "../history";
import rootReducer from "../reducers";
import rootSaga from "../sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer(history),
  compose(
    applyMiddleware(routerMiddleware(history), sagaMiddleware),
    composeWithDevTools ? composeWithDevTools() : (f) => f
  )
);

sagaMiddleware.run(rootSaga);

export default store;
