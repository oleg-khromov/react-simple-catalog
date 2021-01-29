import { constants, initialState } from "../../constants";

const productsReducer = (state = initialState.products, action) => {
  switch (action.type) {
    case constants.PRODUCTS_FETCH.REQUESTED:
    case constants.PRODUCT_ADD.REQUESTED:
    case constants.PRODUCT_EDIT.REQUESTED:
    case constants.PRODUCT_REMOVE.REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case constants.PRODUCTS_FETCH.SUCCEEDED:
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      };
    case constants.PRODUCT_ADD.SUCCEEDED:
      return {
        ...state,
        products: [].concat(action.payload, ...state.products).sort(),
        loading: false,
        error: null,
      };
    case constants.PRODUCT_EDIT.SUCCEEDED:
      return {
        ...state,
        products: [...state.products].map((product) => {
          if (product.id === action.payload.id) {
            return action.payload;
          } else {
            return product;
          }
        }),
        loading: false,
        error: null,
      };
    case constants.PRODUCT_REMOVE.SUCCEEDED:
      return {
        ...state,
        products: [...state.products].filter(
          (product) => product.id !== action.payload
        ),
        loading: false,
        error: null,
      };
    case constants.PRODUCTS_FETCH.FAILED:
    case constants.PRODUCT_ADD.FAILED:
    case constants.PRODUCT_EDIT.FAILED:
    case constants.PRODUCT_REMOVE.FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case constants.PRODUCTS_FETCH.CLEARED:
      return {
        ...state,
        products: null,
      };

    default:
      return { ...state };
  }
};

export default productsReducer;
