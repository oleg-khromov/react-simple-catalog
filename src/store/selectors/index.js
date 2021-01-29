import { createSelector } from "reselect";

const authState = (state) => state.authReducer;
const productsState = (state) => state.productsReducer;

export const getAuth = () => createSelector(authState, (state) => state);

export const getProducts = () =>
  createSelector(productsState, (state) => state);

export const getProductById = (id) =>
  createSelector(productsState, (state) =>
    state.products.find((product, index) => index === id)
  );
