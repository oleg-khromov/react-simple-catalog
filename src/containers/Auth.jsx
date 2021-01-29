import React, { useEffect } from "react";

import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";

import { ROUTES_PATH } from "../constants";
import { getAuth } from "../store/selectors";

const Auth = ({ children }) => {
  const dispatch = useDispatch();
  //const { user } = useSelector(getAuth());
  const token = localStorage.getItem("apptoken");

  useEffect(() => {
    if (token) {
      dispatch(push(ROUTES_PATH.CATALOG));
    }
  }, []);

  return !token ? <div className="mainbox">{children}</div> : null;
};

export default Auth;
