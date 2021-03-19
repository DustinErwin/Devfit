import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import logoDark from "../../../images/logos/Color_Logo_dark_background.png";
import "./styles.css";

function Header() {
  return (
    <Container fluid className="header-background mb-0 mb-md-5 ">
      <Row className="align-items-center">
        <Col>
          <h1 className="headerTitle large-screen-text small-screen-text xsmall-screen-no-text text-right">
            Dev
          </h1>
        </Col>
        <Col className="text-center ">
          <img
            className="logo"
            src={logoDark}
            alt="funny logo of skinny kid trying to lift a huge weight"
          />
        </Col>
        <Col>
          <h1 className="headerTitle large-screen-text small-screen-text xsmall-screen-no-text">
            Fit
          </h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
