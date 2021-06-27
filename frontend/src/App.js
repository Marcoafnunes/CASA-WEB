import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import CMS from './CMS';
import Register from './components/Register';
import withAuth from './withAuth';

const App = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/forgotpassword" component={ForgotPassword}></Route>
        <Route path="/reset/:resetPasswordToken" component={ResetPassword}></Route>
        <Route path="/" component={withAuth(CMS)}></Route>
      </Switch>
    </BrowserRouter>
  </div>
)

export default App;