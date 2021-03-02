import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./styles.css";

function Header() {
  return (
    <Container fluid className="header-background">
      <Row className="align-items-center">
        <Col>
          <h1 className="large-screen-text small-screen-text xsmall-screen-no-text text-right">
            Dev
          </h1>
        </Col>
        <Col className="text-center ">
          <img
            className="logo"
            img
            src={
              process.env.PUBLIC_URL + "/images/Color_logo_dark_background.png"
            }
            alt="funny logo of skinny kid trying to lift a huge weight"
          />
        </Col>
        <Col>
          <h1 className="large-screen-text small-screen-text xsmall-screen-no-text">
            Fit
          </h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
