import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import MemberInfoBox from "../../components/memberInfoBox/memberInfoBox";
import MeetYourTrainerBox from "../../components/meetYourTrainerBox/TrainerCarousel";
import Row from "react-bootstrap/Row";
import RenderScheduleHeadings from "../../utilities/render-schedule-headings";
import AuthenticationButton from "../../components/authenticationButton";
import Container from "react-bootstrap/Container"

function MemberPage() {
  return (
    <>
      <Header />
      <AuthenticationButton />
      <Container>
        <Row>
          <MemberInfoBox />
          <MeetYourTrainerBox />
        </Row>
      </Container>

      <Container>
        <Row>{RenderScheduleHeadings()}</Row>
      </Container>

      <Footer />
    </>
  );
}

export default MemberPage;
