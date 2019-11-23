import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Typography, Box, Paper, TextField } from '@material-ui/core';
import { login } from './../../services/firebase';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import logo from './../../../logo.svg';
import { store } from 'react-notifications-component';
import { Consumer } from '../../AuthContext';

const myStyle = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        height: '100vh',
        backgroundImage: `url('https://content.fortune.com/wp-content/uploads/2016/03/katowice2015_2.jpg')`,
    },
    Paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        padding: theme.spacing(3),

    },
    mainContainer: {
        height: '100%',
    },
    buttonItem: {
        padding: theme.spacing(1)
    },
    buttonGruopLogin: {
        fontWeight: 'bold',
        color: 'white',
        borderRadius: '100px',
        fontSize: '12px',
        background: '#3b549c',
        '&:hover': {
            background: '#527aeb',
        },

    },
    buttonGruopSign: {
        fontWeight: 'bold',
        color: 'white',
        borderRadius: '100px',
        fontSize: '12px',
        background: '#8f93a1',
        '&:hover': {
            background: '#495f9e',
        },

    },
    buttonGroup: {
        paddingTop: '30px'
    },
    loginButton: {
        background: '#2b55cc',
        fontWeight: 'bold',
        color: 'white',
        borderRadius: '100px',
        fontSize: '14px',
        '&:hover': {
            background: '#123597',
        },
        margin: '20px 0px',
        width: '60%'
    },
    image: {
        padding: '10px 0px',
        width: '250px'
    },
    textField: {
        width: '90%',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    remember: {
        marginRight: theme.spacing(1),
        textAlign: 'end',
        fontSize: '14px',
        fontWeight: 'bold',
    }
}));
const Link1 = React.forwardRef((props, ref) => (
    <RouterLink innerRef={ref} to="/sigin" {...props} />
));
const notification = {
    message: "Configurable",
    type: "success",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
        duration: 5000,
        onScreen: true
      }
};
function LoginComponent(props) {
    const classes = myStyle();
    const [correo, setCorreo] = useState('');
    const [contra, setContra] = useState('');
    const handleSubmit = (evt,setAuth) => {
        login(correo, contra)
            .then((u) => {
                store.addNotification({
                    ...notification,
                    message: 'Bienvenido: ' + u.user.uid
                })
                console.log(u.user.uid);
                sessionStorage.setItem('user', u.user.uid);
                setAuth(true);
            })
            .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    store.addNotification({
                        ...notification,
                        message: 'Contraseña incorrecta',
                        type: 'danger'
                    })
                }
                if (errorCode === 'auth/user-not-found') {
                    store.addNotification({
                        ...notification,
                        message: 'No existe el usuario',
                        type: 'danger'
                    })
                }
                if (errorCode === 'auth/invalid-email') {
                    store.addNotification({
                        ...notification,
                        message: 'correo no valido',
                        type: 'danger'
                    })
                }

            })
        
        
    }

    return (
        <div className={classes.root}>
            <Consumer>
                {({ setAuth }) => (
                    <Grid container justify="center" direction="column" alignItems="center" className={classes.mainContainer} xs={12}>
                        <Paper className={classes.Paper}>
                            <Link to="/"><img src={logo} className={classes.image} /></Link>
                            <Grid container justify="space-evenly" direction="row" alignItems="center" className={classes.buttonGroup} xs={12}>
                                <Grid item xs={12} sm={6} className={classes.buttonItem}>
                                    <Button variant="contained" fullWidth className={classes.buttonGruopLogin}>
                                        Usuario existente
                        </Button>
                                </Grid>
                                <Grid item xs={12} sm={6} className={classes.buttonItem}>
                                    <Button variant="contained" component={Link1} fullWidth color="primary" className={classes.buttonGruopSign}>
                                        Registrarse
                        </Button>
                                </Grid>
                            </Grid>

                            <form>
                                <TextField
                                    id="standard-name"
                                    label="Correo"
                                    value={correo}
                                    onChange={e => setCorreo(e.target.value)}
                                    className={classes.textField}
                                    type="email"
                                    margin="normal"
                                />
                                <TextField
                                    id="standard-password-input"
                                    label="contraseña"
                                    className={classes.textField}
                                    type="password"
                                    value={contra}
                                    onChange={e => setContra(e.target.value)}
                                    autoComplete="current-password"
                                    margin="normal"
                                />
                            </form>

                            <Box component="div" display="block" textAlign="end" className={classes.remember}>
                                <Typography variant="subtitle1" component="subtitle1">
                                    <Link to="/passwordrecovery">Recuperar contraseña</Link>
                                </Typography>
                            </Box>
                            <Box component="div" display="block" className={classes.prueba}>
                                <Button variant="container" className={classes.loginButton} onClick={e=>handleSubmit(e,setAuth)}>
                                    Iniciar Sesión
                        </Button>
                            </Box>

                        </Paper>
                    </Grid>
                )}
            </Consumer>
        </div>
    );
}

export default LoginComponent;