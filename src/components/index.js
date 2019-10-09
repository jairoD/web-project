import React, { useState, useEffect } from 'react';
import './../App.css';
import Index from './layout/Index';
import MainPage from './content/inicio';
import { signout } from './services/firebase';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

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
    }
    setIsAuth(val);
  }
  return (
    <main>
    <ReactNotification />
      {
        isAuth ?
          <MainPage setAuthentication={setAuthentication} />
          :
          <Index setAuthentication={setAuthentication} />
      }
    </main>
  );

}

export default App;
