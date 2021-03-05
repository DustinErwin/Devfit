import React from "react";
import Carousel from "react-bootstrap/Carousel";

export default function CarouselImageItem(props) {
  return (
    <>
      <Carousel.Item>
        <img
          className={props.className}
          src={process.env.PUBLIC_URL + props.imgUrl}
          alt={props.altText}
        />
        <Carousel.Caption>
          <h3>{props.slideLabel}</h3>
          <h5>{props.carouselCaption1}</h5>
          <p>{props.carouselCaption2}</p>
        </Carousel.Caption>
      </Carousel.Item>
    </>
  );
}
