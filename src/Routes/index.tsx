import React from "react";
import { Switch } from "react-router";
import { Login } from "../pages/Login/login";
import { Dashboard } from "../components/dashboard";

import { Route } from "./Routes";
import { SignUp } from "../pages/Cadastro/signUp";
import { Cart } from "../pages/Cart";
export const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/signUp" component={SignUp} />
    <Route path="/cart" component={Cart} isPrivate />
  </Switch>
);
