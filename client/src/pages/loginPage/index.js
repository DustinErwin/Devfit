import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
// import CarouselImageItem from "../../components/CarouselImageItem";
// import ContentWrapper from "../../components/contentWrapper";
// import EmptyCarousel from "../../components/EmptyCarousel";
import AuthenticationButton from "../../components/authenticationButton";
import Carousel from "react-bootstrap/Carousel";
import "./styles.css";
import "../../components/button/styles.css";
import DevBtn from "../../components/button";

function LoginPage() {
  return (
    <>
      <Header />

      <Container className="loginPage">
        <AuthenticationButton className="btn-dark" />
        <Row>
          <Col className="align-self-stretch background-dark">
            <Container className="my-5 py-3">
              <Container className="text-center">
                <h1 className="text-red">Refactor your body!</h1>
                <Carousel>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={
                        process.env.PUBLIC_URL +
                        "/images/girlfeetwaterbottle.jpg"
                      }
                      alt="Girl sitting on floor next to water bottle"
                    />
                    <Carousel.Caption>
                      <h5>"Stretching your mind"</h5>
                      <p>"but need to stretch your body?"</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={
                        process.env.PUBLIC_URL + "/images/gym-coronavirus.jpg"
                      }
                      alt="Guy by weight rack"
                    />
                    <Carousel.Caption>
                      <h5>"Found your inner strength"</h5>
                      <p>"but still discovering your outer strength?"</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
                {/* <EmptyCarousel> */}
                {/* <Carousel>
                  <CarouselImageItem
                    className="d-block w-100"
                    imgUrl="/images/girlfeetwaterbottle.jpg"
                    altText="Girl sitting on floor next to water bottle"
                    carouselCaption1="Stretching your mind"
                    carouselCaption2="but need to stretch your body?"
                  />
                  <CarouselImageItem
                    className="d-block w-100"
                    imgUrl="/images/gym-coronavirus.jpg"
                    altText="Man picking up weight from weight rack"
                    carouselCaption1="Found your inner strength"
                    carouselCaption2="but still discovering your outer
              strength?"
                  /> */}
                {/* </Carousel> */}
                {/* </EmptyCarousel> */}
              </Container>
            </Container>
          </Col>
          <Col className="align-self-stretch background-red">
            <Container className="my-5 py-3">Box 2</Container>
          </Col>
        </Row>
        <Row className="rowHeight align-items-center justify-content-center text-center">
          <Col className="align-self-stretch background-red">
            <Container className="my-5 py-3">
              <h2 className="pt-5 text-white">
                Whatever your fitness needs, <br />
                we've got you covered. <br />
                Ready to become a member?
              </h2>
              <DevBtn></DevBtn>
            </Container>
          </Col>
          <Col className="align-self-stretch background-dark">
            <Container className="my-5 py-3">
              <Container className="text-center">
                <h1 className="text-red">Refactor your body!</h1>
                <Carousel>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={
                        process.env.PUBLIC_URL +
                        "/images/girlfeetwaterbottle.jpg"
                      }
                      alt="Girl sitting on floor next to water bottle"
                    />
                    <Carousel.Caption>
                      <h5>"Stretching your mind"</h5>
                      <p>"but need to stretch your body?"</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={
                        process.env.PUBLIC_URL + "/images/gym-coronavirus.jpg"
                      }
                      alt="Guy by weight rack"
                    />
                    <Carousel.Caption>
                      <h5>"Found your inner strength"</h5>
                      <p>"but still discovering your outer strength?"</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </Container>
            </Container>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default LoginPage;
