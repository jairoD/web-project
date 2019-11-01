import React, { Component } from 'react';
import { makeStyles, useTheme, Divider, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Hidden, Drawer } from '@material-ui/core';
import { allUser } from './../../services/firebase';

export default class ListaUsuarios extends Component {
    state = {
        items: null,
        itemss: 'hola'
    }

    componentDidMount() {
        allUser().onSnapshot((res) => {
            const aux = []
            res.forEach((doc) => {
                aux.push(doc);
            });
            this.setState({
                items: aux
            })
        });
        
    }
    render() {
        const { items } = this.state;
        const { itemss} = this.state;
        //const {asd} = this.state.try;
        return (
            <div>
                <h1>Listado {itemss}</h1>
                {
                    items &&
                    items.map((item, key)  => {
                        return (
                            <ListItem button key={key}>
                                
                                <ListItemText>
                                    {'Nombre: ' + item.data().nombre}   <br></br> {'Correo: ' + item.data().correo}
                                </ListItemText>
                            </ListItem>
                        )
                    })
                }
            </div>
        );
    }
}