import React, { useEffect } from 'react';
import { torneos, delTorneos } from './../../services/firebase';
import { GridList, GridListTile, Grid, Chip, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from "@material-ui/core";
import EventIcon from '@material-ui/icons/Event';
import ScheduleIcon from '@material-ui/icons/Schedule';

const myStyle = new makeStyles(theme => ({
    card: {
        maxWidth: 300,
        maxHeight:450,
        minHeight: 450
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
}));

function Torneos() {
    const classes = myStyle();
    const [misTorneos, setMisTorneos] = React.useState(null);
    const uid = sessionStorage.getItem("user");
    useEffect(() => {
        torneos(uid).onSnapshot((res) => {
            var aux = []
            res.forEach((doc) => {
                aux.push(doc)
            });
            setMisTorneos(aux)
        });
    }, []);
    function eliminar(e,id){
        e.preventDefault();
        delTorneos(id);
    }
    return (



        <Grid container justify="flex-start">

            {
                misTorneos &&
                misTorneos.map(item => (
                    <Grid item xs style={{padding:'10px', maxWidth:'300px'}}>
                        <Card className={classes.card}>
                            <CardMedia className={classes.media} image={"" + item.data().image} />
                            <CardContent>
                                <Grid container direction="column">
                                    <Grid item>
                                        <Chip label={item.data().juego} variant="outlined" />
                                    </Grid>
                                    <Grid item>
                                        <h2>{item.data().nombre}</h2>
                                    </Grid>
                                    <Grid item>
                                        <Chip icon={<EventIcon style={{color:'white'}} />} label={new Date(item.data().inicio.toDate()).toLocaleString()} style={{backgroundColor:'#05a705', color:'white'}} />
                                    </Grid>
                                    <Grid item style={{paddingTop:'5px'}}>
                                        <Chip icon={<EventIcon style={{color:'white'}} />} label={new Date(item.data().inicio.toDate()).toLocaleDateString()} style={{backgroundColor:'red', color:'white'}} />
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions style={{justifyContent:'space-evenly'}}>
                                <Button variant="contained" size="small" color="primary">
                                    Editar
                                </Button>
                                <Button variant="contained" size="small" color="primary" onClick={e=>eliminar(e,item.id)}>
                                    Eliminar
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    );
}

export default Torneos;