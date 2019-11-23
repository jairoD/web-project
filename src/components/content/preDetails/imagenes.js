import React, { Component } from "react";
import Carousel from 'react-material-ui-carousel';
import Spinner from "react-spinner-material";
import { withStyles } from "@material-ui/core";
import ListCards from "./listingCards";
import { showTorneoImages } from "./../../services/firebase";

class Imagenes extends Component {
  state = {
    imagenes: [],
    timePassed: false,
    OrganizarPorFechas: []
  };

  componentDidMount() {
    showTorneoImages()
      .get()
      .then(snapShots => {
        this.setState({
          imagenes: snapShots.docs.map(doc => {
            return {
              id: doc.id,
              data: doc.data()
            };
          })
        });
      })
      .catch(error => {
         
      });
    showTorneoImages()
      .orderBy("inicio", "asc")
      .limit(5)
      .get()
      .then(snapShots => {
        this.setState({
          OrganizarPorFechas: snapShots.docs.map(doc => {
            return {
              id: doc.id,
              data: doc.data()
            };
          })
        });
      })
      .catch(error => {
         
      });
  }

  render() {
    const { imagenes } = this.state;
    const { OrganizarPorFechas } = this.state;
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
              <Carousel autoPlay={false}>
                {OrganizarPorFechas &&
                  OrganizarPorFechas.map((image, index = 0) => {
                    return (
                      <div key={index++}>
                        <img
                          src={image.data.image}
                          key={index++}
                          height="400px"
                          width="100%"
                          alt=""
                        />
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
    left: "55%",
    top: "53%",
    transform: "translate(-50%, -50%)"
  }
})(Imagenes);
