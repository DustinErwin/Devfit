import React, { useState } from "react";
import DevBtn from "../../commonComponents/devButton/devButton";
import "./styles.css";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function InfoBoxRightColumn(props) {
  const [validated, setValidated] = useState(false);

  //Bootstrap validation

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    props.handleHireNewTrainer();
    setValidated(true);
  };
  

  return (
    <>
      {" "}
      {props.toggleRightCol === "addTrainer" ? (
        <Card className="trainer-info-card mt-4">
          <Card.Title className=" trainer-info-title text-center mt-3">
            Hire New Trainer
          </Card.Title>
          <Card.Body>
            <Form
              noValidate
              validated={validated}
              className="white-background rounded p-3"
            >
              <Form.Row>
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="First Name"
                    onChange={(e) => props.updateTrainerInfo(e)}
                    name="firstName"
                    
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please enter a First Name
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Last Name"
                    onChange={(e) => props.updateTrainerInfo(e)}
                    name="lastName"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please enter a Last Name
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="phone"
                    onChange={(e) => props.updateTrainerInfo(e)}
                    name="phone"
                    // pattern : https://stackoverflow.com/questions/19445408/how-to-restrict-user-to-type-10-digit-numbers-in-input-element
                    pattern="[1-9]{1}[0-9]{9}"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please enter a 10 digit number
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom04">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) => props.updateTrainerInfo(e)}
                    name="gender"
                  >
                    <option>M</option>
                    <option>F</option>
                    <option>Other</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationCustom05">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Email"
                    onChange={(e) => props.updateTrainerInfo(e)}
                    name="email"
                    //regex from https://stackoverflow.com/questions/742451/what-is-the-simplest-regular-expression-to-validate-emails-to-not-accept-them-bl/742455
                    pattern="(?!.*\.\.)(^[^\.][^@\s]+@[^@\s]+\.[^@\s\.]+$)"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email address
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
            </Form>
            <Row className="d-flex justify-content-center mt-3">
              <DevBtn styleClass="btn-dark" onClick={handleSubmit}>
                Hire Trainer
              </DevBtn>
            </Row>
          </Card.Body>
        </Card>
      ) : (
        <Card className="trainer-info-card mt-4">
          <Card.Title className=" trainer-info-title text-center mt-3">
            Trainer Information
          </Card.Title>
          <Card.Body>
            <ListGroup className="list-group list-group-flush text-start rounded">
              <ListGroup.Item className="list-group-item trainerFirstName">
                First Name:{" "}
                <span className="ml-1">{props.selectedTrainer.first_name}</span>{" "}
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item trainerLastName">
                Last Name:{" "}
                <span className="ml-1">{props.selectedTrainer.last_name}</span>{" "}
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item trainerGender">
                Gender:
                <span className="ml-1">{props.selectedTrainer.gender}</span>{" "}
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item trainerEmail">
                Email Address:{" "}
                <span className="ml-1">{props.selectedTrainer.email}</span>
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item trainerPhone">
                Phone Number:
                <span className="ml-1">{props.selectedTrainer.phone} </span>
              </ListGroup.Item>
            </ListGroup>

            <div className="text-center mt-3 ">
              <DevBtn styleClass="btn-dark" onClick={props.terminateTrainer}>
                Terminate Trainer
              </DevBtn>
            </div>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default InfoBoxRightColumn;
