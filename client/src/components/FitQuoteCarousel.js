import React from "react";
import Carousel from "react-bootstrap/Carousel";

export default function FitQuoteCarousel(props) {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={process.env.PUBLIC_URL + props.fitImgUrl1}
            alt={props.gymAltText1}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={process.env.PUBLIC_URL + props.fitImgUrl2}
            alt={props.gymAltText2}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={process.env.PUBLIC_URL + props.fitImgUrl3}
            alt={props.gymAltText3}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={process.env.PUBLIC_URL + props.fitImgUrl4}
            alt={props.gymAltText4}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={process.env.PUBLIC_URL + props.fitImgUrl5}
            alt={props.gymAltText5}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={process.env.PUBLIC_URL + props.fitImgUrl6}
            alt={props.gymAltText6}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={process.env.PUBLIC_URL + props.fitImgUrl7}
            alt={props.gymAltText7}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={process.env.PUBLIC_URL + props.fitImgUrl8}
            alt={props.gymAltText8}
          />
        </Carousel.Item>
      </Carousel>
    </>
  );
}
