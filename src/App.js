import React, { useEffect } from "react";
import LogForm from "./components/LogForm";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import LastLog from "./components/LastLog";
import Register from "./components/Register";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import "./fonts.css";
import "./App.css";

// Redux
import { connect } from "react-redux";
import { getData } from "./actions";

function App(props) {

  const { getData } = props;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getData();
    }
  }, [getData])

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route
            path="/register"
            render={routeProps => {
              return <Register {...routeProps} />;
            }}
          />
          <Route
            exact
            path="/"
            render={routeProps => {
              return <Login {...routeProps} />;
            }}
          />
          <PrivateRoute path="/lastlog" component={LastLog}/>
          <PrivateRoute path="/new-log" component={LogForm}/>

        </Switch>
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = state => {
  return {
    logs: state.logs
  };
};

export default connect (
  mapStateToProps,
  { getData }
)(App);