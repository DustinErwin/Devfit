import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./adCarousel.css";

export default function CarouselImageItem(props) {
  return (
    <>
      <Carousel className="adCarousel">
        <Carousel.Item>
          <img
            className="d-block w-100 center"
            src={process.env.PUBLIC_URL + props.imgUrl1}
            alt={props.altText2}
          />
          <Carousel.Caption className="adCarousel-caption d-none d-md-none d-lg-block background-t-red">
            <h5>{props.carouselHeader1}</h5>
            <p>{props.carouselCaption1}</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 center"
            src={process.env.PUBLIC_URL + props.imgUrl2}
            alt={props.altText2}
          />
          <Carousel.Caption className="adCarousel-caption d-none d-md-none d-lg-block background-t-red">
            <h5>{props.carouselHeader2}</h5>
            <p>{props.carouselCaption2}</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}
