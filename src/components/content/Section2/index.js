import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const myStyle = makeStyles(theme => ({
    
    title:{
        padding:'30px',
        color: 'white',
        fontStyle: 'oblique',
        fontWeight: 'bold'
    },
    grid:{
        padding: '30px',
        background: 'black'
    }

}));
export default function Section2() {
    const classes = myStyle();
    return (
        
            <Grid container
                direction="row"
                justify="center"
                alignItems="center" className={classes.grid}>
                    <Typography variant="subtitle1" className={classes.title}>
                    "Kolyseum nace del corazón de tres estudiantes de Ingeniería de sistemas de la Universidad del Norte en Barranquilla. Conformado por Jairo Díaz, Daniel Paz y Nicolás Trujillo, el equipo de desarrollo de Kolyseum trabaja a diario para contribuir con el crecimiento de la escena competitiva y las distintas ligas que sostiene alrededor de América Latina."
                    </Typography>
            </Grid>
        
    );
}