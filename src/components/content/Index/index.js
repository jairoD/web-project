import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import logo from './../../../logo.svg';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor:'black',
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    appbar:{
        backgroundColor: '#123597',
    },
    button:{
        fontWeight: 'bold',
        color: 'white',
        borderRadius: '100px',
        fontSize: '14px',
        '&:hover': {
            background: '#2b55cc',
        },
    },
    image: {
        padding: '10px 0px',
        width: '150px'
    },
  }));
  const Link1 = React.forwardRef((props, ref) => (
    <RouterLink innerRef={ref} to="/sigin" {...props} />
  ));
  const Link2 = React.forwardRef((props, ref) => (
    <RouterLink innerRef={ref} to="/nosotros" {...props} />
  ));
export default function AppBarIndex() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
            <img src={logo} className={classes.image} />
            </Typography>
            <Button color="inherit" className={classes.button} component={Link1}>Únete</Button>
            <Button color="inherit" className={classes.button} >Nosotros</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }