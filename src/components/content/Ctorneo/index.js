import React, { useEffect } from 'react';
import { Grid, Paper, Button, IconButton, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import empty from '../../../static/empty.png';
import { getAllGames, postTorneo } from '../../services/firebase';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import EventIcon from '@material-ui/icons/Event';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
const myStyle = new makeStyles(theme => ({
    Paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        padding: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '100%'
    },
    dates: {
        marginTop: '16px',
        marginBottom: '8px'
    },
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    card: {
        width: '100%',
        maxWidth: 400,
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
    menu: {
        width: 200,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));

function Ctorneo() {
    const classes = myStyle();
    const [nombreT, setNombreT] = React.useState('Nombre torneo');
    const [num, setNum] = React.useState('0');
    const [inicio, setInicio] = React.useState(new Date());
    const [fin, setFin] = React.useState(null);
    const [game, setGame] = React.useState('League of Legends');
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [files, setFile] = React.useState(null);
    const [gamesOption, setGameOptions] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const uid = sessionStorage.getItem("user");
    const steps = getSteps();
    useEffect(() => {
        getAllGames().onSnapshot((res) => {
            const aux = []
            res.forEach((doc) => {
                aux.push(doc);
                console.log(doc);
            });
            setGameOptions(aux);
        });
    },[]);
    function publish() {
        var torn = {
            nombre: nombreT,
            num: num,
            inicio: inicio,
            fin: fin,
            juego: game,
            image: files,
            organizador: uid
        };
        setOpen(true);
        postTorneo(torn).then((res) => {
            console.log('creado, id:' + res.id);
            setOpen(false);
            handleNext();
        }).catch((res) => {
            console.log(res);
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

    function getSteps() {
        return ['Seleccionar imagenes', 'Rellenar formulario', 'Vista previa'];
    }
    function getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <Grid container justify="center" alignItems="center" style={{ padding: '30px 0px' }}>
                        <Grid item xs={12}>
                            <div className={classes.imageContainer}>
                                {
                                    files ?
                                        <img alt={"logo"} src={files} className={classes.bigAvatar} />
                                        :
                                        <img alt="empty" src={empty} className={classes.bigAvatar} />
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
                    </Grid>
                );
            case 1:
                return (
                    
                    <Grid container justify="center" direction="column" alignItems="center" style={{ padding: '30px 0px' }}>
                        <Paper className={classes.Paper}>
                        <form>
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
                            </Grid>
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
                        </form>
                        </Paper>
                    </Grid>
                    
                );
            case 2:
                return (
                    <Grid container alignItems="center" justify="center" style={{ padding: '30px 0px' }}>
                        <Card className={classes.card} >
                            <CardMedia className={classes.media} image={files ? files : empty} />
                            <CardContent>
                                <Grid container direction="column">
                                    <Grid item>
                                        <Chip label={game} variant="outlined" />
                                    </Grid>
                                    <Grid item>
                                        <h2>{nombreT}</h2>
                                    </Grid>
                                    <Grid item>
                                        <Chip icon={<EventIcon />} label={inicio.toLocaleString()} variant="outlined" />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            default:
                return 'Unknown step';
        }
    }
    const isStepOptional = step => {
        return step === 0;
    };

    const isStepSkipped = step => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
    };
    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(prevSkipped => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };
    useEffect(() => {
        console.log(game);
    }, [game]);

    return (
        < div className={classes.root} >
            <Stepper activeStep={activeStep} style={{ backgroundColor: 'transparent', padding: 0 }}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};

                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div style={{textAlign:'center', padding: '30px 0px'}}>
                        <Typography className={classes.instructions}>
                            Torneo publicado correctamente
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handleReset} className={classes.button}>
                            Nuevo torneo
                        </Button>
                    </div>
                ) : (
                        <div>
                            <Dialog
                                open={open}
                                onClose={() => { setOpen(false) }}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Publicando Torneo"}</DialogTitle>
                                <DialogContent style={{ textAlign: 'center' }}>
                                    <CircularProgress />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => { setOpen(false) }} color="primary">
                                        Disagree
                                </Button>
                                    <Button onClick={() => { setOpen(false) }} color="primary" autoFocus>
                                        Agree
                                </Button>
                                </DialogActions>
                            </Dialog>
                            {getStepContent(activeStep)}
                            <div style={{ textAlign: 'center' }}>
                                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                    Atras
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={activeStep === steps.length - 1 ? publish : handleNext}
                                    className={classes.button}
                                >
                                    {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                                </Button>
                            </div>
                        </div>
                    )}
            </div>
        </div >

    );
}

export default Ctorneo;

{/** 
        <Grid container justify="center" direction="column" alignItems="center">
            <Paper className={classes.Paper}>
                {nombreT}
                <form>
                    <Grid item>
                        <TextField
                            className={classes.textField}
                            label="Nombre Torneo"
                            type="text"
                            margin="normal"
                            onChange={e => setNombreT(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            className={classes.textField}
                            label="No. Equipos"
                            type="text"
                            margin="normal"
                            onChange={e => setNum(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            className={classes.textField}
                            label="Fecha Inicio"
                            type="text"
                            margin="normal"
                            onChange={e => setInicio(e.target.value)}
                        />
                    </Grid>
                    <Grid
                        container direction="column"
                        justify="center"
                        alignItems="stretch">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker
                                className={classes.dates}
                                value={inicio}
                                onChange={setInicio}
                                label="Fecha/Hora Inicio"
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid
                        container direction="column"
                        justify="center"
                        alignItems="stretch">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker
                                className={classes.dates}
                                value={fin}
                                onChange={setFin}
                                label="Fecha Fin"
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item>
                        <TextField
                            className={classes.textField}
                            label="Videojuego"
                            type="text"
                            margin="normal"
                            onChange={e => setGame(e.target.value)}
                        />
                    </Grid>
                    <Button variant="contained" color="primary" onClick={prueba} className={classes.button}>
                        Crear
                    </Button>
                </form>
            </Paper>
        </Grid>
        */}