import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "./styles.css";

//the black and red box already styled for employee, manager, and member page.
//props.colLeft and props.colRight were set up light props.childredn
//created new variable called styleClass. Use this prop to add new classNames. (Ethan)

function ContainerTest(props) {
  return (
    <Container fluid="md ">
      <Row className="layout">
        <Col
          xs={12}
          md={6}
          className={"col-left pb-4 dev-rounded-left larger-font"}
        >
          {props.colLeft}
        </Col>
        <Col
          className={
            "col-right pb-4 dev-rounded-right pl-0 pr-0  "
          }
        >
          {props.colRight}
        </Col>
      </Row>
    </Container>
  );
}

export default ContainerTest;
