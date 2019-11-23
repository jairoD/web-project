import React from "react";
import Cards from "./cards";
import Grid from "@material-ui/core/Grid";

export default function ListCards(props) {
  const today = new Date();
  return (
    <div>
      <Grid container spacing={24} justify="center">
        {props.images.map((imagen, index) => {
          const date2 = new Date(imagen.data.inicio.seconds * 1000);
          const hours = date2.getHours();
          const minutes = date2.getMinutes();
          const seconds = date2.getSeconds();
          const formattedTime =
            hours.toString().padStart(2, "0") +
            ":" +
            minutes.toString().padStart(2, "0") +
            ":" +
            seconds.toString().padStart(2, "0");
          let Difference_In_Time = date2.getTime() - today.getTime();
          let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

          return (
            <Cards
              images={imagen}
              diasRestantes={Math.ceil(Difference_In_Days)}
              diaTorneo={date2}
              horaTorneo={formattedTime}
              nombreTorneo={imagen.data.nombre}
              juegoTorneo={imagen.data.juego}
            />
          );
        })}
      </Grid>
    </div>
  );
}
