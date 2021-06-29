import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/forgot_password" component={ForgotPassword} />
      <Route exact path="/reset_password" component={ResetPassword} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
