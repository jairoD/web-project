import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, TextField, ListItem, ListItemText, Grid, Avatar, IconButton } from '@material-ui/core';
import { getUser, updateUser } from './../../services/firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


const myStyle = makeStyles(theme => ({
    Paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        padding: theme.spacing(3),
        minWidth: '40%'
    },
    textField: {

        width: '100%'
    },
    item: {
        width: '100%'
    },
    button: {
        margin: theme.spacing(1),
    },
    bigAvatar: {
        margin: 10,
        width: 180,
        height: 180,
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        maxWidth: '400px'
    },
    btn: {
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#cacad8',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        textAlign: 'center',
        '&:hover': {
            background: '#3f51b5',
        },
    },
    input: {
        display: 'none',
    },
}));

function Perfil() {
    const [files, setFile] = useState(null);
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [userInfo, setInfo] = useState(null);
    const [imageTo, setImageTo] = useState('');
    const uid = sessionStorage.getItem("user");
    const classes = myStyle();
    useEffect(() => {
        getUser(uid).onSnapshot((res) => {
            setInfo(res);
        });
    });

    function update(e) {
        e.preventDefault();
        updateUser(uid).update({
            nombre: nombre,
            perfil: files
        }).then(function () {
            alert("Document successfully updated!");
        }).catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }


    const handleUploaded = e => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function () {
            setFile(reader.result)
        }
        reader.readAsDataURL(file);
    }
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Paper className={classes.Paper}>
                <form>
                    <Grid container direction="column" justify="center" alignItems="center">
                        {/** 
                        <Grid item>
                            {files &&
                                <div>
                                    <h1>Previsualizacion</h1>
                                    <Avatar alt="perfilprev" src={files} className={classes.bigAvatar} />
                                </div>
                            }
                        </Grid>
                        <Grid item>
                            <input type="file" name="file" onChange={handleUploaded} />
                        </Grid>
                        */}
                        {
                            userInfo ?
                                <Grid container container direction="column" justify="center" alignItems="center">
                                    <Grid item>
                                        <div className={classes.imageContainer}>
                                            {
                                                files ?
                                                    <Avatar alt="perfilprev" src={files} className={classes.bigAvatar} />
                                                    :
                                                    <Avatar alt="perfilprev" src={userInfo.data().perfil} className={classes.bigAvatar} />
                                            }
                                            <input
                                                accept="image/*"
                                                className={classes.input}
                                                id="contained-button-file"
                                                name="file"
                                                type="file"
                                                onChange={handleUploaded}
                                            />
                                            <label htmlFor="contained-button-file">
                                                <IconButton   variant="contained" component="span" className={classes.btn}>
                                                    <AddCircleOutlineIcon  />
                                                </IconButton>
                                            </label>
                                        </div>
                                    </Grid>
                                    <Grid item className={classes.item}>
                                        <TextField
                                            className={classes.textField}
                                            id="standard-name"
                                            label="Nombre"
                                            placeholder={userInfo.data().nombre}
                                            type="text"
                                            value={nombre}
                                            onChange={e => setNombre(e.target.value)}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item className={classes.item}>
                                        <TextField
                                            className={classes.textField}
                                            id="standard-password-input"
                                            label="correo"
                                            type="text"
                                            value={userInfo.data().correo}
                                            disabled
                                            margin="normal"
                                        />
                                    </Grid>
                                </Grid>
                                :
                                <Grid>
                                    <CircularProgress />
                                </Grid>
                        }

                        <Button variant="contained" color="primary" onClick={update} className={classes.button}>
                            Guardar
                        </Button>
                        {/** 
                        <TextField  
                            id="standard-name"
                            label="Correo"
                            value={correo}
                            onChange={e => setCorreo(e.target.value)}
                            type="email"
                            margin="normal"
                        />
                        <TextField
                            id="standard-password-input"
                            label="Nombre"
                            type="password"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            margin="normal"
                        />
                        */}
                    </Grid>
                </form>
            </Paper>
        </Grid>
    );
}

export default Perfil;