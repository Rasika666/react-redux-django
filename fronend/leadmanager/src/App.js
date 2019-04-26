import React, { Fragment, Component } from "react";
import Header from "./components/layout/Header";
import Dashboard from "./components/leads/Dashboard";

import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Header />
          <div className="container">
            <Dashboard />
          </div>
        </Fragment>
      </Provider>
    );
  }
}

export default App;
