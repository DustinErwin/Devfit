import React from "react";
import Col from "react-bootstrap/Col";
import "./styles.css";
import Carousel from "react-bootstrap/Carousel";
import trainerAbeer from "../../../images/trainer_abeer.jpg";
import trainerArav from "../../../images/trainer_arav.jpg";
import trainerFelicia from "../../../images/trainer_felicia.jpg";

//TODO: Basic Framework Created. Still need to add Api Call and show classes signed up for.
function MeetYourTrainerBox() {
  return (
    <Col className="col-12 col-md-6 text-center meet-your-trainer-box">
      <h2 className="div text-red my-3">Meet Your Trainers!</h2>
      <Carousel className="trainerCarousel" indicators={false}>
        <Carousel.Item>
          <img
            className="d-block w-80 center"
            src={trainerAbeer}
            alt="Meet Abeer, our Zumba instructor"
          />
          <Carousel.Caption className="carouselCaption">
            <h3>Abeer</h3>
            <p>Zumba</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-80 center"
            src={trainerArav}
            alt="Meet Arav, our Spin instructor"
          />

          <Carousel.Caption className="carouselCaption">
            <h3>Arav</h3>
            <p>Spin</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-80 center"
            src={trainerFelicia}
            alt="Meet Felicia, our Barbell Blast instructor"
          />

          <Carousel.Caption className="carouselCaption">
            <h3>Felicia</h3>
            <p>Barbell Blast</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Col>
  );
}

export default MeetYourTrainerBox;
