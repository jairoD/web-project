import React, { Component } from 'react';
import {allUser} from './../../services/firebase';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

 class Todos extends Component {
    
    state={
      nombres:[]
    }

  componentDidMount(){

    allUser().then(snapShots=>{
        this.setState({
            nombres:snapShots.docs.map(doc =>{
                // (doc.data());
                return{
                    id: doc.id,
                    data: doc.data()
            }
            })
        })
    }).catch(error=>{
         (error);
    })
  }
    render() {
        const {nombres} =this.state;
    return (
        <Paper className={this.props.classes.root}>
        <Table className={this.props.classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={this.props.classes.primeraFila } >Nombre</TableCell>
              <TableCell align="right" className={this.props.classes.primeraFila}>Correo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nombres && nombres !== undefined? nombres.map((item,key)=>(
                    <TableRow key={key}>
                    <TableCell component="th" scope="row">
                    {item.data.nombre}
                    </TableCell>
                    <TableCell align="right">
                    {item.data.correo}
                    </TableCell>
                    </TableRow>
                )):null}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}
export default withStyles({
    root: {
        width: '80%',
        overflowX: 'auto',
      },
      table: {
        minWidth: 650,
      },
      primeraFila:{
          fontWeight:"bold",
          backgroundColor: 'black',
          color: 'white'
      },

          
        

}) (Todos);