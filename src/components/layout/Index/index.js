import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import React from 'react';
import Login from '../../content/Login';
import Signin from '../../content/Signin';
import IndexLayout from '../IndexLayout';
import Section2 from '../../content/Section2';
import PasswordRecovery from '../../content/Password';
function LoginLayout(props) {
    return (
        <main>
            <BrowserRouter>
                
                <Route path="/" exact render={() => <IndexLayout />} />
                <Route path="/login" render={() => <Login setAuthentication={props.setAuthentication} />} />
                <Route path="/sigin" render={() => <Signin setAuthentication={props.setAuthentication} />} />
                <Route path="/nosotros" component={Section2} />
                <Route path="/passwordrecovery" component={PasswordRecovery} />
            </BrowserRouter>
        </main>
    );
}

export default LoginLayout;