import { call, put } from "redux-saga/effects";

const types = ["REQUESTED", "SUCCEEDED", "FAILED", "CLEARED"];

export const actionConstantsCreator = (constArr) => {
  const result = {};

  constArr.forEach((constItem) => {
    result[constItem] = {};
    types.forEach((typeItem) => {
      result[constItem][typeItem] = `${constItem}_${typeItem}`;
    });
  });

  return result;
};

export const actionCreator = (constArr) => {
  const result = {};

  constArr.forEach((constItem) => {
    result[constItem] = {};
    types.forEach((typeItem) => {
      result[constItem][typeItem] = (payload = {}, callback, options) => ({
        type: `${constItem}_${typeItem}`,
        payload,
        callback,
        options,
      });
    });
  });

  return result;
};

export function* sagaAssessor(request, failure, callback) {
  try {
    yield call(request());
  } catch (e) {
    yield put(failure(e));
  } finally {
    callback & (typeof callback === "function") && callback();
  }
}

export const createReducer = (initialState, handlers) => (state = initialState, action) =>
  handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state;
