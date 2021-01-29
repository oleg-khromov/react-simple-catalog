import { ROUTES_PATH } from "../constants";

import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Catalog from "../components/Catalog";
import Product from "../components/Product";

export const privateRoutes = (userRole) =>
  [
    {
      path: ROUTES_PATH.CATALOG,
      component: Catalog,
      exact: true,
      children: [],
    },
    {
      path: ROUTES_PATH.PRODUCT,
      component: Product,
      exact: true,
      children: [
        {
          path: "/:id",
          component: Product,
          exact: true,
          children: [],
        },
      ],
    },
  ].filter((route) => (userRole ? route.accessLevel.includes(userRole) : true));

export const publicRoutes = [
  {
    path: ROUTES_PATH.SIGN_IN,
    component: SignIn,
    exact: true,
    children: [],
  },
  {
    path: ROUTES_PATH.SIGN_UP,
    component: SignUp,
    exact: true,
    children: [],
  },
];
