import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import React from 'react';
import MainLayout from './../MainLayout';
import Perfil from './../../content/Perfil';
import { Provider, Consumer } from '../../AuthContext';
function Index2(props) {
    return (
        <BrowserRouter>
        
            <Route exact path="/home" render={() => <MainLayout  />} />
            <Route exact path="/login">
                <Redirect to={{
                    pathname: "/home",
                }} />
            </Route>
            <Route exact path="/">
                <Redirect to={{
                    pathname: "/home",
                }} />
            </Route>
            <Route exact path="/sigin">
                <Redirect to={{
                    pathname: "/home",
                }} />
            </Route>
            <Route exact path="/perfil" render={() => <Perfil />} />
        </BrowserRouter>
            
    );
}

export default Index2;

{/** 
        <BrowserRouter>
        { ('usuario storage')}
            <Route exact path="/home" render={() => <MainLayout setAuthentication={props.setAuthentication} />} />
            <Route exact path="/login">
                <Redirect to={{
                    pathname: "/home",
                }} />
            </Route>

            <Route exact path="/sigin">
                <Redirect to={{
                    pathname: "/home",
                }} />
            </Route>
            <Route render={() => <div>No existe la ruta</div>} />
            <Route exact path="/perfil" render={() => <Perfil />} />
        </BrowserRouter>
        */}