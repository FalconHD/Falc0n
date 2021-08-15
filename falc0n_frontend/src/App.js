import React, { useEffect, useState } from 'react';
import { Sidebar } from './app/views/sidebar/Sidebar';
import Main from './app/views/main/Main';
import { Stores } from './app/views/stores/Stores';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './App.css';
import { Customers } from './app/views/customers/Customers';
import { Orders } from './app/views/orders/Orders';
import Profil from './app/views/profil/Profil';
import Error from './app/views/Error/Error'
import CustomModal from './app/views/Modal/CustomModal';
import Auth from './app/views/auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, verifyToken } from './app/views/main/mainSlice';


require('dotenv').config()

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(true)
  const main = useSelector(state => state.main)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(verifyToken(localStorage.getItem("Token")))
  }, [])


  useEffect(() => {
    if (main.Authorized) {
      setisAuthenticated(true)
      dispatch(getUserData())
    } else {
      setisAuthenticated(false)
    }
  }, [main.Authorized])

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated ? <Sidebar /> : null}
        <Switch>
          <Route path="/auth" >
            <Auth />
          </Route>
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
        <CustomModal />
      </div>

    </Router>
  );
}

export default App;
