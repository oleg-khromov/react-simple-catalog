import { constants, initialState } from "../../constants";

const authReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case constants.SIGN_IN.REQUESTED:
    case constants.SIGN_UP.REQUESTED:
    case constants.SIGN_OUT.REQUESTED:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case constants.SIGN_IN.SUCCEEDED:
    case constants.SIGN_UP.SUCCEEDED:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case constants.SIGN_OUT.SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case constants.SIGN_IN.FAILED:
    case constants.SIGN_UP.FAILED:
    case constants.SIGN_OUT.FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case constants.SIGN_IN.CLEARED:
    case constants.SIGN_UP.CLEARED:
    case constants.SIGN_OUT.CLEARED:
      return {
        ...initialState.user,
        loading: false,
      };

    default:
      return { ...state };
  }
};

export default authReducer;
