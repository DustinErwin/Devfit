import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "./styles.css";

//the black and red box already styled for employee, manager, and member page. See Slots Pattern react for more info on this pattern concept.

function ContainerTest(props) {
  return (
    <Container fluid="md">
      <Row className="layout ">
        <Col xs={12} md={6} className="col-left pb-4 rounded-left">{props.colLeft}</Col>
        <Col className="col-right pb-4 rounded-right">{props.colRight}</Col>
      </Row>
    </Container>
  );
}

export default ContainerTest;
