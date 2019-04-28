import React, { Fragment, Component } from "react";
import Header from "./components/layout/Header";
import Dashboard from "./components/leads/Dashboard";

import { Provider } from "react-redux";
import store from "./store";

import { Provider as AlertProvider, positions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alerts from "./components/layout/Alerts";
import Register from "./components/accounts/Register";
import Login from "./components/accounts/Login";
import PrivateRoute from "./components/common/PrivateRoute";

import { loadUser } from "./actions/auth";

import { HashRouter as Router, Route, Switch } from "react-router-dom";

const options = {
  timeout: 5000,
  position: positions.TOP_CENTER
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <div className="container">
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

export default App;
