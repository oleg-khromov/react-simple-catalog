import { actionConstantsCreator } from "../utils";

const PRODUCTS = [
  "PRODUCTS_FETCH",
  "PRODUCT_ADD",
  "PRODUCT_EDIT",
  "PRODUCT_REMOVE",
];

export const compose = [...PRODUCTS];
export const constants = actionConstantsCreator(compose);

export const initialState = {
  products: {
    products: [],
    loading: false,
    error: null,
  },
};

export const ROUTES_PATH = {
  SIGN_IN: "/login",
  CATALOG: "/catalog",
  PRODUCT: "/product",
};
