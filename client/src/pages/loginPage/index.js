import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ImageCarousel from "../../components/ImageCarousel";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import ContentWrapper from "../../components/contentWrapper";

function LoginPage() {
  return (
    <>
      <Header />
      <ContentWrapper>
        This container should contain the 4 boxes of info on sign up page.
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
      </ContentWrapper>
      <Footer />
    </>
  );
}

export default LoginPage;
