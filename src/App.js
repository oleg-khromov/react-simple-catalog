import React from "react";

import { Switch } from "react-router";

import routeAssessor from "./routes/routeAssessor";
import { privateRoutes, publicRoutes } from "./routes";

import Main from "./containers/Main";

import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./styles";

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Switch>
        {publicRoutes.map((route) => routeAssessor(null, route))}
        <Main>
          {privateRoutes().map((route) => routeAssessor(null, route))}
        </Main>
      </Switch>
    </MuiThemeProvider>
  );
};

export default App;
