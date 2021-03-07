import React from "react";
import Col from "react-bootstrap/Col";
import "./styles.css";
import Carousel from "react-bootstrap/Carousel";

//TODO: Basic Framework Created. Still need to add Api Call and show classes signed up for.
function MeetYourTrainerBox() {
  return (
    <Col className="col-12 col-md-6 text-center meet-your-trainer-box">
      <h2 class="div text-red my-3">Meet Your Trainers!</h2>
      <Carousel className="trainerCarousel" indicators={false}>
        <Carousel.Item>
          <img
            className="d-block w-80 center"
            src={process.env.PUBLIC_URL + "/images/trainer_abeer.jpg"}
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
            src={process.env.PUBLIC_URL + "/images/trainer_arav.jpg"}
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
            src={process.env.PUBLIC_URL + "/images/trainer_felicia.jfif"}
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
