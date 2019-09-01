import React from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Form from "./pages/Form";
import BulkUpload from "./pages/BulkUpload";

class AppRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/form" exact component={Form} />
        <Route path="/bulk-upload" exact component={BulkUpload} />
      </Router>
    );
  }
}

export default AppRouter;
