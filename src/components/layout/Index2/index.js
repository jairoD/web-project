import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import React from 'react';
import MainLayout from './../MainLayout';

function Index2(props){
return(
    <BrowserRouter>
        <Route  path="/home" exact render={()=><MainLayout setAuthentication={props.setAuthentication}/>}/>
        
        
    </BrowserRouter>
);
}

export default Index2;