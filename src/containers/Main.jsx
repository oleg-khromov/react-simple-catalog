import React, { useEffect } from "react";

import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import jwt from "jsonwebtoken";

import { ROUTES_PATH } from "../constants";
import { actions } from "../store/actions";
import { getAuth } from "../store/selectors";
import firebase from "../firebase";

import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";

const Main = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(getAuth());

  useEffect(() => {
    const token = localStorage.getItem("apptoken");

    if (token) {
      const decoded = jwt.decode(token);

      if (decoded.exp < new Date().getTime() / 1000) {
        localStorage.removeItem("apptoken");
        dispatch(push(ROUTES_PATH.SIGN_IN));
      } else {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            const { uid, email, token: refreshToken } = user;
            dispatch(actions.SIGN_IN.REQUESTED({ uid, email, token }));
          } else {
            dispatch(push(ROUTES_PATH.SIGN_IN));
          }
        });
      }
    } else {
      dispatch(push(ROUTES_PATH.SIGN_IN));
    }
  }, []);

  return user ? (
    <>
      <AppBar position="static" className="header">
        <Toolbar className="toolbar">
          <Typography variant="h6">{user.email}</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch(actions.SIGN_OUT.REQUESTED())}
          >
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </>
  ) : null;
};

export default Main;
