import React, { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import { Bullseye, Spinner } from "@patternfly/react-core";

const Home = lazy(() => import("./pages/home"));
const Advisories = lazy(() => import("./pages/advisories"));
const Packages = lazy(() => import("./pages/packages"));

export const AppRoutes = () => {
  const allRoutes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/advisory", element: <Advisories /> },
    { path: "/package", element: <Packages /> },
    { path: "*", element: <Navigate to="/" /> },
  ]);

  return (
    <Suspense
      fallback={
        <Bullseye>
          <Spinner />
        </Bullseye>
      }
    >
      {allRoutes}
    </Suspense>
  );
};
