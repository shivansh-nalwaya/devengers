import React from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Form from "./pages/Form";
function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

class AppRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/form" exact component={Form} />
      </Router>
    );
  }
}

export default AppRouter;
