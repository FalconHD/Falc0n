import React from 'react';
import { Sidebar } from './app/views/sidebar/Sidebar';
import Main from './app/views/main/Main';
import { Stores } from './app/views/stores/Stores';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import { Customers } from './app/views/customers/Customers';
import { Orders } from './app/views/orders/Orders';
import Profil from './app/views/profil/Profil';
import Error from './app/views/Error/Error'
import CustomModal from './app/views/Modal/CustomModal';


require('dotenv').config()

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
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/customers">
            <Customers />
          </Route>
          <Route path="/profil">
            <Profil />
          </Route>
        </Switch>
        <Error />
        <CustomModal/>
      </div>
    </Router>
  );
}

export default App;
