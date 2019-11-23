import React, { useState, useEffect } from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Typography, Box, Paper, TextField, ListItem, ListItemText, Grid, Avatar, IconButton, List, ListItemIcon } from '@material-ui/core';
import { getUser, updateUser, matchUser, postEquipo, getEquipos, delEquipo } from './../../services/firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const myStyle = makeStyles(theme => ({
    Paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        padding: theme.spacing(3),
        minWidth: '320px',
        maxWidth: '320px'
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
        width: 100,
        height: 100,
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
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

function CEquipo() {
    const [files, setFile] = useState(null);
    const [nombre, setNombre] = useState('');
    const [userInfo, setInfo] = useState(null);
    const [miembro, setMiembro] = useState('');
    const [miembros, setMiembros] = useState(null);
    const uid = sessionStorage.getItem("user");
    const [integrantes, setIntegrantes] = useState([]);
    const classes = myStyle();
    const [equipos, setEquipos] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [up, setUp] = React.useState(false);

    useEffect(() => {
        getUser(uid).get().then(res => {
            setInfo(res);
        });
    }, []);
    useEffect(() => {
        var aux = [];
        
        getEquipos(uid).onSnapshot((res) => {
            res.forEach((doc) => {
                
                aux.push(doc);
            })
            setEquipos(aux);
        });
    }, []);

    function addIntegrantes(item) {
        var aux = integrantes;
        //aux = integrantes;
        aux.includes(item) || aux.push(item);
        setIntegrantes(aux);
    }
    function publicar(e) {
        e.preventDefault();
        var aux = [];
        integrantes.forEach(res => {
            aux.push(res.data().nombre);
        });
        setUp(true);
        var equipo = {
            nombre: nombre,
            integrantes: aux,
            lider: uid,
            logo: files
        };
        postEquipo(equipo).then(res => {
            setNombre('');
            setMiembro(null);
            setMiembros(null);
            setIntegrantes(null);
            setUp(false);
            handleClose();
        })
    }
    function remove(item) {
        var aux = integrantes;
        aux.splice(aux.indexOf(item, 1));
        setIntegrantes(aux);
    }

    
    function getMatch(e) {
        e.preventDefault();
        var aux = [];
        
        matchUser(miembro).get().then((res) => {
            res.forEach((doc) => {
                aux.push(doc);
            });
        });
        setMiembros(aux);
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUploaded = e => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function () {
            setFile(reader.result)
        }
        reader.readAsDataURL(file);
    }
    return (
        <Grid container justify="flex-start">
            {
                equipos &&
                equipos.map(item => (
                    <Grid item style={{ padding: '10px' }}>
                        <Paper className={classes.Paper}>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <Grid container container direction="column" justify="center" alignItems="center">
                                    <Grid item >
                                        <div className={classes.imageContainer}>
                                            <Avatar alt="perfilprev" src={item.data().logo} className={classes.bigAvatar} />
                                        </div>
                                    </Grid>
                                    <Grid item className={classes.item}>
                                        <Typography variant="h6" noWrap>{item.data().nombre}</Typography>
                                    </Grid>
                                    <Grid item className={classes.item}>
                                        <Typography variant="subtitle1" noWrap>Lider: {userInfo.data().nombre}</Typography>
                                    </Grid>
                                    <Grid item className={classes.item}>
                                        <Typography variant="subtitle1" noWrap style={{ textAlign: 'start' }}>Integrantes:</Typography>
                                    </Grid>
                                    {
                                        item.data().integrantes.map(person => (
                                            <ListItem button key={person} >
                                                <ListItemText>
                                                    {person}
                                                </ListItemText>
                                            </ListItem>
                                        ))
                                    }
                                    <Button onClick={()=>{delEquipo(item.id)}} color="primary">
                                        eliminar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                ))
            }
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Crear Equipo"}</DialogTitle>
                <DialogContent>
                    {up ? <Grid item>
                        <CircularProgress />
                    </Grid>
                        :
                        <Paper className={classes.Paper}>
                            <form>
                                <Grid container direction="column" justify="center" alignItems="center">
                                    {
                                        <Grid container container direction="column" justify="center" alignItems="center">
                                            <Grid item >
                                                <div className={classes.imageContainer}>
                                                    {
                                                        files ?
                                                            <Avatar alt="perfilprev" src={files} className={classes.bigAvatar} />
                                                            :
                                                            <Avatar alt="perfilprev" src={files} className={classes.bigAvatar} />
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
                                                        <IconButton variant="contained" component="span" className={classes.btn}>
                                                            <AddCircleOutlineIcon />
                                                        </IconButton>
                                                    </label>
                                                </div>
                                            </Grid>
                                            <Grid item className={classes.item}>
                                                <TextField
                                                    className={classes.textField}
                                                    id="standard-name"
                                                    label="Nombre Equipo"
                                                    placeholder={"Nombre del nuevo equipo"}
                                                    type="text"
                                                    value={nombre}
                                                    onChange={e => setNombre(e.target.value)}
                                                    margin="normal"

                                                />
                                            </Grid>
                                            <Grid item className={classes.item}>
                                                <Grid container spacing={1} alignItems="flex-end">
                                                    <Grid item>
                                                        <IconButton aria-label="delete" className={classes.margin} size="medium" onClick={getMatch}>
                                                            <SearchIcon fontSize="inherit" />
                                                        </IconButton>
                                                    </Grid>
                                                    <Grid item >
                                                        <TextField
                                                            id="filled-select-currency-native"
                                                            label="Buscar Integrante"
                                                            className={classes.textField}
                                                            value={miembro}
                                                            onChange={e => setMiembro(e.target.value)}
                                                            margin="normal"
                                                        >
                                                        </TextField>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            {
                                                miembros &&
                                                miembros.map((item, key) => {
                                                    return (
                                                        <ListItem button key={key} onClick={() => addIntegrantes(item)}>
                                                            <ListItemIcon><AddCircleOutlineIcon /></ListItemIcon>
                                                            <ListItemText>
                                                                {item.data().correo}
                                                            </ListItemText>
                                                        </ListItem>
                                                    )
                                                })
                                            }
                                            <Grid container justify="flex-start">
                                                {
                                                    integrantes &&
                                                    integrantes.map((item) => {
                                                        return (
                                                            <Grid item xs>
                                                                <Grid container direction="column"
                                                                    justify="center"
                                                                    alignItems="center">
                                                                    <Avatar alt="perfilprev" src={item.data().perfil} style={{
                                                                        margin: 10,
                                                                        width: 50,
                                                                        height: 50,
                                                                    }} />
                                                                    <a>{item.data().nombre}</a>
                                                                    <HighlightOffIcon style={{ color: 'red' }} onClick={() => { remove(item) }} />
                                                                </Grid>
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </Grid>
                                        </Grid>
                                    }

                                </Grid>
                            </form>
                        </Paper>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={publicar} color="primary">
                        Crear
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

            <div>
                <Fab color="primary" className={classes.fab} onClick={handleClickOpen}>
                    <AddIcon />
                </Fab>
            </div>
        </Grid >

    );
}

export default CEquipo;