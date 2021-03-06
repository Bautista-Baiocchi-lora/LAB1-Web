import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import LoginScreen from "../screens/login.screen";
import QRInviteScreen from "../screens/qr.invite.screen";
import RegisterScreen from "../screens/register.screen";

function LoginNavigator() {
  return (
    <Switch>
      <Route path="/qr" component={QRInviteScreen} />
      <Route path="/ingresar" component={LoginScreen} />
      <Route path="/registrar" component={RegisterScreen} />
      <Route>
        <Redirect to="/ingresar" />
      </Route>
    </Switch>
  );
}

export default LoginNavigator;
