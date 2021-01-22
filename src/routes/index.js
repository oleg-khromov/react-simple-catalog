import { ROUTES_PATH } from "../constants";

import Auth from "../containers/Auth";
import Catalog from "../containers/Catalog";
import Product from "../containers/Product";

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
          path: "/:id/:action",
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
    component: Auth,
    exact: true,
    children: [],
  },
];
