import React from "react";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ProductLstPage from "./pages/ProductListPage/ProductLstPage";
import ProductActionPage from "./pages/ProductActionPage/ProductActionPage";

export const dataRoute = [
  {
    path: "/",
    exact: true,
    main: () => <HomePage />,
  },
  {
    path: "/products-list",
    exact: false,
    main: () => <ProductLstPage />,
  },
  {
    path: "/products/add",
    exact: false,
    main: ({ history }) => <ProductActionPage history={history} />,
  },
  {
    path: "/products/:id/edit",
    exact: false,
    main: ({ match, history }) => (
      <ProductActionPage match={match} history={history} />
    ),
  },
  {
    path: "",
    exact: false,
    main: () => <NotFoundPage />,
  },
];
