import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

//import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

import App from "./App";
import store from "./store";
import history from "./history";
//import reduxFirebase from "./firebase";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
