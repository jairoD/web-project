import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography, Box, Paper, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { passwordRecovery } from './../../services/firebase';
import swal from 'sweetalert';
import logo from './../../../logo.svg';
import { Link } from 'react-router-dom';
import { store } from 'react-notifications-component';


const myStyle = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        height: '100vh',
        backgroundImage: `url('https://content.fortune.com/wp-content/uploads/2016/03/katowice2015_2.jpg')`,
    },
    image: {
        padding: '10px 0px',
        width: '250px'
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
const notification = {
    message: "Configurable",
    type: "success",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"]
};
function sweetalertfunction() {
    console.log('button clicked')
    swal("Revise su email", "en pocos minutos su contraseña será enviada", "success");

}

function PasswordRecovery() {
    const classes = myStyle();
    const [variant, setVariant] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [email, setEmail] = useState('');


    const handleSubmit = (evt) => {
        evt.preventDefault();
        setLoading(true);
        if (email !== '') {
            console.log(email);
            passwordRecovery(email)
                .then(user => {
                    swal("Revise su email", "en pocos minutos su contraseña será enviada", "success");
                    setVariant('success');
                    setMessage('Se ha enviado un correo para restablecer su clave');
                    setOpen(true);
                    setTimeout(() => {
                        setEmail('');
                        setLoading(false);
                    }, 2000);
                })
                .catch(err => {
                    setTimeout(() => {
                        swal("Error", "Confirme el correo y su conexión de internet", "error");
                        setVariant('error');
                        setMessage('Correo inválido');
                        setOpen(true);
                        setLoading(false);
                    }, 2000);
                });
        } else {
            store.addNotification({
                ...notification,
                message: 'Correo no valido',
                type: 'danger'
            })
            setVariant('error');
            setMessage('Digite un correo');
            setOpen(true);
            setEmail('');
            setLoading(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };



    return (
        <div className={classes.root}>
            <Grid container justify="center" direction="column" alignItems="center" className={classes.mainContainer} xs={12}>
                <Paper className={classes.Paper}>
                    <Link to="/"><img src={logo} className={classes.image} /></Link>
                    <form>
                        <TextField
                            id="standard-name"
                            label="Correo"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className={classes.textField}
                            type="email"
                            margin="normal"
                        />
                        <Box component="div" display="block" textAlign="end" className={classes.remember}>
                            <Typography variant="subtitle1" component="subtitle1">
                                <Link to="/login">volver</Link>
                            </Typography>
                        </Box>
                        <Grid container justify="space-evenly" direction="row" alignItems="center" className={classes.buttonGroup} xs={12}>
                            <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit} >
                                Enviar
                             </Button>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </div>


    );
}
export default PasswordRecovery;