import React, { Component } from 'react';
import { HashRouter as Router, Link, Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Home from './home.js'
import Base from './base.js'

class App extends Component {
  render() {
    return (
      <Router >
        <div className="page">
          <Route exact={true} path="/" component={Home}/>
          <Route path="/samplebase"  render={props => <Base name="Superstore Sales Data" {...props} />} />
        </div>
      </Router>
    );
  }
}

export default App;
