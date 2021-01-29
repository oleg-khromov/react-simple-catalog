import { call, put, fork, takeLatest, select } from "redux-saga/effects";

import { push } from "connected-react-router";

import firebase, { app, reduxSagaFirebase } from "../../firebase";
import { constants, ROUTES_PATH } from "../../constants";
import { actions } from "../actions";
import { sagaAssessor } from "../../utils";
import { getAuth } from "../selectors";

const fetchProducts = ({ payload, callback }) =>
  sagaAssessor(
    () =>
      function* () {
        const {
          user: { uid },
        } = yield select(getAuth());

        const snapshot = yield call(
          reduxSagaFirebase.firestore.getCollection,
          firebase
            .firestore(app)
            .collection("products")
            .where("author", "==", uid)
        );

        let products = [];
        snapshot.forEach((product) => {
          products.push({
            id: product.id,
            ...product.data(),
          });
        });

        yield put(actions.PRODUCTS_FETCH.SUCCEEDED(products));
      },
    actions.PRODUCTS_FETCH.FAILED,
    callback
  );

const fetchProductById = ({ payload, callback }) =>
  sagaAssessor(
    () =>
      function* () {
        //yield put(actions.PRODUCT_FETCH.SUCCEEDED(payload));
      },
    actions.PRODUCT_FETCH.FAILED,
    callback
  );

const addProduct = ({ payload, callback }) =>
  sagaAssessor(
    () =>
      function* () {
        const {
          user: { uid },
        } = yield select(getAuth());

        const product = yield call(
          reduxSagaFirebase.firestore.addDocument,
          "products",
          {
            author: uid,
            ...payload,
          }
        );

        yield put(
          actions.PRODUCT_ADD.SUCCEEDED({
            id: product.id,
            author: uid,
            ...payload,
          })
        );
        yield put(push(ROUTES_PATH.CATALOG));
      },
    actions.PRODUCT_ADD.FAILED,
    callback
  );

const editProduct = ({ payload, callback }) =>
  sagaAssessor(
    () =>
      function* () {
        const { id, ...rest } = payload;
        yield call(
          reduxSagaFirebase.firestore.setDocument,
          `products/${id}`,
          rest
        );

        yield put(actions.PRODUCT_EDIT.SUCCEEDED(payload));
        yield put(push(ROUTES_PATH.CATALOG));
      },
    actions.PRODUCT_EDIT.FAILED,
    callback
  );

const removeProductById = ({ payload, callback }) =>
  sagaAssessor(
    () =>
      function* () {
        yield call(
          reduxSagaFirebase.firestore.deleteDocument,
          `products/${payload}`
        );
        yield put(actions.PRODUCT_REMOVE.SUCCEEDED(payload));
        yield put(push(ROUTES_PATH.CATALOG));
      },
    actions.PRODUCT_REMOVE.FAILED,
    callback
  );

const todosTransformer = (products) => {
  const res = [];
  products.forEach((product) =>
    res.push({
      id: product.id,
      ...product.data(),
    })
  );
  return res;
};

const syncTodos = (products) => ({
  type: constants.PRODUCTS_FETCH.REQUESTED,
  products,
});

export function* syncTodosSaga() {
  yield fork(reduxSagaFirebase.firestore.syncCollection, "products", {
    successActionCreator: syncTodos,
    transform: todosTransformer,
  });
}

export default function* productsWatcher() {
  yield takeLatest(constants.PRODUCTS_FETCH.REQUESTED, fetchProducts);
  yield takeLatest(constants.PRODUCT_FETCH.REQUESTED, fetchProductById);
  yield takeLatest(constants.PRODUCT_ADD.REQUESTED, addProduct);
  yield takeLatest(constants.PRODUCT_EDIT.REQUESTED, editProduct);
  yield takeLatest(constants.PRODUCT_REMOVE.REQUESTED, removeProductById);
}
