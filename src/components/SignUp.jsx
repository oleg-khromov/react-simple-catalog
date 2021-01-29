import React, { useState } from "react";

import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";

import FORMS, { ROUTES_PATH } from "../constants";
import { actions } from "../store/actions";
import { getAuth } from "../store/selectors";

import {
  Grid,
  Typography,
  FormControl,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import Auth from "../containers/Auth";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(
    false
  );
  const dispatch = useDispatch();
  const { error } = useSelector(getAuth());

  const handleSubmit = function (data) {
    dispatch(actions.SIGN_UP.REQUESTED(data));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPasswordConfirmation = () => {
    setShowPasswordConfirmation(!showPasswordConfirmation);
  };

  const handleMouseDownPasswordConfirmation = (event) => {
    event.preventDefault();
  };

  return (
    <Auth>
      <Grid container className="center">
        <Grid item xs={12} sm={8} md={5}>
          <div>
            <Typography component="h1" variant="h5">
              Registration
            </Typography>
            {error && <p className="error">{error}</p>}
            <Formik
              initialValues={FORMS.SIGN_UP.INIT}
              validationSchema={FORMS.SIGN_UP.SCHEME}
              onSubmit={handleSubmit}
            >
              {({
                errors,
                touched,
                values: { email, password, confirmationPassword },
                handleChange,
                setFieldValue,
                setFieldTouched,
              }) => {
                return (
                  <Form>
                    <FormControl margin="normal" required fullWidth>
                      <TextField
                        id="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        helperText={touched.email ? errors.email : ""}
                        error={touched.email && Boolean(errors.email)}
                        value={email}
                        onChange={(e) => {
                          setFieldValue("email", e.target.value);
                          setFieldTouched("email", true, false);
                        }}
                      />
                    </FormControl>
                    <FormControl
                      margin="normal"
                      fullWidth
                      variant="outlined"
                      error={touched.password && Boolean(errors.password)}
                    >
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <OutlinedInput
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                          setFieldValue("password", e.target.value);
                          setFieldTouched("password", true, false);
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        labelWidth={75}
                      />
                      <FormHelperText error={Boolean(errors.password)}>
                        {touched.password && errors.password}
                      </FormHelperText>
                    </FormControl>
                    <FormControl
                      margin="normal"
                      fullWidth
                      variant="outlined"
                      error={
                        touched.confirmationPassword &&
                        Boolean(errors.confirmationPassword)
                      }
                    >
                      <InputLabel htmlFor="password">
                        Confirmation Password
                      </InputLabel>
                      <OutlinedInput
                        id="password"
                        name="password"
                        type={showPasswordConfirmation ? "text" : "password"}
                        value={confirmationPassword}
                        onChange={(e) => {
                          setFieldValue("confirmationPassword", e.target.value);
                          setFieldTouched("confirmationPassword", true, false);
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPasswordConfirmation}
                              onMouseDown={handleMouseDownPasswordConfirmation}
                            >
                              {showPasswordConfirmation ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        labelWidth={175}
                      />
                      <FormHelperText
                        error={Boolean(errors.confirmationPassword)}
                      >
                        {touched.confirmationPassword &&
                          errors.confirmationPassword}
                      </FormHelperText>
                    </FormControl>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Registration
                    </Button>
                    <div className="text-link">
                      <div>
                        <Link to={ROUTES_PATH.SIGN_IN}>
                          <Typography variant="caption" color="primary">
                            Login
                          </Typography>
                        </Link>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </Grid>
      </Grid>
    </Auth>
  );
};

export default SignUp;
