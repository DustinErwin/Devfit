import React from "react";
import Header from "../../components/commonComponents/header/header";
import Footer from "../../components/commonComponents/footer/footer";
import MemberInfoBox from "../../components/memberPageComponents/memberInfoBox/memberInfoBox";
import MeetYourTrainerBox from "../../components/memberPageComponents/meetYourTrainerBox/TrainerCarousel";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

function MemberPage() {
  return (
    <>
      <Header />
      <Container>
        <Row>
          <MemberInfoBox />
          <MeetYourTrainerBox />
        </Row>
      </Container>
      <Container>
        <Row></Row>
      </Container>

      <Footer />
    </>
  );
}

export default MemberPage;
