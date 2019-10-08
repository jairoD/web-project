import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Typography, Box, Paper, TextField } from '@material-ui/core';
import { login } from './../../services/firebase';

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
        fontWeight: 'bold',
        color: 'white',
        borderRadius: '100px',
        fontSize: '14px',
        fontWeight: 'bold',
        background: '#495f9e',
        '&:hover': {
            background: '#527aeb',
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
        fontWeight: 'bold',
        '&:hover': {
            background: '#123597',
        },
        margin: '20px 0px',
        width: '60%'
    },
    image: {
        padding: '10px 0px'
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

function LoginPage() {
    const classes = myStyle();
    const [correo, setCorreo] = useState('');
    const [contra, setContra] = useState('');
    const handleSubmit = (evt) => {
        login(correo, contra)
            .then(() => {
                console.log('Usuario autenticado');
            })
            .catch(e => {
                console.log(e);
            })
        console.log(correo);
        console.log(contra);
    }
    return (
        <div className={classes.root}>
            <Grid container justify="center" direction="column" alignItems="center" className={classes.mainContainer} xs={12}>
                <Paper className={classes.Paper}>
                    <img src="https://via.placeholder.com/150" className={classes.image} />
                    <Grid container justify="space-evenly" direction="row" alignItems="center" className={classes.buttonGroup} xs={12}>
                        <Grid item xs={12} sm={6} className={classes.buttonItem}>
                            <Button variant="contained" className={classes.button}>
                                Usuario existente
                        </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.buttonItem}>
                            <Button variant="contained" color="primary" className={classes.button}>
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
                            Recuperar contraseña
                        </Typography>
                    </Box>
                    <Box component="div" display="block" className={classes.prueba}>
                        <Button variant="container" className={classes.loginButton} onClick={handleSubmit}>
                            Iniciar Sesión
                        </Button>
                    </Box>
                </Paper>
            </Grid>
        </div>
    );
}

export default LoginPage;