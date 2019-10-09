import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';

const myStyle = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: '20px',
        background: 'black'

    },
    image: {
        width: '250px',
        padding: '10px',

    },
    prueba: {
        padding: '10px',

    },
    title:{
        padding:'30px',
        color: 'white',
        fontWeight: 'bold'
    }

}));

export default function Section1() {
    const classes = myStyle();
    return (
        <div className={classes.root}>
            <Grid container
                direction="row"
                justify="center"
                alignItems="center">
                    <Typography variant="h4" className={classes.title}>
                    Es momento de unirte a la escena competitiva
                    </Typography></Grid>
            <Grid container spacing={3} className={classes.prueba2}
                justify="center"
                alignItems="center"
                direction="row">

                <Grid container
                    className={classes.prueba}
                    direction="column"
                    justify="center"
                    alignItems="center" xs={12} sm={3}>
                    <img src='https://smedia2.intoday.in/btmt/images/stories/pub_660x450_010219045955.jpg' className={classes.image} />
                </Grid>
                <Grid container
                    direction="column"
                    className={classes.prueba}
                    justify="center"
                    alignItems="center" xs={12} sm={3}>
                    <img src='https://i.blogs.es/b06eda/bo300/1366_2000.jpg' className={classes.image} />
                </Grid>
                <Grid container
                    className={classes.prueba}
                    direction="column"
                    justify="center"
                    alignItems="center" xs={12} sm={3}>
                    <img src='https://qutesports.com/wp-content/uploads/2018/06/League-of-Legends-banner-1080x675.jpg' className={classes.image} />
                </Grid>
                <Grid container
                    className={classes.prueba}
                    direction="column"
                    justify="center"
                    alignItems="center" xs={12} sm={3}>
                    <img src='https://img.youtube.com/vi/A-8jLSyxhVQ/maxresdefault.jpg' className={classes.image} />
                </Grid>
                <Grid container
                    className={classes.prueba}
                    direction="column"
                    justify="center"
                    alignItems="center" xs={12} sm={3}>
                    <img src='https://www.androidcentral.com/sites/androidcentral.com/files/styles/w1600h900crop/public/article_images/2018/03/fortnite-hero%20-%20edited.jpg?itok=aTvkXCvI' className={classes.image} />
                </Grid>
                <Grid container
                    className={classes.prueba}
                    direction="column"
                    justify="center"
                    alignItems="center" xs={12} sm={3}>
                    <img src='https://cdn.20m.es/img2/recortes/2018/01/23/622973-600-338.jpg' className={classes.image} />
                </Grid>
                <Grid container
                    className={classes.prueba}
                    direction="column"
                    justify="center"
                    alignItems="center" xs={12} sm={3}>
                    <img src='https://steamuserimages-a.akamaihd.net/ugc/871871762787348571/4894263E032A20EF0AEEB821283A52F1234C3E3D/' className={classes.image} />
                </Grid>
                <Grid container
                    className={classes.prueba}
                    direction="column"
                    justify="center"
                    alignItems="center" xs={12} sm={3}>
                    <img src='https://i.blogs.es/de368e/dota-2-wallpaper/450_1000.jpg' className={classes.image} />
                </Grid>
            </Grid>
        </div>
    );
}
