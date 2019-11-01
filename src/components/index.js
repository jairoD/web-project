import React, { useState, useEffect } from 'react';

import Index from './layout/Index';
import IndexLayout from './layout/IndexLayout';
import Login from './content/Login';
import Signin from './content/Signin';
import PasswordRecovery from './content/Password';
import MainLayout from './layout/MainLayout';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { signout } from './services/firebase';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import Index2 from './layout/Index2';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const uid = sessionStorage.getItem("user");
    uid !== null && setIsAuth(true);
  }, [isAuth]);

  const setAuthentication = val => {
    if (!val) {
      signout();
      sessionStorage.clear();
      window.location.href ="/";
    }
    setIsAuth(val);
  }
  return (
    <main>
      <ReactNotification />
      {/** 
      <BrowserRouter>
        {
          isAuth ?
            <Redirect to={{
              pathname: "/home",
            }} />
            :
            <Redirect to={{
              pathname: "/",
            }} />
        }
        <Switch>
          
          <Route path="/" exact render={() => <IndexLayout />} />
          <Route path="/home" render={() => <MainLayout setAuthentication={setAuthentication} />} />
          <Route path="/login" render={() => <Login setAuthentication={setAuthentication} />} />
          <Route path="/sigin" render={() => <Signin setAuthentication={setAuthentication} />} />
          <Route path="/passwordrecovery" component={PasswordRecovery} />
        </Switch>
      </BrowserRouter>
      */}
      {
        isAuth ?
          <Index2 setAuthentication={setAuthentication} />
          :
          <Index setAuthentication={setAuthentication} />
        
      }
    </main>
  );

}

export default App;
