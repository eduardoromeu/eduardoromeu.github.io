import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Header from './components/Header';
import Repos from './pages/Repos';
import BusinessCard from './components/BusinessCard';
import NotFound from './pages/NotFound';

function App() {

  return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/repos">
            <Repos />
          </Route>
          <Route path="/card">
            <BusinessCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
