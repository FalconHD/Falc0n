import React from 'react';
import { Sidebar } from './app/views/sidebar/Sidebar';
import { Main } from './app/views/main/Main';
import { Stores } from './app/views/stores/Stores';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

function App() {


  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/stores">
            <Stores />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
