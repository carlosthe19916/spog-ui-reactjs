import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Bullseye, Spinner } from "@patternfly/react-core";

const Vulnerabilities = lazy(() => import("./pages/vulnerabilities"));

export const AppRoutes = () => {
  const routes = [
    {
      Component: Vulnerabilities,
      path: "/vulnerability",
      hasDescendant: false,
      children: undefined,
    },
  ];

  return (
    <Suspense
      fallback={
        <Bullseye>
          <Spinner />
        </Bullseye>
      }
    >
      <Routes>
        {routes.map(({ path, hasDescendant, Component, children }, index) => (
          <Route
            key={index}
            path={!hasDescendant ? path : `${path}/*`}
            element={<Component />}
          >
           
          </Route>
        ))}
        <Route path="/" element={<Navigate to="/vulnerability" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};
