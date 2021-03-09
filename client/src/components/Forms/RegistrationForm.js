import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "./registrationForm.css";

export default function RegistrationForm() {
  return (
    <>
      <Container className="regForm background-white">
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="pt-3">Email address*</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicPassword">
                <Form.Label className="pt-3">Password*</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>First Name*</Form.Label>
                <Form.Control placeholder="First name" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Last Name*</Form.Label>
                <Form.Control placeholder="Last name" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Example select</Form.Label>
                <Form.Control as="select">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBirthdate">
                <Form.Label>Birthdate</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Birthdate (yyyy-dd-mm)"
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formPhoneNumber">
                <Form.Label>
                  Phone Number (ten digit number only, no parentheses / dashes
                  please)
                </Form.Label>
                <Form.Control
                  placeholder="Phone Number"
                  pattern="[0-9]{10}"
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}
