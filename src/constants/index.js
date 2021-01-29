import { actionConstantsCreator } from "../utils";
export { default } from "./forms";

const PRODUCTS = [
  "PRODUCTS_FETCH",
  "PRODUCT_ADD",
  "PRODUCT_EDIT",
  "PRODUCT_REMOVE",
  "PRODUCT_FETCH",
];

const AUTH = ["SIGN_IN", "SIGN_UP", "SIGN_OUT"];

export const compose = [...AUTH, ...PRODUCTS];
export const constants = actionConstantsCreator(compose);

export const initialState = {
  products: {
    products: [],
    loading: false,
    error: null,
  },
  user: {
    user: null,
    loading: false,
    error: null,
  },
};

export const ROUTES_PATH = {
  SIGN_IN: "/login",
  SIGN_UP: "/registration",
  CATALOG: "/catalog",
  PRODUCT: "/product",
};
