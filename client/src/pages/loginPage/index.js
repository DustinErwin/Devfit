import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import CarouselImageItem from "../../components/CarouselImageItem";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import ContentWrapper from "../../components/contentWrapper";
import EmptyCarousel from "../../components/EmptyCarousel";
import AuthenticationButton from "../../components/authenticationButton";

function LoginPage() {
  return (
    <>
      <Header />
      <AuthenticationButton />
      <ContentWrapper>
        This container should contain the 4 boxes of info on sign up page.
        <Container>
          <Row>
            <EmptyCarousel>
              <CarouselImageItem
                className="girlFeet"
                imgUrl="/images/girlfeetwaterbottle.jpg"
                altText="Girl sitting on floor next to water bottle"
                slideLabel="Refactor your body!"
                carouselCaption1="Stretching your mind"
                carouselCaption2="but need to stretch your body?"
              />
              <CarouselImageItem
                className="guyWeight"
                imgUrl="/images/gym-coronavirus.jpg"
                altText="Man picking up weight from weight rack"
                slideLabel="Refactor your body!"
                carouselCaption1="Found your inner strength"
                carouselCaption2="but still discovering your outer
                strength?"
              />
            </EmptyCarousel>
          </Row>
        </Container>
      </ContentWrapper>
      <Footer />
    </>
  );
}

export default LoginPage;
