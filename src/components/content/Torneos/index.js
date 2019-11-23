import React, { useEffect } from 'react';
import { torneos, delTorneos, updateTorneo, getAllGames } from './../../services/firebase';
import { GridList, GridListTile, Grid, Chip, Button, Paper, IconButton, Typography } from '@material-ui/core';
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from "@material-ui/core";
import EventIcon from '@material-ui/icons/Event';
import ScheduleIcon from '@material-ui/icons/Schedule';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
const myStyle = new makeStyles(theme => ({
    card: {
        maxWidth: 350,
        maxHeight: 400,
        minHeight: 400
    },
    textField: {
        width: '100%'
    },
    Paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        padding: theme.spacing(3),
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    container: {


        flexGrow: 1,
        width: '100%'

    },
    gridList: {
        width: 500,
        height: 450,
    },
    dates: {
        marginTop: '16px',
        marginBottom: '8px'
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        textAlign: 'center'
    },
    input: {
        display: 'none',
    },
    btn: {
        position: 'absolute',
        top: '90%',
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
    bigAvatar: {
        margin: 10,
        width: '80%',
        height: 200,
        objectFit: 'scale-down'
    },
}));

function Torneos() {
    const classes = myStyle();
    const [misTorneos, setMisTorneos] = React.useState(null);
    const uid = sessionStorage.getItem("user");
    const [open, setOpen] = React.useState(false);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [fullWidth, setFullWidth] = React.useState(true);
    const [nombreT, setNombreT] = React.useState(null);
    const [num, setNum] = React.useState(null);
    const [inicio, setInicio] = React.useState(null);
    const [fin, setFin] = React.useState(null);
    const [id, setId] = React.useState(null);
    const [files, setFile] = React.useState(null);
    const [gamesOption, setGameOptions] = React.useState(null);
    const [game, setGame] = React.useState(null);
    const [up, setUp] = React.useState(false);
    useEffect(() => {
        getAllGames().onSnapshot((res) => {
            const aux = []
            res.forEach((doc) => {
                aux.push(doc);
                console.log(doc);
            });
            setGameOptions(aux);
        });
    }, []);
    useEffect(() => {
        torneos(uid).onSnapshot((res) => {
            var aux = []
            res.forEach((doc) => {
                aux.push(doc)
            });
            setMisTorneos(aux)
        });
    }, []);
    function eliminar(e, id) {
        e.preventDefault();
        delTorneos(id);
    }
    const handleClickOpen = (e, item) => {
        loadDialog(item);
        setOpen(true);
        e.preventDefault();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const loadDialog = (item) => {
        setNombreT(item.data().nombre);
        //setNombreT(item.data().nombre)
        setInicio(item.data().inicio.toDate());
        setNum(item.data().num)
        setFin(item.data().fin.toDate());
        setId(item.id);
        setFile(item.data().image);
        setGame(item.data().juego);
    }
    const handleUploaded = e => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function () {
            setFile(reader.result)
        }
        reader.readAsDataURL(file);
    }
    function actualizarTorneo(e) {
        e.preventDefault();
        setUp(true);
        updateTorneo(id).update({
            nombre: nombreT,
            num: num,
            inicio: inicio,
            fin: fin,
            image: files,
            juego: game
        }).then(function () {
            setUp(false);
            handleClose();
        }).catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }
    return (
        <div>
            <Grid container justify="flex-start">
                {
                    misTorneos &&
                    misTorneos.map(item => (
                        <Grid item xs style={{ padding: '10px', maxWidth: '300px' }}>
                            <Card className={classes.card}>
                                <CardMedia className={classes.media} image={"" + item.data().image} />
                                <CardContent>
                                    <Grid container direction="column" wrap="nowrap">
                                        <Grid item>
                                            <Chip label={item.data().juego} variant="outlined" />
                                        </Grid>
                                        <Grid item xs zeroMinWidth style={{padding:'8px 0px'}}>
                                            <Typography variant="h6" noWrap>{item.data().nombre}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Chip icon={<EventIcon style={{ color: 'white' }} />} label={new Date(item.data().inicio.toDate()).toLocaleString()} style={{ backgroundColor: '#05a705', color: 'white' }} />
                                        </Grid>
                                        <Grid item style={{ paddingTop: '5px' }}>
                                            <Chip icon={<EventIcon style={{ color: 'white' }} />} label={new Date(item.data().inicio.toDate()).toLocaleDateString()} style={{ backgroundColor: 'red', color: 'white' }} />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions style={{ justifyContent: 'space-evenly' }}>
                                    <Button variant="contained" size="small" color="primary" onClick={e => handleClickOpen(e, item)}>
                                        Editar
                                </Button>
                                    <Button variant="contained" size="small" color="primary" onClick={e => eliminar(e, item.id)}>
                                        Eliminar
                                </Button>
                                </CardActions>
                            </Card>
                            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={maxWidth} fullWidth={fullWidth}>
                                <DialogTitle id="form-dialog-title" style={{ textAlign: 'center' }}>{nombreT}</DialogTitle>
                                <DialogContent>
                                    <Grid container justify="center" direction="column" alignItems="center" style={{ padding: '30px 0px' }}>
                                        {
                                            up ?
                                                <Grid item>
                                                    <CircularProgress />
                                                </Grid>
                                                :
                                                <form style={{ width: '100%' }}>
                                                    <div className={classes.imageContainer}>
                                                        {
                                                            files &&
                                                            <img alt={"logo"} src={files} className={classes.bigAvatar} />
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
                                                    <Grid item>
                                                        <TextField
                                                            className={classes.textField}
                                                            label="Nombre Torneo"
                                                            type="text"
                                                            value={nombreT}
                                                            margin="normal"
                                                            variant="outlined"
                                                            onChange={e => setNombreT(e.target.value)}
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <TextField
                                                            className={classes.textField}
                                                            label="No. Equipos"
                                                            value={num}
                                                            type="number"
                                                            margin="normal"
                                                            variant="outlined"
                                                            onChange={e => setNum(e.target.value)}
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        container direction="column"
                                                        justify="center"
                                                        alignItems="stretch">
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                            <DateTimePicker
                                                                inputVariant="outlined"
                                                                className={classes.dates}
                                                                value={inicio}
                                                                onChange={setInicio}
                                                                label="Fecha/Hora Inicio"
                                                                format="dd/MM/yyyy hh:mm a"
                                                            />
                                                        </MuiPickersUtilsProvider>
                                                    </Grid>
                                                    <Grid
                                                        container direction="column"
                                                        justify="center"
                                                        alignItems="stretch">
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                            <DatePicker
                                                                inputVariant="outlined"
                                                                className={classes.dates}
                                                                value={fin}
                                                                onChange={setFin}
                                                                label="Fecha Fin"
                                                                format="dd/MM/yyyy"
                                                            />
                                                        </MuiPickersUtilsProvider>
                                                        {
                                                            <Grid item>
                                                                <TextField
                                                                    id="filled-select-currency-native"
                                                                    select
                                                                    label="Videojuego"
                                                                    className={classes.textField}
                                                                    value={game}
                                                                    onChange={e => setGame(e.target.value)}
                                                                    SelectProps={{
                                                                        native: true,
                                                                        MenuProps: {
                                                                            className: classes.menu
                                                                        }
                                                                    }}
                                                                    margin="normal"
                                                                    variant="outlined"
                                                                >
                                                                    {
                                                                        gamesOption &&
                                                                        gamesOption.map(option => (
                                                                            <option key={option.data().nombre} value={option.data().nombre}>
                                                                                {option.data().nombre}
                                                                            </option>
                                                                        ))
                                                                    }
                                                                </TextField>
                                                            </Grid>
                                                        }
                                                    </Grid>
                                                </form>
                                        }
                                    </Grid>
                                </DialogContent>
                                {
                                    up ||
                                    <DialogActions>
                                    <Button onClick={actualizarTorneo} variant="contained" size="small" color="primary">
                                        Actualizar
                                    </Button>
                                    <Button onClick={handleClose} variant="contained" size="small" color="primary">
                                        Cancelar
                                    </Button>
                                </DialogActions>
                                }
                                
                            </Dialog>
                        </Grid>

                    ))
                }
            </Grid>


        </div>
    );
}

export default Torneos;