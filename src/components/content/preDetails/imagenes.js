import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import Spinner from "react-spinner-material";
import { withStyles } from "@material-ui/core";
import ListCards from "./listingCards";
import {showTorneoImages} from './../../services/firebase';

class Imagenes extends Component {
  state = {
    imagenes: [],
    timePassed: false,
    OrganizarPorFechas:[]
  };

  componentDidMount() {
    showTorneoImages()
      .get()
      .then(snapShots => {
        this.setState({
          imagenes: snapShots.docs.map(doc => {
            console.log(doc.data().image);
            return {
              id: doc.id,
              data: doc.data()
            };
          })
        });
      })
      .catch(error => {
        console.log(error);
      });
      showTorneoImages().orderBy('inicio','asc').limit(5).get().then(snapShots => {
        this.setState({
          OrganizarPorFechas: snapShots.docs.map(doc => {
            return {
              id: doc.id,
              data: doc.data()
            };
          })
        });
      }).catch(error => {
        console.log(error);
      });
  }

  render() {
    const { imagenes } = this.state;
    const { OrganizarPorFechas }=this.state;
    const carousel = () => {
      setTimeout(() => {
        this.setState({ timePassed: true });
      }, 21000);
      if (!this.state.timePassed) {
        return (
          <div className={this.props.classes.center}>
            <Spinner
              spinnerColor={"#04baff"}
              spinnerWidth={3}
              visible={true}
              size={35}
            />
          </div>
        );
      } else {
        return (
          <div>
            <Carousel
              autoPlay={true}
              stopOnHover={false}
              showThumbs={false}
              transitionTime={1000}
            >
              {OrganizarPorFechas &&
                OrganizarPorFechas.map((image, index = 0) => {
                  return (
                    <div key={index++}>
                      <img src={image.data.image} key={index++} height="600px" alt="carouselImages"/>
                    </div>
                  );
                })}
            </Carousel>
            <ListCards images={imagenes} />
          </div>
        );
      }
    };
    return <div>{carousel()}</div>;
  }
}
export default withStyles({
  center: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  }
})(Imagenes);
