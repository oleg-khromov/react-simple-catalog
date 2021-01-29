import { all, fork } from "redux-saga/effects";

import { default as authSaga } from "./authSaga";
import { default as productsSaga, syncTodosSaga } from "./productsSaga";

export default function* rootSaga() {
  //yield all([fork(authSaga), fork(productsSaga), fork(syncTodosSaga)]);
  yield all([fork(authSaga), fork(productsSaga)]);
}
