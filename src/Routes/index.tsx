import React from "react";
import { Route, Switch } from "react-router";
import { Login } from "../pages/Login/login";

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login} />
  </Switch>
);
