import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';
import Login from '../../content/Login';
import Signin from '../../content/Signin';
import IndexLayout from '../IndexLayout';
import Nosotros from '../../content/Section2';
import PasswordRecovery from '../../content/Password';
function LoginLayout(props) {
    return (
        <main>
            <BrowserRouter>
                <Route path="/" exact render={()=><IndexLayout/>}/>
                <Route path="/login" render={()=><Login setAuthentication={props.setAuthentication}/>}/>
                <Route path="/sigin" render={()=><Signin setAuthentication={props.setAuthentication}/>}/>
                <Route path="/passwordrecovery" component={PasswordRecovery}/>
            </BrowserRouter>
        </main>
    );
}

export default LoginLayout;