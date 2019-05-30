import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.jsx";
import AuthLayout from "layouts/Auth.jsx";
import PrivateRouter from "components/privaterouter"

class App extends React.Component {
  render(){
    return (
    <BrowserRouter>
      <Switch>
        <PrivateRouter path="/admin" component={AdminLayout} />
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Redirect from="/" to="/admin/index" />
      </Switch>
  </BrowserRouter>
  )}
}

ReactDOM.render(<App />,document.getElementById("root"));
