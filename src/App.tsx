import "./App.css";
import React from "react";
import { HashRouter } from "react-router-dom";

import { DefaultLayout } from "./layout";
import { AppRoutes } from "./Routes";

const App: React.FC = () => {
  return (
    <HashRouter>
      <DefaultLayout>
        <AppRoutes />
      </DefaultLayout>
    </HashRouter>
  );
};

export default App;
