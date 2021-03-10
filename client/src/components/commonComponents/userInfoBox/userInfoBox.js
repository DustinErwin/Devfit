import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "./styles.css";

//the black and red box already styled for employee, manager, and member page. See Slots Pattern react for more info on this pattern concept.

function ContainerTest(props) {
  return (
    <Container>
      <Row className="layout">
        <Col className="col-left pb-4">{props.colLeft}</Col>
        <Col className="col-right pb-4">{props.colRight}</Col>
      </Row>
    </Container>
  );
}

export default ContainerTest;
