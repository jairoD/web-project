import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import TodayIcon from "@material-ui/icons/Today";
import ScheduleIcon from "@material-ui/icons/Schedule";

class Cards extends Component {
  render() {
    const DIA = "día";
    const DIAS = "días";
    return (
      <div>
        <Card className={this.props.classes.card}>
          <CardActionArea>
            <CardMedia
              className={this.props.classes.media}
              image={this.props.images.data.image}
              title="Tournaments"
            />
            <CardContent>

            <div >
            <Button
              variant="outlined"
              buttonStyle={{ borderRadius: 50 }}
              style={{ borderRadius: 50, padding:"2px 9px", color:"#1976d2"}}
              className={this.props.classes.button2}
            >
               {this.props.juegoTorneo}
            </Button>
            
            </div>



              <Typography gutterBottom variant="h5" component="h2">
                {this.props.nombreTorneo}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea >

          <CardActions >
            <IconButton aria-label="add to favorites">
              <TodayIcon />
            </IconButton>

            <p className={this.props.classes.iconSideText} style={{ marginLeft: "-9px" }}>
              {this.props.diaTorneo.getDate()}
              {"/"}
              {this.props.diaTorneo.getMonth()+1}
              {"/"}
              {this.props.diaTorneo.getFullYear()}
            </p>
            
            <IconButton aria-label="add to favorites">
              <ScheduleIcon />
              </IconButton>
            
            <p className={this.props.classes.iconSideText} style={{ marginLeft: "-9px" }}>
            {this.props.horaTorneo}
            </p>
            <div style={{ marginLeft: "52px" }}>
            <Button
              secondary
              buttonStyle={{ borderRadius: 50 }}
              style={{ borderRadius: 50, padding:"2px 9px"}}
              className={this.props.classes.button}
            >
              En {this.props.diasRestantes<=0 ? 0: this.props.diasRestantes}{" "}
              {this.props.diasRestantes == 1 ? DIA : DIAS}
            </Button>
            
            </div>
          </CardActions>
        </Card>
      </div>
    );
  }
}
export default withStyles({
  card: {
    maxWidth: "340px",
    margin: "5px",
    boxSizing: "border-box"
  },
  media: {
    height: 140
  },
  pleft:{
    paddingRight: "52px",
  },
  iconSideText: {
    fontWeight: "500",
    fontSize: "10px",
    color: "#7e838c",
  },
  div:{
    paddingLeft: "5px",
  },
  button: {
    fontWeight: "500",
    fontSize: "10px",
    backgroundColor: "#1976d2",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#1976d2"
    }
  },

  button2:{
    fontWeight: "500",
    fontSize: "10px",
    color: "#fff"
  },
  contetIcon: {
    fontSize: "15px",
    paddingRight: "5px"
  }
})(Cards);
