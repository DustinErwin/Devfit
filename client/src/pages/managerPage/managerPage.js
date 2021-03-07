import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import RenderScheduleHeadings from "../../utilities/render-schedule-headings";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container"
import AuthenticationButton from "../../components/authenticationButton";

function ManagerPage() {
  return (
    <>
      <Header />
      <AuthenticationButton />
      <Container >This Wrapper the two boxes for Managers.</Container>

      <Container>
        <Row>{RenderScheduleHeadings()}</Row>
      </Container>
      <Footer />
    </>
  );
}

export default ManagerPage;
