import React from "react";
import Carousel from "react-bootstrap/Carousel";

export default function CarouselImageItem(props) {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={process.env.PUBLIC_URL + props.imgUrl}
            alt={props.altText}
          />
          <Carousel.Caption>
            <h5>{props.carouselCaption1}</h5>
            <p>{props.carouselCaption2}</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}
