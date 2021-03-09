import React from "react";
import Header from "../../components/commonComponents/header/header";
import Footer from "../../components/commonComponents/footer/footer";
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
        <Row></Row>
      </Container>
      <Footer />
    </>
  );
}

export default ManagerPage;
