import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Routing components
import  Login from "./components/login";
import Dashboard from "./components/layout";
import {PrivateRoute} from './private';
const AppRoute = () => {
  return (
    <Router>
          <PrivateRoute exact path="/" component={Dashboard} />
           <Route path="/login" component={Login} />
    </Router>
  );
};
export default AppRoute;
