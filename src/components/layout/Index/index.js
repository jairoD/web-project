import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import React from 'react';
import Login from '../../content/Login';
import Signin from '../../content/Signin';
import IndexLayout from '../IndexLayout';
import Section2 from '../../content/Section2';
import PasswordRecovery from '../../content/Password';
function LoginLayout(props) {
    return (
        <BrowserRouter>
            
            <Route exact path="/" render={() => <IndexLayout />} />
            <Route exact path="/home">
                <Redirect to={{
                    pathname: "/",
                }} />
            </Route>
            <Route exact path="/login" render={() => <Login  />} />
            <Route exact path="/sigin" render={() => <Signin  />} />
            <Route exact path="/nosotros" component={Section2} />
            <Route exact path="/passwordrecovery" component={PasswordRecovery} />
        </BrowserRouter>


    );
}

export default LoginLayout;
{/** 
            <BrowserRouter>
            { ('usuario no storage')}
                <Route exact path="/" render={() => <IndexLayout />} />
                <Route exact path="/home">
                    <Redirect to={{
                        pathname: "/",
                    }} />
                </Route>
                <Route exact path="/login" render={() => <Login setAuthentication={props.setAuthentication} />} />
                <Route exact path="/sigin" render={() => <Signin setAuthentication={props.setAuthentication} />} />
                <Route exact path="/nosotros" component={Section2} />
                <Route exact path="/passwordrecovery" component={PasswordRecovery} />
            </BrowserRouter>
            */}