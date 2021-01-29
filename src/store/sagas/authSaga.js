import { call, put, takeLatest } from "redux-saga/effects";

import { push } from "connected-react-router";

import firebase, { reduxSagaFirebase } from "../../firebase";
import { constants, ROUTES_PATH } from "../../constants";
import { actions } from "../actions";
import { sagaAssessor } from "../../utils";

const SignIn = ({ payload, callback }) =>
  sagaAssessor(
    () =>
      function* () {
        let { uid, email, password, token } = payload;
        let user = null;
        let flag = false;

        if (!uid) {
          user = yield call(
            reduxSagaFirebase.auth.signInWithEmailAndPassword,
            email,
            password
          );

          ({ uid, email } = user.user);
          token = user.user.za;
          flag = true;
        }

        yield put(
          actions.SIGN_IN.SUCCEEDED({
            uid,
            email,
          })
        );

        if (token) {
          localStorage.setItem("apptoken", token);
        }

        if (flag) {
          yield put(push(ROUTES_PATH.CATALOG));
        }
      },
    actions.SIGN_IN.FAILED,
    callback
  );

const SignUp = ({ payload, callback }) =>
  sagaAssessor(
    () =>
      function* () {
        try {
          const { email, password } = payload;
          const user = yield call(
            reduxSagaFirebase.auth.createUserWithEmailAndPassword,
            email,
            password
          );
          const { uid, userEmail } = user.user;
          const token = user.user.za;

          yield put(actions.SIGN_UP.SUCCEEDED({ uid, email: userEmail }));

          localStorage.setItem("apptoken", token);

          yield put(push(ROUTES_PATH.CATALOG));
        } catch (e) {
          yield put(push(ROUTES_PATH.SIGN_UP.FAILED(e)));
        }
      },
    actions.SIGN_UP.FAILED,
    callback
  );

const SignOut = ({ _, callback }) =>
  sagaAssessor(
    () =>
      function* () {
        yield call(reduxSagaFirebase.auth.signOut);
        yield put(actions.SIGN_OUT.CLEARED());
        localStorage.removeItem("apptoken");
        yield put(push(ROUTES_PATH.SIGN_IN));
      },
    actions.SIGN_OUT.FAILED,
    callback
  );

export default function* authWatcher() {
  yield takeLatest(constants.SIGN_IN.REQUESTED, SignIn);
  yield takeLatest(constants.SIGN_UP.REQUESTED, SignUp);
  yield takeLatest(constants.SIGN_OUT.REQUESTED, SignOut);
}
