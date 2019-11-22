import React, { useState, useEffect } from 'react';

import Index from './layout/Index';
import Index2 from './layout/Index2';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { signout } from './services/firebase';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import { Provider, Consumer } from './AuthContext';


function App() {
  
  /** 
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const uid = sessionStorage.getItem("user");
    uid !== null && setIsAuth(true);
  }, [isAuth]);

  const setAuthentication = val => {
    if (!val) {
      signout();
      sessionStorage.clear();
    } else {
    }
    setIsAuth(val);
  }
  */
  return (
    <div>
      <Provider>
        <Consumer>
          {({ isAuth }) => (
            //condicional para evaluar el estado global
            isAuth ?
              <Index2 />
              :
              <Index />
          )}
        </Consumer>
      </Provider>
    </div>
  );

}

export default App;
