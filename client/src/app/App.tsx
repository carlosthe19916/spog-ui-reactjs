import "./App.css";
import React from "react";
import { HashRouter as Router } from "react-router-dom";

import { DefaultLayout } from "./layout";
import { AppRoutes } from "./Routes";

import "@patternfly/patternfly/patternfly.css";
import "@patternfly/patternfly/patternfly-addons.css";

const App: React.FC = () => {
  return (
    <Router>
      <DefaultLayout>
        <AppRoutes />
      </DefaultLayout>
    </Router>
  );
};

export default App;
