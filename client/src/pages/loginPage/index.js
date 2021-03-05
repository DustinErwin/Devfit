import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ImageCarousel from "../../components/ImageCarousel";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

function LoginPage() {
  return (
    <>
      <Header />
      <Container>
        <Row>
          <ImageCarousel
            className="girlImg"
            imgUrl="/images/girlfeetwaterbottle.jpg"
            altText="Girl sitting on floor next to water bottle"
            slideLabel="Refactor your body!"
            carouselCaption1="Stretching your mind"
            carouselCaption2="but need to stretch your body?"
          />
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default LoginPage;
