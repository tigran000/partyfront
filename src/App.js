import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard'

class App extends Component {
  render() {
    return (
      <>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
      </>
    );
  }
}
export default App;