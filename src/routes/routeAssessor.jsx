import React from "react";
import { Route, Switch } from "react-router";

const routeAssessor = (parentRoutePath, route) => {
  const { children, component, path, exact } = route;

  const fullPath = parentRoutePath ? `${parentRoutePath}${path}` : path;

  if (!children.length) {
    return (
      <Route
        key={fullPath}
        path={fullPath}
        exact={exact}
        component={component}
      />
    );
  } else {
    return (
      <Switch key="parent">
        <Route
          key={fullPath}
          path={fullPath}
          exact={exact}
          component={component}
        />
        {children.map((childRoute) => routeAssessor(path, childRoute))}
      </Switch>
    );
  }
};

export default routeAssessor;
