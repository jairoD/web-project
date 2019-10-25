import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Typography, Box, Paper, TextField } from '@material-ui/core';
import { sigin, addUser } from '../../services/firebase';
import { Link as RouterLink } from 'react-router-dom';
import logo from './../../../logo.svg';
import { store } from 'react-notifications-component';
import { Link } from 'react-router-dom';
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
    button: {
        marginRight:'100px',
        fontWeight: 'bold',
        color: 'white',
        borderRadius: '100px',
        fontSize: '12px',
        background: '#495f9e',
        '&:hover': {
            background: '#527aeb',
        },

    },
    buttonGruopLogin: {
        fontWeight: 'bold',
        color: 'white',
        borderRadius: '100px',
        fontSize: '12px',
        background: '#8f93a1',
        '&:hover': {
            background: '#495f9e',
        },

    },
    buttonGruopSign: {
        fontWeight: 'bold',
        color: 'white',
        borderRadius: '100px',
        fontSize: '12px',
        background: '#3b549c',
        '&:hover': {
            background: '#527aeb',
        },

    },
    siginButton: {
        background: '#2b55cc',
        fontWeight: 'bold',
        color: 'white',
        borderRadius: '100px',
        fontSize: '14px',
        fontWeight: 'bold',
        '&:hover': {
            background: '#123597',
        },
        margin: '20px 0px',
        width: '60%'
    },
    buttonGroup: {
        marginRight: '100px',
        paddingTop: '30px'
    },
    image: {
        padding: '10px 0px',
        width: '250px'
    },
    textField: {
        display:'block',
    },
    remember: {
        marginRight: theme.spacing(1),
        textAlign: 'end',
        fontSize: '14px',
        fontWeight: 'bold',
    },
    form: {
        width:'90%'
    }
}));
const notification = {
    message: "Configurable",
    type: "success",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"]
};
const Link1 = React.forwardRef((props, ref) => (
    <RouterLink innerRef={ref} to="/login" {...props} />
));

function SiginComponent(props) {
    const classes = myStyle();
    const [correo, setCorreo] = useState('');
    const [contra, setContra] = useState('');
    const [nombre, setNombre] = useState('');
    const [confirm, setConfirm] = useState('');
    const handleSubmit = (evt) => {
        if (contra !== confirm || nombre === '') {
            store.addNotification({
                ...notification,
                message: 'Asegurese de llenar los campos correctamente',
                type: 'danger'
            })
        } else {
            sigin(correo, contra, nombre).then((u) => {
                addUser(correo,nombre,u.user.uid).then(function(res){
                    store.addNotification({
                        ...notification,
                        message: 'Registro exitoso: ' + u.user.uid
                    });
                    props.setAuthentication(true);
                    sessionStorage.setItem('user',u.user.uid);
                }).catch((error)=>{
                    console.log(error);
                });
            }).catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    store.addNotification({
                        ...notification,
                        message: 'contraseña muy debil',
                        type: 'danger'
                    })
                  } else {
                    store.addNotification({
                        ...notification,
                        message: 'Error de registro, por favor intente nuevamente',
                        type: 'danger'
                    })
                  }
            })
        }
    }
    return (
        <div className={classes.root}>
            <Grid container justify="center" direction="column" alignItems="center" className={classes.mainContainer} xs={12}>
                <Paper className={classes.Paper}>
                <Link to="/"><img src={logo} className={classes.image} /></Link>
                    <Grid container justify="space-evenly" direction="row" alignItems="center" className={classes.buttonGroup}>
                        <Grid item xs={12} sm={6} className={classes.buttonItem}>
                            <Button variant="contained" component={Link1} fullWidth className={classes.buttonGruopLogin}>
                                Usuario existente
                        </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.buttonItem}>
                            <Button variant="contained" fullWidth color="primary" className={classes.buttonGruopSign}>
                                Registrarse
                        </Button>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" direction="column" alignItems="center">
                    <form className={classes.form}>
                        <TextField
                            fullWidth
                            id="standard-name"
                            label="Nombre completo"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            className={classes.textField}
                            type="name"
                            margin="normal"
                        /><TextField
                            fullWidth
                            id="standard-name"
                            label="Correo"
                            value={correo}
                            onChange={e => setCorreo(e.target.value)}
                            className={classes.textField}
                            type="email"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            id="standard-password-input"
                            label="contraseña"
                            className={classes.textField}
                            type="password"
                            value={contra}
                            onChange={e => setContra(e.target.value)}
                            autoComplete="current-password"
                            margin="normal"
                        /><TextField
                            fullWidth
                            id="standard-password-input"
                            label="Confirmar contraseña"
                            className={classes.textField}
                            type="password"
                            value={confirm}
                            onChange={e => setConfirm(e.target.value)}
                            autoComplete="current-password"
                        />

                    </form>
                    </Grid>

                    <Box component="div" display="block" className={classes.prueba}>
                        <Button variant="container" className={classes.siginButton} onClick={handleSubmit}>
                            Registrarse
                        </Button>
                    </Box>
                </Paper>
            </Grid>
        </div>
    );
}

export default SiginComponent;